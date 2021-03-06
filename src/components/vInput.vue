<template>
  <div class="relative" :class="wrapperClasses">
    <div class="flex items-center">
      <slot name="icon">
        <button v-if="icon" class="absolute" @click="handleIconClick">
          <v-icon :name="icon" :class="classes.icon.value"></v-icon>
        </button>
      </slot>

      <input
        v-model="localModel"
        type="text"
        v-bind="$attrs"
        :class="getInputClasses()"
        @blur="handleBlur"
      />

      <div v-if="clearable" class="absolute flex right-0 mr-3">
        <button
          class="focus:outline-none"
          aria-label="Close"
          @click="handleClickClearButton"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            :class="classes.clearButton.value"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"
            />
          </svg>
        </button>
      </div>
    </div>
    <slot name="form-text">
      <v-form-text
        :messages="messages"
        :state="state"
        :status="status"
        class="absolute"
      ></v-form-text>
    </slot>
  </div>
</template>

<script>
// vue
import { ref, computed, watch, inject } from "vue";
import vFormText from "./vFormText.vue";
// composition
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
// validators
import { globalValidators } from "../validators";
// props
import { sharedStyleProps, sharedFormProps } from "../shared-props";

export default {
  props: {
    modelValue: {
      type: [String, Number, Boolean, Array, Object],
      default: "",
    },
    block: { type: Boolean, default: false },
    validate: { type: String, default: "on-blur silent" },
    rules: { type: Object, default: {} },
    state: { type: String, default: "" },
    styleInput: { type: [String, Array], default: "" },
    styleIcon: { type: [String, Array], default: "" },
    styleClearButton: { type: [String, Array], default: "" },
    ...sharedFormProps(null, { icon: true, clearable: true }),
    ...sharedStyleProps("input"),
  },
  components: {
    vFormText,
  },
  emits: ["update:modelValue", "update:status"],
  inheritAttrs: false,
  setup(props, { attrs, emit }) {
    let { classes, states, variants } = useStyles("input", props, {
      input: {
        states: ["valid", "invalid", "disabled"],
        variants: ["icon-variant"],
      },
      clearButton: {
        name: "clear-button",
      },
      icon: null,
    });

    let getInputClasses = () => {
      return [
        classes.input.value,
        state && states.input.value && states.input.value[state.value],
        attrs.disabled === "" || attrs.disabled === true
          ? states.input.disabled
          : "",
        props.icon ? variants.input.value["icon-variant"] : "",
        props.clearable ? variants.input.value["clearable-variant"] : "",
      ];
    };

    let wrapperClasses = computed(() => {
      return props.block ? "block" : "inline-block";
    });

    // validate

    let { addInput } = inject("form", {});

    let defaultStatus = {
      touched: false,
      dirty: false,
      valid: false,
      validated: false,
      wasInvalid: false,
      wasValid: false,
    };

    let status = ref({ ...defaultStatus });
    let messages = ref({});
    let state = ref("");

    let [validateOn, validateMode] = props.validate.split(" ");

    let reset = () => {
      status.value = { ...defaultStatus }
      state.value = ""
      localModel.value = ""
      messages.value = {}
    }

    let updateState = () => {
      if (
        status.value.touched ||
        status.value.validated ||
        validateOn === "immediate"
      ) {
        if (!status.value.valid) {
          if (validateMode === "silent") {
            if (status.value.wasValid || status.value.wasInvalid) {
              return "invalid";
            }
          }
          if (validateMode === "eager") {
            return "invalid";
          }
        } else {
          if (validateMode === "silent") {
            if (status.value.wasInvalid) {
              return "valid";
            }
          }
          if (validateMode === "eager") {
            return "valid";
          }
        }
      }
      return state.value;
    };

    let updateTouchState = () => {
      if (status.value.dirty || props.rules.required) {
        if (!status.value.valid) {
          return "invalid";
        } else {
          if (validateMode === "eager") {
            return "valid";
          }
        }
      }
      return state.value;
    };

    let updateFormState = () => {
      if (status.value.dirty || props.rules.required) {
        if (!status.value.valid) {
          return "invalid";
        } else {
          if (validateMode === "eager") {
            return "valid";
          }
        }
      }
      return state.value;
    };

    let updateValue = (v) => {
      if (validateOn === 'on-blur' && !status.value.touched) return

      let { newStatus, newMessages } = getValidateStatus(v);

      status.value = newStatus;
      messages.value = newMessages;

      state.value = updateState();
    };

    let touch = () => {
      let { newStatus, newMessages } = getValidateStatus(
        localModel.value,
        true
      );
      status.value = newStatus;
      messages.value = newMessages;

      state.value = updateTouchState();
    };

    let formValidate = () => {
      let { newStatus, newMessages } = getValidateStatus(
        localModel.value,
        false,
        true
      );

      status.value = newStatus;
      messages.value = newMessages;

      state.value = updateFormState();
    };

    watch(status, () => emit("update:status", status.value));

    let getValidateStatus = (value, touched, validated) => {
      let newStatus = {
        valid: true,
        touched: status.value.touched || !!touched,
        validated: status.value.validated || !!validated,
        dirty: status.value.dirty || !!(value && !!value.length),
      };

      let newMessages = {};

      let res = null;

      for (let [key, v] of Object.entries(props.rules)) {
        if (globalValidators[key]) {
          res = globalValidators[key](value, v);
          newStatus[key] = res === true;
          if (res !== true) newMessages[key] = res;
        } else if (typeof props.rules[key] === "function") {
          res = props.rules[key](value);
          newStatus[key] = res === true;
          if (res !== true) newMessages[key] = res;
        }
        newStatus.valid = newStatus.valid && newStatus[key];
      }

      newStatus.wasValid = status.value.wasValid || newStatus.valid;

      newStatus.wasInvalid =
        status.value.wasInvalid ||
        (!newStatus.valid && (status.value.wasValid || !!touched || !!validated));

      return { newStatus, newMessages };
    };

    if (addInput) addInput({ status, formValidate, reset });

    emit("update:status", status.value);

    let localModel = useLocalModel(props, emit, updateValue);

    let handleBlur = () => touch();

    let handleClickClearButton = () => (localModel.value = "");

    return {
      classes,
      wrapperClasses,
      states,
      variants,
      getInputClasses,
      state,
      localModel,
      status,
      messages,
      handleBlur,
      handleClickClearButton,
    };
  },
};
</script>

<style scoped></style>

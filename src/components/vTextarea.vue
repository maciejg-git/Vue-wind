<template>
  <div class="relative inline-flex items-center">
    <textarea
      v-bind="$attrs"
      v-model="localModel"
      :class="getTextareaClasses()"
    ></textarea>
  </div>
</template>

<script>
// vue
import { computed } from "vue";
// composition
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
// props
import { sharedStyleProps, sharedFormProps } from "../shared-props";

export default {
  props: {
    modelValue: { type: String, default: undefined },
    styleTextarea: { type: [String, Array], default: "" },
    ...sharedFormProps(null),
    ...sharedStyleProps("textarea"),
  },
  inheritAttrs: false,
  setup(props, { attrs, emit }) {
    let { classes, states } = useStyles("textarea", props, {
      textarea: {
        states: ["valid", "invalid", "disabled"],
      },
    });

    let getTextareaClasses = () => {
      return [
        classes.textarea.value,
        states.textarea.value && states.textarea.value[state.value],
        attrs.disabled === "" || attrs.disabled === true
          ? states.textarea.disabled
          : "",
      ];
    };

    let localModel = useLocalModel(props, emit);

    let state = computed(() =>
      props.state === true
        ? "valid"
        : props.state === false
        ? "invalid"
        : props.state === null
        ? ""
        : props.state
    );

    return {
      classes,
      state,
      states,
      localModel,
      getTextareaClasses,
      attrs,
    };
  },
};
</script>

<style scoped></style>

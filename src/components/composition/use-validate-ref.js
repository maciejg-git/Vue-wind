import { ref, computed } from "vue";
import { globalValidators } from "../../validators";
import { isString } from "../../tools";

let defaultStatus = {
  touched: false,
  dirty: false,
  valid: false,
  validated: false,
};

let forms = {};

let addToForm = (ref, form) => {
  if (!form) return;
  form.inputs.push(ref);

  return form;
};

let getValidateFormStatus = (form) => {
  if (!form) return;

  let newStatus = {
    touched: form.inputs.some((i) => i.status.value.touched),
    dirty: form.inputs.some((i) => i.status.value.dirty),
    valid: form.inputs.every((i) => i.status.value.valid),
  };

  newStatus.wasInvalid =
    newStatus.wasInvalid || (!newStatus.valid && newStatus.touched);

  return newStatus;
};

let getValidateStatus = ({ validators, status, model }, touched, validated) => {
  let valueToValidate = model.value;

  let newStatus = {
    valid: true,
    isRequired: status.value.isRequired,
    touched: status.value.touched || !!touched,
    validated: status.value.validated || !!validated,
    dirty:
      status.value.dirty || !!(valueToValidate && !!valueToValidate.length),
  };

  let messages = {};

  let res = null;

  for (let [key, value] of Object.entries(validators)) {
    if (globalValidators[key]) {
      res = globalValidators[key](valueToValidate, value);
      newStatus[key] = res === true;
      if (res !== true) messages[key] = res;
    } else if (typeof validators[key] === "function") {
      res = validators[key](valueToValidate);
      newStatus[key] = res === true;
      if (res !== true) messages[key] = res;
    }
    newStatus.valid = newStatus.valid && newStatus[key];
  }

  newStatus.wasValid = status.value.wasValid || newStatus.valid;

  newStatus.wasInvalid =
    status.value.wasInvalid ||
    (!newStatus.valid && (status.value.wasValid || touched || validated));

  return { newStatus, messages };
};

export default function useValidate() {
  let validateForm = (form) => {
    if (!forms[form]) {
      forms[form] = {
        inputs: [],
        status: ref({
          ...defaultStatus,
        }),
        validate() {
          this.inputs.forEach((i) => {
            i.validate(true);
            this.status.value = getValidateFormStatus(this);
          });
        },
      };

      return forms[form];
    }
  };

  let validateRef = (model, validators, form) => {
    let m = {
      _isValidateRef: true,
      model: ref(model),
      validators: validators || {},
      status: ref({ ...defaultStatus, isRequired: !!validators.required }),
      messages: {},
      form: {},
      validate(isFormValidated) {
        this.status.value = getValidateStatus(this, false, isFormValidated);
      },
      touch() {
        let { newStatus, messages } = getValidateStatus(m, true);
        m.status.value = newStatus;
        m.messages = messages;
        // this.status.value = getValidateStatus(this, true);
      },
    };

    if (form) m.form = addToForm(m, form);

    return computed({
      get() {
        return m;
      },
      set(value) {
        if (isString(value) || Array.isArray(value)) m.model.value = value;
        let { newStatus, messages } = getValidateStatus(m);
        m.status.value = newStatus;
        m.messages = messages;
      },
    });
  };

  return { validateRef, validateForm };
}

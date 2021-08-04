import { computed } from "vue";

export default function useStyles(instance, props, elements, state) {
  let propsStyles = {};
  let styles = {};
  let states = {};

  let getStyles = (styles, globalStyles, el) => {
    return styles[el].value.reduce((acc, i) => {
      let s = globalStyles[el][i];
      if (!s) return [...acc, i];
      else return [...acc, ...s];
    }, []);
  };

  let globalStyles = computed(() => {
    let styles =
      instance.appContext.config.globalProperties.styles[props.theme] ||
      instance.appContext.config.globalProperties.styles.default;
    return styles[props.name];
  });

  for (let el of elements) {
    let elCapitalize = el.charAt(0).toUpperCase() + el.slice(1);
    propsStyles[el] = computed(() => props["style" + elCapitalize].split(" "));
    styles[el] = computed(() => getStyles(propsStyles, globalStyles.value, el));

    if (state) {
      states[el] = {};
      for (let s of state) {
        if (globalStyles.value[el][s]) {
          states[el][s] = globalStyles.value[el][s];
        }
      }
    }
  }

  return {
    styles,
    states,
  };
}

// if (!s) return [...acc, i];
// else if (Array.isArray(s)) return [...acc, ...s];
// else return [...acc, ...s.split(" ")];

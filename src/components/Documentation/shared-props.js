export let popperProps = [
  {
    prop: "placement",
    type: ["String"],
    default: "bottom-start",
    description:
      "Initial placement of dropdown content. See valid values in <a href='https://popper.js.org/docs/v2/constructors/' class='link'>Popperjs documentation</a>",
  },
  {
    prop: "offsetX",
    type: ["Number"],
    default: "0",
    description:
      "Offset of dropdown relative to reference element. See how to use this offset <a href='https://popper.js.org/docs/v2/modifiers/offset/' class='link'>here</a>",
  },
  {
    prop: "offsetY",
    type: ["Number"],
    default: "0",
    description:
      "Offset of dropdown relative to reference element. See how to use this offset <a href='https://popper.js.org/docs/v2/modifiers/offset/' class='link'>here</a>",
  },
  {
    prop: "no-flip",
    type: ["Boolean"],
    default: "false",
    description:
      "Allows fliping dropdown to opposite placement if outside of current view",
  },
];

export let styleProps = (name) => {
  return [
    {
      prop: "base",
      type: ["String"],
      default: name,
      description: "Name of the component",
    },
  ];
};

export let formProps = (options) => {
  options = options || {};

  let props = [];

  if (options.icon === true)
    props.push({
      prop: "icon",
      type: ["String"],
      default: "empty string",
      description:
        "Adds icon to input element. Valid value is the same as in v-icon components",
    });

  if (options.clearable === true)
    props.push({
      prop: "clearable",
      type: ["Boolean"],
      default: "false",
      description: "Makes input clearable",
    });

  return [
    ...props,
    {
      prop: "state",
      type: ["String"],
      default: "empty string",
      description:
        "Overrides state of input validity. Supported values are 'valid', 'invalid' or 'empty string' for default state",
    },
  ];
};

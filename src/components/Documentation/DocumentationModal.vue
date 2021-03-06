<template>
  <h3>Modal</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>

    <h6>Events</h6>
    <p></p>
    <table-reference-basic :items="events" reference="event"></table-reference-basic>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots" reference="slot"></table-reference-basic>
  </section>

  <section>
    <h4>Example - simple modal</h4>
    <div class="example md:flex">
      <example-modal-simple></example-modal-simple>
    </div>
    <v-code :code="exampleModalSimpleCode" template language="html"></v-code>
    <v-code :code="exampleModalSimpleCode" script language="js"></v-code>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example md:flex">
      <example-modal></example-modal>
    </div>
    <v-code :code="exampleModalCode" template language="html"></v-code>
    <v-code :code="exampleModalCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleModal from "./examples/ExampleModal.vue"
import ExampleModalSimple from "./examples/ExampleModalSimple.vue"
import exampleModalCode from "./examples/ExampleModal.vue?raw"
import exampleModalSimpleCode from "./examples/ExampleModalSimple.vue?raw"
import { styleProps } from "./shared-props"

export default {
  components: {
    ExampleModal,
    ExampleModalSimple,
  },
  setup() {
    let reference = ref([
      {
        prop: "v-model",
        type: ["Boolean"],
        default: "false",
        description: "Set v-model to true to show modal or false to hide it",
      },
      {
        prop: "title",
        type: ["String"],
        default: "false",
        description: "Title displayed in modal header",
      },
      {
        prop: "no-primary-button",
        type: ["Boolean"],
        default: "false",
        description: "Disables primary (OK) button",
      },
      {
        prop: "no-secondary-button",
        type: ["Boolean"],
        default: "false",
        description: "Disables secondary (Cancel) button",
      },
      {
        prop: "primary-button-attrs",
        type: ["String"],
        default: "{ styleButton: 'primary' }",
        description: "Attributes of primary v-button",
      },
      {
        prop: "secondary-button-attrs",
        type: ["String"],
        default: "{ styleButton: 'secondary' }",
        description: "Attributes of secondary v-button",
      },
      {
        prop: "primary-button-label",
        type: ["String"],
        default: "OK",
        description: "Label of primary button",
      },
      {
        prop: "secondary-button-label",
        type: ["String"],
        default: "Cancel",
        description: "Label of secondary button",
      },
      {
        prop: "primary-button-close",
        type: ["Boolean"],
        default: "false",
        description:
          "If true clicking primary button emits <code class='code-word'>input:secondaryButtonClick</code> event and closes modal. If false modal is not closed after emitting event",
      },
      {
        prop: "secondary-button-close",
        type: ["Boolean"],
        default: "false",
        description:
          "If true clicking primary button emits <code class='code-word'>input:primaryButtonClick</code> event and closes modal. If false modal is not closed after emitting event",
      },
      {
        prop: "justify-buttons",
        type: ["String"],
        default: "false",
        description:
          "Use this prop to place buttons in footer. Valid values are: 'start', 'end', 'center', 'between', 'around', 'evenly'",
      },
      {
        prop: "no-close-button",
        type: ["Boolean"],
        default: "false",
        description: "Disables 'X' button in modal header",
      },
      {
        prop: "close-button-in-content",
        type: ["Boolean"],
        default: "false",
        description: "Renders absolute positioned close button inside content container (instead of header). This can be useful if header is disabled or when showing images that span entire modal. See such example below.",
      },
      {
        prop: "static-backdrop",
        type: ["Boolean"],
        default: "false",
        description:
          "If true modal dialog cannot be closed by clicking outside of it",
      },
      {
        prop: "no-header",
        type: ["Boolean"],
        default: "false",
        description:
          "Do not render header if true",
      },
      {
        prop: "no-footer",
        type: ["Boolean"],
        default: "false",
        description:
          "Do not render footer if true",
      },
      {
        prop: "position",
        type: ["String"],
        default: "top",
        description: "Modal position. Valid values are: 'top' or 'center'",
      },
      {
        prop: "size",
        type: ["String"],
        default: "md",
        description: "Modal size. Valid values are: 'sm', 'md', 'lg', 'xl' or 'fit' ",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "fade-slide-m",
        description:
          "Sets animation effect when showing or hiding modal. Valid values are: 'fade-[speed]', 'fade-slide-[speed]' or 'fade-scale-[speed]' where speed is 'f', 'm' or 's' for example 'fade-m' or 'fade-slide-f'. Empty string disables animations.",
      },
      ...styleProps("modal"),
    ]);

    let styles = ref([
      {
        prop: "style-modal",
        description: "Style of modal window",
      },
      {
        prop: "style-header",
        description: "Style of modal header",
      },
      {
        prop: "style-content",
        description: "Content part of modal window",
      },
      {
        prop: "style-backdrop",
        description:
          "Style of backdrop. Useful mainly for setting tint and opactity for modal background",
      },
    ]);

    let events = ref([
      {
        event: "input:primary-button-click",
        description: "Emmited after clicking primary button",
      },
      {
        event: "input:secondary-button-click",
        description: "Emmited after clicking secondary button",
      },
      {
        event: "input:static-backdrop-click",
        description: "Emmited after clicking backdrop if static-backdrop prop is true",
      },
    ]);

    let slots = ref([
      {
        slot: "default",
        description: "Modal content",
      },
      {
        slot: "header",
        description:
          "Modal header content",
      },
      {
        slot: "footer",
        description:
          "Modal footer content",
      },
    ]);

    return {
      reference,
      styles,
      events,
      slots,
      exampleModalCode,
      exampleModalSimpleCode,
    };
  },
};
</script>

<style scoped>
</style>

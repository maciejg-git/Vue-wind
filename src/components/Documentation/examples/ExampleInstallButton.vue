<template>
  <div class="flex items-center gap-4">
    <v-button>Default button</v-button>
    <v-button style-button="success">Success button</v-button>
    <v-button style-button="primary small">Small button</v-button>
    <v-button style-button="secondary tiny uppercase">Tiny button</v-button>
  </div>

  <div class="flex items-center gap-4 mt-6">
    <v-button
      style-button="new:danger visited:secondary small"
      :variant="variant"
      @click="variant = 'visited'"
    >
      {{ variant === "new" ? "Click me" : "Visited" }}
    </v-button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let variant = ref("new");

    return {
      variant,
    };
  },
};
</script>

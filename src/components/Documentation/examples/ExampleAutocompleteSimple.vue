<template>
  <v-autocomplete
    v-model="example.model"
    :items="example.items"
    icon="b-exclamation-circle"
    style-dropdown="shadow"
    class="w-[420px]"
  ></v-autocomplete>
</template>

<script>
import { reactive } from "vue";
import { languages } from "../../../const";

export default {
  setup() {
    let example = reactive({
      model: "",
      items: languages,
    });

    return {
      example,
    };
  },
};
</script>

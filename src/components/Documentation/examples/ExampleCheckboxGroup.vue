<template>
  <v-checkbox-group v-model="languages">
    <div v-for="l in languagesData" class="flex items-center my-2">
      <v-checkbox :value="l" :id="'language-' + l"></v-checkbox>
      <label :for="'language-' + l" class="ml-3">
        {{ l }}
      </label>
    </div>
  </v-checkbox-group>

  <div class="mt-5">
    <span class="font-semibold">Languages:</span>
    {{ languages }}
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let languages = ref([]);

    let languagesData = ref([
      "english",
      "swedish",
      "korean",
      "german",
      "icelandic",
      "japanese",
    ]);

    return {
      languages,
      languagesData,
    };
  },
};
</script>

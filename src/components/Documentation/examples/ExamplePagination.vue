<template>
  <v-pagination
    v-model="example.page"
    :items-count="example.itemsCount"
    :items-per-page="example.itemsPerPage"
    :max-pages="example.maxPages"
  />
<!-- CUT START -->
  <v-tabs base="tabs-material" class="mt-10">
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label for="model" class="font-semibold">v-model:</label>
          <v-input type="text" id="model" v-model="example.page"></v-input>
        </div>
        <div>
          <label for="items-count">items-count:</label>
          <v-input
            type="text"
            id="items-count"
            v-model.number="example.itemsCount"
          ></v-input>
        </div>
        <div>
          <label for="items-per-page">items-per-page:</label>
          <v-input
            type="text"
            id="items-per-page"
            v-model.number="example.itemsPerPage"
          ></v-input>
        </div>
        <div>
          <label for="max-pages">max-pages:</label>
          <v-input
            type="text"
            id="max-pages"
            v-model.number="example.maxPages"
          ></v-input>
        </div>
      </div>
    </v-tab>
    <v-tab name="Events">
      <template #name>
        Events
        <v-badge style-badge="secondary tiny" class="ml-2">
          {{ events.length }}
        </v-badge>
      </template>
      <event-viewer :events="events" />
    </v-tab>
  </v-tabs>
<!-- CUT END -->
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    let example = reactive({
      page: 1,
      itemsPerPage: 5,
      itemsCount: 50,
      maxPages: 7,
    });

    let events = ref([]);

    return {
      example,
      events,
    };
  },
};
</script>

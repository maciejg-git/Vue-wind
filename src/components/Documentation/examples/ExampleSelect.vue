<template>
  <!-- single value select -->

  <p class="my-6">Simple select</p>

  <v-select
    v-model="example.model"
    :state="example.state"
    :options="options"
    class="w-52"
  >
    <template #options-prepend>
      <option value="option (prepend slot)">option (prepend slot)</option>
    </template>
    <option value="option (default slot)">option (default slot)</option>
  </v-select>

  <!-- multiple value select -->

  <p class="my-6">Multiple options select</p>

  <v-select
    v-model="example.modelMultiple"
    :state="example.state"
    :options="options"
    :multiple="true"
    class="w-52"
  ></v-select>

  <p class="my-6">Select with icon</p>

  <div class="flex gap-x-10">

    <!-- icon (prop) -->

    <v-select
      v-model="example.model"
      :state="example.state"
      :options="options"
      icon="b-exclamation-circle"
      class="w-52"
    ></v-select>

    <!-- icon (slot) -->

    <v-select
      v-model="example.model"
      :state="example.state"
      :options="options"
      icon="b-exclamation-circle"
      class="w-52"
    >
      <template #icon>
        <v-icon
          name="b-exclamation-circle"
          class="absolute h-6 w-6 text-gray-400 dark:text-gray-400 ml-2 mr-2"
        ></v-icon>
      </template>
    </v-select>
  </div>
  <!-- CUT START -->
  <v-tabs base="tabs-material" class="mt-10">
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label for="model" class="font-semibold">v-model:</label>
          <v-input type="text" id="model" v-model="example.model"></v-input>
        </div>
        <div>
          <label for="model-multiple" class="font-semibold">
            v-model (multiple):
          </label>
          <v-input
            type="text"
            id="model-multiple"
            v-model="example.modelMultiple"
          ></v-input>
        </div>
        <div>
          <label for="state">state:</label>
          <v-select id="state" v-model="example.state">
            <option value="">normal (empty string)</option>
            <option value="valid">valid</option>
            <option value="invalid">invalid</option>
          </v-select>
        </div>
      </div>
    </v-tab>
    <v-tab>
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
      model: "",
      modelMultiple: [],
      state: "",
    });

    let events = ref([]);

    let options = ref([
      {
        value: "option",
        label: "option",
      },
      {
        value: "option 2",
        label: "option 2",
      },
      {
        value: "option 3",
        label: "option 3",
      },
    ]);

    return {
      example,
      options,
      events,
    };
  },
};
</script>

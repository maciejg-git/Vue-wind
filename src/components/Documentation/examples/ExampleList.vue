<template>
  <v-list width="500px" :tag="example.tag" :base="example.base">
    <v-list-item v-for="item in example.users" :active="item.active">
      <div class="flex gap-x-4">
        <div>
          <v-checkbox type="checkbox" v-model="item.active" />
        </div>
        <div>
          <div class="font-semibold">
            {{ item.full_name }}
          </div>
          <div class="text-text-400">
            {{ item.title }}
          </div>
        </div>
        <div class="text-sm text-gray-400 ml-auto">
          {{ item.department }}
        </div>
      </div>
    </v-list-item>
  </v-list>
  <!-- CUT START -->
  <div class="mt-5">
    <label for="style">List style:</label>
    <v-select id="style" v-model="example.base">
      <option value="list">bootstrap</option>
      <option value="list-material">material</option>
    </v-select>
  </div>
  <v-tabs base="tabs-material" class="mt-10">
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label for="tag">tag:</label>
          <v-select id="tag" v-model="example.tag">
            <option value="div">div</option>
            <option value="a">a</option>
            <option value="button">button</option>
          </v-select>
        </div>
      </div>
    </v-tab>
  </v-tabs>
  <!-- CUT END -->
</template>

<script>
import { reactive } from "vue";
import company from "../data/company.json";

export default {
  setup() {
    let example = reactive({
      users: company.slice(0, 5).map((i) => ({ ...i, active: false })),
      tag: "div",
      base: "list",
    });

    return {
      example,
    };
  },
};
</script>

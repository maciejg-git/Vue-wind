<template>
  <v-tree
    v-bind="example"
    ref="treeRef"
    :chevron-attrs="{ triangle: true }"
    :placeholder-folder-icon="['mdi-folder', 'mdi-folder-open']"
    placeholder-item-icon="b-file-earmark"
    @input:click="handleClickItem"
    @input:selected="handleSelectedItem"
  >
    <template #item-append="{ item }">
      <v-badge v-if="item.badge" style-badge="tiny" class="ml-2">
        {{ item.badge }}
      </v-badge>
    </template>
    <!-- <template #icon="{ item, isFolder }"> -->
    <!-- <v-icon :name="isFolder ? 'mdi-folder' : 'b-star'"></v-icon> -->
    <!-- </template> -->
  </v-tree>

  <v-button @click="treeRef.openAllLevel(9999)" class="mr-4 mt-4">
    Open all
  </v-button>
  <v-button @click="treeRef.closeAll()">Close all</v-button>
  <!-- CUT START -->
  <v-tabs base="tabs-material" class="mt-10">
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label for="filter">filter:</label>
          <v-input
            type="text"
            id="filter"
            v-model="example.filter"
            clearable
          ></v-input>
        </div>
        <div>
          <label for="open-on-click">open-on-click:</label>
          <v-select-prop id="open-on-click" v-model="example.openOnClick">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
          <label for="show-indicators">show-indicators:</label>
          <v-select-prop id="show-indicators" v-model="example.showIndicators">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
          <label for="show-icons">show-icons:</label>
          <v-select-prop id="show-icons" v-model="example.showIcons">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
          <label for="show-checkboxes">show-checkboxes:</label>
          <v-select-prop id="show-checkboxes" v-model="example.showCheckboxes">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
          <label for="select-return-keys">select-return-keys:</label>
          <v-select-prop
            id="select-return-keys"
            v-model="example.selectReturnKeys"
          >
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
          <label for="select-independent">select-independent:</label>
          <v-select-prop
            id="select-independent"
            v-model="example.selectIndependent"
          >
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
          <label for="allow-select-disabled">allow-select-disabled:</label>
          <v-select-prop
            id="allow-select-disabled"
            v-model="example.allowSelectDisabled"
          >
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
          <label for="allow-open-disabled">allow-open-disabled:</label>
          <v-select-prop
            id="allow-open-disabled"
            v-model="example.allowOpenDisabled"
          >
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
          <label for="transition">transition:</label>
          <v-select id="transition" v-model="example.transition">
            <option value="fade-f">fade-f</option>
            <option value="fade-m">fade-m</option>
            <option value="fade-s">fade-s</option>
            <option value="fade-slide-f">fade-slide-f</option>
            <option value="fade-slide-m">fade-slide-m</option>
            <option value="fade-slide-s">fade-slide-s</option>
            <option value="">empty string</option>
          </v-select>
        </div>
      </div>
    </v-tab>
    <v-tab>
      <template #name>
        Events
        <v-badge
          style-badge="secondary tiny"
          class="ml-2"
          update-animation="scale-up"
          :update-key="events.length"
        >
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
    const treeData = [
      {
        name: "Directory",
        id: 17,
        children: [
          { name: "Some item", id: 1 },
          { name: "Another item", id: 2 },
          { name: "Third item", id: 3 },
          { name: "File", icon: "b-star", id: 4 },
          {
            name: "Sub directory",
            id: 5,
            children: [
              {
                name: "Another sub directory",
                id: 6,
                children: [
                  { name: "Content", id: 7 },
                  { name: "Another item", id: 8 },
                ],
              },
              { name: "Fourth item", id: 9 },
              { name: "Another file", id: 10 },
              { name: "Video file", id: 11 },
              { name: "Secret item", id: 12 },
              {
                name: "More content here",
                id: 13,
                children: [
                  { name: "Another video file", id: 14, badge: "NEW" },
                  { name: "Fifth item", id: 15 },
                ],
              },
            ],
          },
          { name: "Sixth item", id: 16 },
        ],
      },
      {
        name: "Another directory",
        id: 17,
        children: [
          {
            name: "Sub dir",
            id: 5,
            children: [
              { name: "New file", id: 9 },
              { name: "Music file", id: 10 },
              { name: "Secret content", id: 12 },
              {
                name: "Folder",
                id: 13,
                children: [
                  { name: "Another file", id: 14, badge: "NEW" },
                  { name: "Readme", id: 15 },
                ],
              },
            ],
          },
          { name: "More content", id: 1 },
          { name: "Movie file", id: 16 },
        ],
      },
      ]

    let example = reactive({
      items: treeData,
      openOnClick: true,
      showIndicators: true,
      showIcons: true,
      showCheckboxes: false,
      filter: "",
      openAll: false,
      autoOpenRoot: false,
      autoOpenAll: false,
      selectReturnKeys: false,
      selectIndependent: false,
      allowSelectDisabled: false,
      allowOpenDisabled: true,
      transition: "fade-m",
    });

    let treeRef = ref(null);

    let selectedItems = ref([]);

    let events = ref([]);

    let handleClickItem = (item) => {
      events.value.unshift({ ev: "input:click", data: item });
    };

    let handleSelectedItem = (selection) => {
      events.value.unshift({ ev: "input:selected", data: selection });
    };

    return {
      example,
      selectedItems,
      treeRef,
      events,
      handleClickItem,
      handleSelectedItem,
    };
  },
};
</script>

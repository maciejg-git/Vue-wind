<template>
  <v-button>
    Button
    <v-chevron
      :initial="example.initial"
      :rotate180="example.rotate180"
      :triangle="example.triangle"
      :counter-clockwise="example.counterClockwise"
      :switch="example.switch"
      style-chevron="right"
    />
  </v-button>
  <!-- CUT START -->
  <v-tabs base="tabs-material" class="mt-5">
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label for="initial">initial:</label>
          <v-select id="initial" v-model="example.initial">
            <option value="down">down</option>
            <option value="left">left</option>
            <option value="right">right</option>
            <option value="up">up</option>
          </v-select>
        </div>
        <div>
          <label for="rotate180">rotate180:</label>
          <v-select-prop id="rotate180" v-model="example.rotate180">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
          <label for="triangle">triangle:</label>
          <v-select-prop id="triangle" v-model="example.triangle">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
          <label for="counter-clockwise">counter-clockwise:</label>
          <v-select-prop id="counter-clockwise" v-model="example.counterClockwise">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
          <label for="switch">switch:</label>
          <v-select-prop id="switch" v-model="example.switch">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
      </div>
    </v-tab>
  </v-tabs>
  <!-- CUT END -->
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    let example = reactive({
      initial: "right",
      rotate180: false,
      triangle: false,
      counterClockwise: false,
      switch: false,
    });

    return {
      example,
    };
  },
};
</script>

<template>
  <v-navbar
    sticky
    class="flex justify-between border-b dark:text-text-300 dark:border-dark-700 px-4 py-2"
  >
    <div>
      <span class="text-lg font-bold">VueTailwind</span>
      <div class="inline-block ml-5">
        <a href="/documentation/installation">Docs</a>
      </div>
    </div>
    <v-button base="button-plain" class="mr-2" @click="setDarkMode">
      <v-icon
        :name="darkMode ? 'b-sun' : 'b-moon'"
        class="v-icon--md text-dark-800 dark:text-dark-400"
      ></v-icon>
    </v-button>
  </v-navbar>

  <div class="flex text-text-800 dark:bg-neutral-800 dark:text-text-300/90">
    <div
      class="sidebar sticky lg:block flex-none overflow-auto border-r dark:border-dark-700 pb-20 top-16 p-3 w-64"
    >
      <!-- general -->

      <h6>
        <router-link to="/documentation/components" class="transition-all">
          Get started
        </router-link>
      </h6>
      <ul class="list-unstyled ml-4">
        <li>
          <router-link
            to="/documentation/installation"
            active-class="active"
            class="transition-all"
          >
            Installation
          </router-link>
        </li>
      </ul>

      <!-- components -->

      <h6>
        <router-link to="/documentation/components" class="transition-all">
          Components
        </router-link>
      </h6>
      <ul class="list-unstyled ml-4">
        <li v-for="(c, i) in components" :key="i">
          <router-link
            :to="'/documentation/' + c.name"
            active-class="active"
            class="transition-all"
          >
            {{ c.label }}
          </router-link>
        </li>
      </ul>

      <!-- form components -->

      <h6>
        <router-link to="/documentation/form-components" class="transition-all">
          Form Components
        </router-link>
      </h6>
      <ul class="list-unstyled ml-4">
        <li v-for="(c, i) in formComponents" :key="i">
          <router-link
            :to="'/documentation/' + c.name"
            active-class="active"
            class="transition-all"
          >
            {{ c.label }}
          </router-link>
        </li>
        <li>
          <router-link
            to="/documentation/form-validation"
            active-class="active"
            class="transition-all"
          >
            Form Validation
          </router-link>
        </li>
      </ul>

      <!-- directives -->

      <h6 class="mt-4">Directives</h6>
      <ul class="list-unstyled ml-4">
        <li>
          <router-link
            to="/documentation/tooltip"
            active-class="active"
            class="transition-all"
          >
            Tooltip
          </router-link>
        </li>
      </ul>
    </div>

    <div class="container w-full lg:max-w-screen-xl px-2 lg:px-24 mx-auto p-3">
      <router-view></router-view>

      <footer
        class="flex min-h-[100px] border-t border-gray-300 bg-white dark:bg-dark-800 dark:border-dark-700 mt-10 py-4"
      >
        <span class="ml-auto mr-4">
          <v-icon name="github" class="text-gray-500"></v-icon>
        </span>
      </footer>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
// light style
// import "../../styles/hljs/github.css";
import "../../styles/hljs/google-light.css";
// dark style
// import "../../styles/hljs/tokyo-night-dark.css";
// import "../../styles/hljs/vs2015.css";
import "../../styles/hljs/oceanicnext.css";
import { components, formComponents } from "./Components";

export default {
  setup() {
    let darkMode = ref(true);

    let setDarkMode = () => {
      if (!darkMode.value) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      darkMode.value = !darkMode.value;
    };

    onMounted(() => {
      if (darkMode.value) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    });

    return {
      setDarkMode,
      darkMode,
      components,
      formComponents,
    };
  },
};
</script>

<style scoped>
h3 {
  @apply text-3xl font-semibold mt-4;
}
h4 {
  @apply text-2xl font-semibold mt-4;
}
h5 {
  @apply text-xl font-semibold mt-4;
}
h6 {
  @apply text-lg font-semibold mt-4;
}

a.active {
  @apply inline-block font-bold py-1 pr-4 pl-4;
}
a {
  @apply inline-block py-1 pr-4 pl-2;
}
a:hover {
  @apply font-bold;
}

.sidebar {
  height: calc(100vh - 4rem);
}
.sidebar::-webkit-scrollbar {
  width: 0.5em;
}
.sidebar::-webkit-scrollbar-track {
}
.sidebar::-webkit-scrollbar-thumb {
  background-color: darkgrey;
}
</style>

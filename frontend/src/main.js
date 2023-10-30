import { createApp } from "vue";
import router from "./router/router.js";
import App from "./App.vue";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  components,
  directives,
});

const store = createStore({
  state: {
    profile: "",
    //staff: {},
  },
  mutations: {
    profile(state, profile) {
      state.profile = profile;
    },
  },
  plugins:[createPersistedState()]
});
export default store
const app = createApp(App);
app.use(store);
app.use(router);
app.use(vuetify);
app.mount("#app");


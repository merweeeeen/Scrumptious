import { createApp } from "vue";
import router from "./router/router.js";
import App from "./App.vue";
import { createStore } from "vuex";

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
  },
  mutations: {
    profile(state, profile) {
      state.profile = profile;
    },
  },
});

const app = createApp(App);

app.use(store);
app.use(vuetify);
app.use(router);
app.mount("#app");

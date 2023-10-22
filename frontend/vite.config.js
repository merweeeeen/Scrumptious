import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "test") {
    return {
      plugins: [
        vue({
          template: {
            compilerOptions: {
              isCustomElement: (tag) => tag.startsWith("v-"),
            },
          },
        }),
      ],
      base: "/Scrumptious/",
      test: {
        globals: true,
        coverage: {
          provider: "istanbul",
        },
        environment: "happy-dom",
        server: {
          deps: {
            inline: ['element-plus','vuetify'],
          },
          hookTimeout: 20000
        },
        testTimeout: 20000,
      },
    };
  } else {
    return {
      plugins: [vue()],
      base: "/Scrumptious/",
    };
  }
});

import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "main" },
  ],

  npmClient: "yarn",
  dva: {},
  plugins: ["@umijs/plugins/dist/dva"],
   
});

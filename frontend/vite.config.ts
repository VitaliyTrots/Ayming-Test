import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: "public",
  },
  resolve: {
    alias: {
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@hooks": "/src/hooks",
      "@icons": "/src/public/assets",
      "@helpers": "/src/helpers",
      "@store": "/src/store/",
      "@services": "/src/services/",
      "@store/contacts/contactsSlice": "/src/store/contacts/contactsSlice.ts",
      "@store/tickets/ticketsSlice": "store/tickets/ticketsSlice.ts",
      "@store/search/searchSlice": "store/search/searchSlice.ts",
    },
  },
});

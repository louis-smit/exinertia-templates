import React from "react";
import axios from "axios";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

axios.defaults.xsrfHeaderName = "x-csrf-token";

createInertiaApp({
  resolve: async (name) => {
    const path = import.meta.resolve(`./pages/${name}.tsx`);
    return await import(path);
  },
  setup({ App, el, props }) {
    createRoot(el).render(<App {...props} />);
  },
});

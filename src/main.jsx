import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "./utils/globalConstant.js";
import "./utils/globalFunctions.js";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import store from "./store/store";
import router from "./router/router";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </QueryClientProvider>
);

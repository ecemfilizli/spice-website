import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/productSlice";
import { productFeatures } from "./slices/productFeatures";

import { categorySlice } from "./slices/categorySlice";
import { contactSlice } from "./slices/contactSlice";
import { productContactSlice } from "./slices/productContactForm";
import { subscribeMailSlice } from "./slices/subscribeMail";
import { authApiSlice } from "./slices/authSlice";
import authReducer from "./slices/authSlice";
const store = configureStore({
  reducer: {
    [productSlice.reducerPath]: productSlice.reducer,
    [productFeatures.reducerPath]: productFeatures.reducer,
    [categorySlice.reducerPath]: categorySlice.reducer,
    [contactSlice.reducerPath]: contactSlice.reducer,
    [productContactSlice.reducerPath]: productContactSlice.reducer,
    [subscribeMailSlice.reducerPath]: subscribeMailSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productSlice.middleware)
      .concat(productFeatures.middleware)
      .concat(categorySlice.middleware)
      .concat(contactSlice.middleware)
      .concat(productContactSlice.middleware)
      .concat(subscribeMailSlice.middleware)
      .concat(authApiSlice.middleware),
});
export default store;

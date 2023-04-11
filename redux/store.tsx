import { configureStore } from "@reduxjs/toolkit";
import translationReducer from "./translationsSlice";
import profileReducer from "./profileSlice";
import { createWrapper } from "next-redux-wrapper";

export const makeStore = configureStore({
  reducer: {
    translation: translationReducer,
    profile: profileReducer,
  },
});

export const wrapper = createWrapper<typeof makeStore>;
export type RootState = ReturnType<typeof makeStore.getState>;
export type AppDispatch = typeof makeStore.dispatch;

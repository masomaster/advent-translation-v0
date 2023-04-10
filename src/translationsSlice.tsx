import { createSlice } from "@reduxjs/toolkit";
import { wrapper } from "./store";

const initialState = {
  hebrew: "",
  greek: "",
};

export const translationsSlice = createSlice({
  name: "translations",
  initialState,
  reducers: {
    setHebrew: (state, action) => {
      state.hebrew = action.payload;
    },
    setGreek: (state, action) => {
      state.greek = action.payload;
    },
  },
});

export const { setHebrew, setGreek } = translationsSlice.actions;

export default translationsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: null,
  lastName: null,
  latestDay: 1,
  preferredTranslation: "NIV",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setWholeProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
    incrementLatestDay: (state) => {
      state.latestDay += 1;
    },
  },
});

export const { setWholeProfile, incrementLatestDay } = profileSlice.actions;

export default profileSlice.reducer;

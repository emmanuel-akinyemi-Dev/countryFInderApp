import { createSlice } from "@reduxjs/toolkit";

interface LanguageState {
  language: string;
}

const initialState: LanguageState = {
  language: "en", // Default language is English
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;

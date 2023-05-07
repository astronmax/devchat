import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  sidebar_display: 0,
  content_store_key: 0,
}

export const MainWindowSlice = createSlice({
  name: 'MainWindow',
  initialState,
  reducers: {
    displayGroups: (state) => { state.sidebar_display = 0; },
    displayDirects: (state) => { state.sidebar_display = 1; },
    setContentStore: (state, key) => { state.content_store_key = key; }
  }
});

export const { displayGroups, displayDirects, setContentStore } = MainWindowSlice.actions;

export const selectSidebarDisplay = (state) => state.MainWindow.sidebar_display;
export const selectContentStore = (state) => state.MainWindow.content_store_key;

export default MainWindowSlice.reducer;

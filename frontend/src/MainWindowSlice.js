import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  sidebar_display: 0,
}

export const MainWindowSlice = createSlice({
  name: 'MainWindow',
  initialState,
  reducers: {
    displayGroups: (state) => { state.sidebar_display = 0; },
    displayDirects: (state) => { state.sidebar_display = 1; }
  }
});

export const { displayGroups, displayDirects } = MainWindowSlice.actions;
export const selectSidebarDisplay = (state) => state.MainWindow.sidebar_display;
export default MainWindowSlice.reducer;

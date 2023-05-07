import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  sidebar_display: 0,
  conversation: 0,
}

export const MainWindowSlice = createSlice({
  name: 'MainWindow',
  initialState,
  reducers: {
    displayGroups: (state) => {
      state.sidebar_display = 0;
      state.conversation = 0;
    },
    displayDirects: (state) => {
      state.sidebar_display = 1;
      state.conversation = 0;
    },
    setConversation: (state, key) => { state.conversation = key.payload; }
  }
});

export const { displayGroups, displayDirects, setConversation } = MainWindowSlice.actions;

export const selectSidebarDisplay = (state) => state.MainWindow.sidebar_display;
export const selectConversation = (state) => state.MainWindow.conversation;

export default MainWindowSlice.reducer;

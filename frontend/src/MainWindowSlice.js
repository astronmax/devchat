import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar_display: 0,
  conversation: 0,
  userlist_display: 0,
  current_user: 0
};

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
    setConversation: (state, data) => { state.conversation = data.payload; },
    setUserlistDisplay: (state) => { state.userlist_display = 1; },
    noUserlistDisplay: (state) => { state.userlist_display = 0; },
    setCurrentUser: (state, data) => { state.current_user = data.payload; }
  }
});

export const {
  displayGroups,
  displayDirects,
  setConversation,
  setUserlistDisplay,
  noUserlistDisplay,
  setCurrentUser,
} = MainWindowSlice.actions;

export const selectSidebarDisplay = (state) => state.MainWindow.sidebar_display;
export const selectConversation = (state) => state.MainWindow.conversation;
export const selectUserlistDisplay = (state) => state.MainWindow.userlist_display;
export const selectCurrentUser = (state) => state.MainWindow.current_user;

export default MainWindowSlice.reducer;

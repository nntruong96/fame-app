/**
 * Copyright (c) 2022 - Ferdon Vietnam Limited
 *
 * @author NNTruong / nhuttruong6496@gmail.com
 */
import {createSlice} from '@reduxjs/toolkit';
const initialModel = {
  data: [],
  pageNumber: 0,
  PageSize: 10,
};

export const Slice = createSlice({
  name: 'conversation',
  initialState: initialModel,
  reducers: {
    addConversation(state, action) {
      // console.log('setData', action);
      let {payload} = action;
      state.data = [payload.data].concat(state.data);
      return state;
    },
    fetchConversations(state, action) {
      let {payload} = action;
      state.data = payload.data;
      return state;
    },
    loadMoreConversation(state, action) {
      let {payload} = action;
      state.data.push(payload.data);
      return state;
    },
    loadMoreMessage(state, action) {
      let {payload} = action;
      let {conversationId, data} = payload;
      let findIndex = state.data.findIndex(item => item._id === conversationId);
      if (state.data[findIndex]) {
        state.data[findIndex].messages = data.concat(
          state.data[findIndex].messages,
        );
      }
      return state;
    },
    addMessage(state, action) {
      let {payload} = action;
      let {conversationId, messages, pageNumber, pageSize} = payload;
      let findIndex = state.data.findIndex(item => item._id === conversationId);
      if (state.data[findIndex]) {
        state.data[findIndex].messages =
          state.data[findIndex].messages.concat(messages);
        state.data[findIndex].pageNumber =
          pageNumber || state.data[findIndex].pageNumber;
        state.data[findIndex].pageSize =
          pageSize || state.data[findIndex].pageSize;
      }
      return state;
    },
    reset() {
      return {
        data: [],
        pageNumber: 0,
        PageSize: 10,
      };
    },
  },
});

export const conversationSliceActions = Slice.actions;
export default Slice.reducer;

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
  name: 'post',
  initialState: initialModel,
  reducers: {
    addPost(state, action) {
      // console.log('setData', action);
      let {payload} = action;
      state.data = [payload.post].concat(state.data);
      return state;
    },
    addPosts(state, action) {
      let {payload} = action;
      state.data = payload.posts.concat(state.data);
      return state;
    },
    loadMorePost(state, action) {
      let {payload} = action;
      state.data.push(payload.posts);
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

export const postSliceActions = Slice.actions;
export default Slice.reducer;

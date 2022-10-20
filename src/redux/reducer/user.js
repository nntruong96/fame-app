/**
 * Copyright (c) 2022 - Ferdon Vietnam Limited
 *
 * @author NNTruong / nhuttruong6496@gmail.com
 */
import {createSlice} from '@reduxjs/toolkit';
const initialModel = {
  userInfo: {
    _id: '',
  },
  isLogged: false,
  role: 2,
  network: 'testnet',
  connectedAuthServer: false,
  isOpenLoginModal: false,
};

export const Slice = createSlice({
  name: 'user',
  initialState: initialModel,
  reducers: {
    setData(state, action) {
      let {payload} = action;
      for (let key in payload) {
        if (typeof state[key] === 'object') {
          state[key] = {...state[key], ...payload[key]};
        } else {
          state[key] = payload[key];
        }
      }
      return state;
    },
    reset() {
      return {
        userInfo: {
          _id: '',
        },
        isLogged: false,
        role: 1,
        connectedAuthServer: false,
      };
    },
    updateUserInfo(state, action) {
      let {payload} = action;
      state.userInfo = {
        ...state.userInfo,
        ...payload.userInfo,
      };
      return state;
    },
    setLogin(state, action) {
      console.log('action', action);
      let {payload} = action;
      state.isLogged = payload.status;
      return state;
    },
  },
});

export const userSliceActions = Slice.actions;
export default Slice.reducer;

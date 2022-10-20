import {userSliceActions} from '../reducer/user';
import Constants, {
  clearStorage,
  setStorage,
  getStorage,
} from '../../util/Constants';
import axios from 'axios';
export const logout = (params, callback) => {
  return dispatch => {
    console.log('logout');
    dispatch(userSliceActions.reset({}));
    _clearStore(callback);
  };
};

export const login = (params, callback) => {
  return async dispatch => {
    try {
      let res = await axios.post(Constants.server + 'auth/login', params, {
        withCredentials: true,
        header: {
          'Content-Type': 'application/json',
        },
      });
      if (!res || !res.data || res.data.error_code) {
        throw new Error(res.data.error_code);
      }
      callback();
      setStorage(Constants.STORAGE.access_token, res.data.data.accessToken);
      dispatch(
        userSliceActions.setData({
          isLogged: true,
          userInfo: res.data.data.userData,
        }),
      );
    } catch (err) {
      callback(null, err);
      console.log(err);
    }
  };
};
export const fetchUser = async (access_token, callback) => {
  try {
    let res = await axios.get(Constants.server + 'user/', {
      withCredentials: true,
      header: {
        'Content-Type': 'application/json',
        Cookie: `access_token=${access_token}`,
      },
    });
    if (!res || !res.data || res.data.error_code) {
      throw new Error(res.data.error_code);
    }
    return res.data.data;
    // setStorage(Constants.STORAGE.access_token, res.data.data.accessToken);
    // dispatch(
    //   userSliceActions.setData({
    //     status: true,
    //     userInfo: res.data.data,
    //   }),
    // );
  } catch (err) {
    throw err;
  }
};

export const setLogin = (status, callback) => {
  return dispatch => {
    dispatch(userSliceActions.setLogin({status}));
  };
};

const _clearStore = async callback => {
  let onboardingViewed = await getStorage(Constants.STORAGE.onboardingViewed);
  await clearStorage();
  if (onboardingViewed) {
    await setStorage(Constants.STORAGE.onboardingViewed, 'true');
  }
  if (callback) {
    callback();
  }
};

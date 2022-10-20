import {postSliceActions} from '../reducer/post';

export const post = (data, callback = () => {}) => {
  return dispatch => {
    callback();
    dispatch(postSliceActions.addPost({post: data}));
  };
};

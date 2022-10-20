import {configureStore} from '@reduxjs/toolkit';
import user from './reducer/user';
import post from './reducer/post';
import conversation from './reducer/conversation';
export default configureStore({
  reducer: {
    user,
    post,
    conversation,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

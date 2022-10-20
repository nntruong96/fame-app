import {conversationSliceActions} from '../reducer/conversation';
import axios from 'axios';
import Constants, {getStorage} from '../../util/Constants';
export const fetchConversation = (userId, callback = () => {}) => {
  return async dispatch => {
    let access_token = await getStorage(Constants.STORAGE.access_token);
    let res = await axios.get(Constants.server + 'conversations/' + userId, {
      withCredentials: true,
      header: {
        'Content-Type': 'application/json',
        Cookie: `access_token=${access_token}`,
      },
    });
    if (!res || !res.data || res.data.error_code) {
      return callback();
    }
    let data = res.data.map(item => ({
      ...item,
      pageSize: 100,
      pageNumber: 0,
      messages: [],
    }));
    dispatch(
      conversationSliceActions.fetchConversations({
        data: data,
      }),
    );
    callback();
  };
};

export const fetchMessage = (
  {pageSize = 10, pageNumber = 0, conversationId},
  callback = () => {},
) => {
  return async dispatch => {
    let access_token = await getStorage(Constants.STORAGE.access_token);
    let res = await axios.get(
      Constants.server +
        `messages/${conversationId}?page_size=${pageSize}&page_number=${pageNumber}`,
      {
        withCredentials: true,
        header: {
          'Content-Type': 'application/json',
          Cookie: `access_token=${access_token}`,
        },
      },
    );
    if (!res || !res.data || res.data.error_code) {
      return callback();
    }
    dispatch(
      conversationSliceActions.addMessage({
        messages: res.data.messages,
        conversationId,
        pageNumber: res.data.pageNumber,
        pageSize: res.data.pageSize,
      }),
    );
    callback();
  };
};

export const sendMessage = (data, callback = () => {}) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        `${Constants.server}messages`,
        data.message,
        {
          withCredentials: true,
          header: {
            'Content-Type': 'application/json',
            Cookie: `access_token=${data.access_token}`,
          },
        },
      );
      console.log(res.data);
      dispatch(
        conversationSliceActions.addMessage({
          conversationId: data.conversationId,
          messages: [res.data],
        }),
      );
      callback();
    } catch (err) {
      console.log(err);
    }
  };
};

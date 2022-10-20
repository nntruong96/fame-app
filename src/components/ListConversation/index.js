/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {useDispatch} from 'react-redux';
import useShallowEqualSelector from '../../redux/customHook/useShallowEqualSelector';
// import {fetchConversation} from '../../redux/actions/conversation';
import Conversation from '../Conversation';
export default function Index() {
  const [requesting, setRequesting] = useState(false);
  const {userInfo, conversation} = useShallowEqualSelector(state => ({
    userInfo: state.user.userInfo,
    conversation: state.conversation,
  }));
  const {data} = conversation;
  // const dispatch = useDispatch();
  return (
    <View>
      <Text>List Conversation</Text>
      {data.map((item, index) => {
        return <Conversation key={item._id} data={item} />;
      })}
    </View>
  );
}

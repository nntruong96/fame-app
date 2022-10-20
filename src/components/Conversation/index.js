/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import Constants from '../../util/Constants';
import {getName} from '../../util/script';
import useShallowEqualSelector from '../../redux/customHook/useShallowEqualSelector';
import AvatarSource from '../../images/a.png';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import {fetchMessage} from '../../redux/actions/conversation';

export default function Index({data}) {
  const [requesting, setRequesting] = useState(false);
  const {userInfo} = useShallowEqualSelector(state => ({
    userInfo: state.user.userInfo,
  }));
  const dispatch = useDispatch();
  const navigation = useNavigation();
  let {members, info = [], messages = []} = data;
  let others = info.find(item => item._id !== userInfo._id);
  let {firstName, email, avatar, lastName, nickName} = others;
  useEffect(() => {
    setRequesting(true);
    dispatch(
      fetchMessage({
        conversationId: data._id,
        pageSize: data.pageSize,
        pageNumber: data.pageNumber,
      }),
    );
  }, []);
  const _getName = () => {
    return email;
    // return nickName
    //   ? nickName
    //   : getName({
    //       firstName,
    //       lastName,
    //     });
  };
  const setSeen = message => {
    console.log('setSeen');
  };
  let lastMessage = messages[messages.length - 1] || {};
  let {seen = [], sender = ''} = lastMessage;
  let messageStyle = StyleSheet.create({
    message: {
      color:
        sender === userInfo._id || seen.includes(userInfo._id)
          ? 'gray'
          : 'black',
      fontWeight:
        sender === userInfo._id || seen.includes(userInfo._id)
          ? 'normal'
          : 'bold',
    },
  });
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(Constants.SCREENS.messager, {
          conversation: data,
        });
        if (sender !== userInfo._id && !seen.includes(userInfo._id)) {
          setSeen(lastMessage);
        }
      }}>
      <View style={styles.container}>
        <Image
          onError={({nativeEvent: {error}}) => console.log(error)}
          style={styles.avatar}
          source={AvatarSource}
        />
        <View>
          <Text style={styles.userName}>{_getName()}</Text>
          <Text style={messageStyle.message}>
            {sender === userInfo._id ? 'You: ' : ''}
            {lastMessage.text}
            {'   '}
            {moment(lastMessage.createAt).format('DD/MM HH:mm')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'black',
  },
});

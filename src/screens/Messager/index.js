/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import useShallowEqualSelector from '../../redux/customHook/useShallowEqualSelector';
import Messager from '../../components/Messager';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {sendMessage} from '../../redux/actions/conversation';
import {useDispatch} from 'react-redux';
import Constants, {getStorage} from '../../util/Constants';
import {deepClone} from '../../util/script';
import {SocketContext} from '../../../App';
export default function Index({route}) {
  const [value, setValue] = useState('');
  const [requesting, setRequesting] = useState(false);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  let conversationId = route?.params?.conversation?._id;
  let {conversation, userInfo} = useShallowEqualSelector(state => ({
    conversation: state.conversation.data.find(
      item => item._id === conversationId,
    ),
    userInfo: state.user.userInfo,
  }));
  const send = () => {
    let receiverId = conversation.members.find(item => item !== userInfo._id);
    let access_token = getStorage(Constants.STORAGE.access_token);
    setRequesting(true);
    socket.emit('sendMessage', {
      senderId: userInfo._id,
      receiverId,
      text: value,
      conversationId,
    });

    dispatch(
      sendMessage(
        {
          access_token,
          conversationId,
          message: {
            conversationId,
            text: value,
            sender: userInfo._id,
            createAt: Date.now(),
          },
        },
        (res, err) => {
          setValue('');
          setRequesting(false);
          // Keyboard.dismiss();
        },
      ),
    );
  };
  const _onRefresh = () => {};
  const renderItem = _props => {
    let item = _props.item;
    if (!item) {
      return null;
    }
    let owner = item.sender === userInfo._id;
    return <Messager key={item._id} data={item} owner={owner} />;
  };
  let data = [];
  if (conversation?.messages) {
    data = deepClone(conversation?.messages);
    data.reverse();
  }
  return (
    <View style={styles.container}>
      <FlatList
        inverted
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.createAt}
      />
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Aa"
          onChangeText={setValue}
          value={value}
        />
        <TouchableOpacity onPress={send}>
          <View>
            <MaterialCommunityIcons name="send" size={30} color={'blue'} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  flex: {
    flex: 1,
  },
  contentContainerStyle: {paddingBottom: 10},
  scroll: {
    backgroundColor: 'pink',
    // marginBottom: 80,
    // paddingHorizontal: 12,
    // paddingBottom: 50,
  },
  containerInput: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 12,
    marginRight: 12,
  },
});

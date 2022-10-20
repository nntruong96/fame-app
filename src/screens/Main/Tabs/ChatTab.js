/* eslint-disable react-hooks/exhaustive-deps */
import {View, TextInput, StyleSheet, Button, ScrollView} from 'react-native';
import React, {useState} from 'react';
import ListFriendOnline from '../../../components/ListFriendOnline';
import ListConversation from '../../../components/ListConversation';
export default function HomeTab() {
  const [data, setData] = useState('');
  const [requesting, setRequesting] = useState(false);
  const onChangeText = value => {
    setData(value);
  };
  const isDisabled = () => {
    return !data || requesting;
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={data}
          multiline={true}
          placeholder="Find"
        />
        <ListFriendOnline />
        <ListConversation />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 12,
  },
  input: {
    borderWidth: 1,
    marginVertical: 12,
  },
  button: {
    alignItems: 'flex-end',
  },
});

/* eslint-disable react-hooks/exhaustive-deps */
import {View, TextInput, StyleSheet, Button, ScrollView} from 'react-native';
import React, {useState} from 'react';
import NewFeeds from '../../../components/NewFeeds';
import {post} from '../../../redux/actions/post';
import {useDispatch} from 'react-redux';
import useShallowEqualSelector from '../../../redux/customHook/useShallowEqualSelector';

export default function HomeTab() {
  const [data, setData] = useState('');
  const [requesting, setRequesting] = useState(false);
  const {userInfo} = useShallowEqualSelector(state => state.user);
  const dispatch = useDispatch();
  const onChangeText = value => {
    setData(value);
  };

  const _post = () => {
    setRequesting(true);
    dispatch(
      post(
        {
          userId: userInfo._id,
          desc: data,
        },
        (res, err) => {
          setRequesting(false);
          setData('');
        },
      ),
    );
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
          placeholder="what are you thinking?"
        />
        <View style={styles.button}>
          <Button onPress={_post} title="Post" disabled={isDisabled()} />
        </View>
        <NewFeeds />
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

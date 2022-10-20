import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {login} from '../../redux/actions/user';
import {useNavigation} from '@react-navigation/core';
import Constants from '../../util/Constants';
export default function Index() {
  const [data, setData] = useState({
    email: 'nhuttruong6496@gmail.com',
    password: 'truong0604',
  });
  const [requesting, setRequesting] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onChangeText = (value, key) => {
    setData({
      ...data,
      [key]: value,
    });
  };
  const _login = () => {
    setRequesting(true);
    dispatch(
      login(data, (res, err) => {
        setRequesting(false);
        if (err) {
          return null;
        }
        navigation.navigate(Constants.SCREENS.main);
      }),
    );
  };
  const isDisabled = () => {
    return !data.email || !data.password || requesting;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.label}>User name</Text>
      <TextInput
        style={styles.input}
        onChangeText={value => onChangeText(value, 'email')}
        value={data.email}
      />
      <Text style={styles.label}>password</Text>
      <TextInput
        style={styles.input}
        onChangeText={value => onChangeText(value, 'password')}
        value={data.password}
        type="password"
        secureTextEntry
      />
      <Button onPress={_login} title="Login" disabled={isDisabled()} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    marginVertical: 12,
  },
  container: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 22,
  },
  label: {
    fontWeight: 'bold',
  },
});

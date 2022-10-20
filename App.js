/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useRef, createContext} from 'react';
import {ScrollView, StatusBar, useColorScheme, View, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import rootReducer from './src/redux/store';
import useShallowEqualSelector from './src/redux/customHook/useShallowEqualSelector';
import Constants, {getStorage} from './src/util/Constants';
import {userSliceActions} from './src/redux/reducer/user';
import {useDispatch} from 'react-redux';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './src/routes';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fetchUser} from './src/redux/actions/user';
import {io} from 'socket.io-client';
import {fetchConversation} from './src/redux/actions/conversation';
import {conversationSliceActions} from './src/redux/reducer/conversation';
const Stack = createNativeStackNavigator();
export const SocketContext = createContext();
const App = () => {
  const socket = useRef();
  const [isLoading, setLoading] = useState(true);
  let {isLogged, userInfo} = useShallowEqualSelector(state => ({
    userInfo: state.user.userInfo,
    isLogged: state.user.isLogged,
  }));
  const dispatch = useDispatch();
  const init = async () => {
    try {
      let accessToken = await getStorage(Constants.STORAGE.access_token);
      let res = await fetchUser(accessToken);
      dispatch(
        userSliceActions.setData({
          isLogged: true,
          userInfo: res,
        }),
      );
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    console.log('useEffect isLogged', isLogged);
    if (isLogged) {
      //fetch conversation
      dispatch(fetchConversation(userInfo._id, (res, err) => {}));
      //connect socket
      socket.current = io(Constants.baseServer);
      socket.current.on('getMessage', _data => {
        dispatch(
          conversationSliceActions.addMessage({
            messages: [_data],
            conversationId: _data.conversationId,
          }),
        );
      });
      socket.current.emit('addUser', userInfo._id);
      socket.current.on('getUsers', users => {
        // setOnlineUsers(
        //   user.followings.filter((f) => users.some((u) => u.userId === f))
        // );
      });
    } else {
      if (socket.current) {
        socket.current.disconnect();
      }
      //disconnect socket
    }
  }, [isLogged]);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    height: '100%',
  };
  const MyTheme = {
    ...DefaultTheme,
    dark: isDarkMode,
    colors: {
      ...DefaultTheme.colors,
      background: isDarkMode ? Colors.darker : Colors.lighter,
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <SocketContext.Provider value={socket.current}>
          {!isLoading ? (
            <Stack.Navigator
              initialRouteName={
                isLogged ? Constants.SCREENS.main : Constants.SCREENS.login
              }>
              {routes.map((item, index) => {
                return <Stack.Screen {...item} key={index} />;
              })}
            </Stack.Navigator>
          ) : (
            <Text>Loading</Text>
          )}
        </SocketContext.Provider>
      </SafeAreaView>
    </NavigationContainer>
  );
};

function Container(props) {
  return (
    <Provider store={rootReducer}>
      <App {...props} />
    </Provider>
  );
}
export default Container;

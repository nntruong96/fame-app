// import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeTab from './Tabs/HomeTab';
import ChatTab from './Tabs/ChatTab';
import LiveStream from './Tabs/LiveStream';
import Constants from '../../util/Constants';
const Tab = createBottomTabNavigator();
export default function Index() {
  return (
    <Tab.Navigator
      initialRouteName={Constants.SCREENS.home}
      screenOptions={{
        tabBarStyle: {height: 66, paddingBottom: 6},
      }}>
      <Tab.Screen
        name={Constants.SCREENS.home}
        component={HomeTab}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size, focused}) => {
            return (
              <MaterialCommunityIcons
                name={focused ? 'home' : 'home-outline'}
                size={30}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={Constants.SCREENS.chat}
        component={ChatTab}
        options={{
          headerShown: false,
          tabBarLabel: 'Chat',
          tabBarIcon: ({color, size, focused}) => {
            return (
              <MaterialCommunityIcons
                name={focused ? 'chat' : 'chat-outline'}
                size={30}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={Constants.SCREENS.live}
        component={LiveStream}
        options={{
          headerShown: false,
          tabBarLabel: 'Live',
          tabBarIcon: ({color, size, focused}) => {
            return (
              <MaterialCommunityIcons
                name={focused ? 'video' : 'video-outline'}
                size={30}
                color={color}
              />
            );
          },
        }}
      />

      {/*
      <Tab.Screen
        name={Constants.SCREENS.live}
        component={HomeTab}
        options={{
          headerShown: false,
          tabBarLabel: 'Live',
          tabBarIcon: ({color, size, focused}) => {
            return (
              <MaterialCommunityIcons
                name={focused ? 'video' : 'video-outline'}
                size={30}
                color={color}
              />
            );
          },
        }}
      />
       <Tab.Screen
        name={Constants.SCREENS.friend}
        component={HomeTab}
        options={{
          headerShown: false,
          tabBarLabel: 'Friend',
          tabBarIcon: ({color, size, focused}) => {
            return (
              <MaterialCommunityIcons
                name={focused ? 'account-multiple' : 'account-multiple-outline'}
                size={30}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={Constants.SCREENS.setting}
        component={HomeTab}
        options={{
          headerShown: false,
          tabBarLabel: 'Setting',
          tabBarIcon: ({color, size, focused}) => {
            return (
              <MaterialCommunityIcons
                name={focused ? 'cog' : 'cog-outline'}
                size={30}
                color={color}
              />
            );
          },
        }}
      /> */}
    </Tab.Navigator>
  );
}

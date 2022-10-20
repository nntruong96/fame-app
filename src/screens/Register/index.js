import {View, Text} from 'react-native';
import React from 'react';

export default function Index() {
  console.log('Register component');
  return (
    <View style={{height: 100, width: '100%', backgroundColor: 'red'}}>
      <Text color="white">Regiter</Text>
    </View>
  );
}

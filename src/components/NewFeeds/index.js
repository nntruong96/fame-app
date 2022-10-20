import {View, Text} from 'react-native';
import React from 'react';
import useShallowEqualSelector from '../../redux/customHook/useShallowEqualSelector';
export default function Index() {
  const {data} = useShallowEqualSelector(state => state.post);
  return (
    <View>
      <Text>NewFeeds</Text>
      {data.map((item, index) => {
        return (
          <View key={index}>
            <Text>{item.desc}</Text>
          </View>
        );
      })}
    </View>
  );
}

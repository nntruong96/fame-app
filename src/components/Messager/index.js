import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import AvatarSource from '../../images/a.png';
import Avatar from '../Avatar';
export default function Index({data, owner}) {
  const styles = StyleSheet.create({
    container: {
      justifyContent: owner ? 'flex-end' : 'flex-start',
      flexDirection: 'row',
    },
    text: {
      backgroundColor: owner ? 'blue' : 'gray',
      color: 'white',
      borderRadius: 8,
      marginTop: 4,
      padding: 8,
    },
  });

  return (
    <View style={styles.container}>
      {!owner ? <Avatar source={AvatarSource} /> : null}
      <Text style={styles.text}>{data.text}</Text>
    </View>
  );
}

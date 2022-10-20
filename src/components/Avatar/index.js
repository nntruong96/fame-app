import {Image, StyleSheet} from 'react-native';
import React from 'react';

export default function Index({source}) {
  return <Image style={styles.avatar} source={source} />;
}
const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

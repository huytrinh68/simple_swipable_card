import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

export const Header = () => (
  <>
    <Text style={styles.title}>CBTabView</Text>
    <View style={{flexDirection: 'row'}}>
      <View
        style={{width: 50, height: 50, backgroundColor: 'red', marginRight: 12}}
      />
      <View
        style={{
          width: 300,
          height: 300,
          backgroundColor: 'green',
          marginRight: 12,
        }}
      />
      <View
        style={{
          width: 300,
          height: 300,
          backgroundColor: 'blue',
          marginRight: 12,
        }}
      />
    </View>
  </>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 4,
  },
  subtitle: {
    fontSize: 12,
  },
});

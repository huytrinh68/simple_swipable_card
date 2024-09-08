import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import Animated, {SharedValue, useAnimatedStyle} from 'react-native-reanimated';

type Props = {
  progress: Readonly<SharedValue<0 | 1>>;
};

const Chevron = ({progress}: Props) => {
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${progress.value * -180}deg`}],
  }));
  return (
    <Animated.View style={iconStyle}>
      <View style={{width: 24, height: 24, backgroundColor: '#000'}} />
    </Animated.View>
  );
};

export default Chevron;

const styles = StyleSheet.create({
  chevron: {
    width: 24,
    height: 24,
  },
});

import * as React from 'react';
import {Animated, StyleSheet} from 'react-native';

const cumulativeSum = arr => {
  const result = [];
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      result.push(arr[i]);
      sum += arr[i];
    } else {
      result.push(sum);
      sum += arr[i];
    }
  }
  return result;
};

const getTranslateX = (position, routes, listTabWidth) => {
  const inputRange = routes.map((_, i) => i);
  const listTabWithPosition = cumulativeSum(listTabWidth);
  const outputRange = listTabWithPosition.map((e, i) => {
    if (i === 0) {
      return listTabWidth[0] / 4;
    }
    return e + listTabWidth[i] / 4;
  });
  const translateX = position.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  });

  return Animated.multiply(translateX, 1);
};

export function TabBarIndicator({
  getTabWidth,
  layout,
  navigationState,
  position,
  style,
}) {
  const {routes} = navigationState;

  const transform = [];
  const inputRange = routes.map((_, i) => i);

  const outputRange = inputRange.reduce(
    (result, _current, index) => {
      const tabWidth = getTabWidth(index);
      result.indicator.push(tabWidth / 2);
      result.tabWidth.push(tabWidth);
      return result;
    },
    {
      indicator: [],
      tabWidth: [],
    },
  );
  if (layout.width) {
    const translateX =
      routes.length > 1
        ? getTranslateX(position, routes, outputRange.tabWidth)
        : 0;

    transform.push({translateX});
  }

  transform.push(
    {
      scaleX:
        routes.length > 1
          ? position.interpolate({
              inputRange,
              outputRange: outputRange.indicator,
              extrapolate: 'clamp',
            })
          : outputRange[0],
    },
    {translateX: 0.5},
  );
  return (
    <Animated.View style={[styles.indicator, {width: 1}, {transform}, style]} />
  );
}

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: '#ffeb3b',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 2,
  },
});

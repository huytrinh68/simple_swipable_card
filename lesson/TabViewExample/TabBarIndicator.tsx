import * as React from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import {useAnimatedValue} from './useAnimatedValue';

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
  width,
  gap,
  style,
}) {
  const isIndicatorShown = React.useRef(false);
  const isWidthDynamic = width === 'auto';

  const opacity = useAnimatedValue(isWidthDynamic ? 0 : 1);

  const indicatorVisible = isWidthDynamic
    ? layout.width &&
      navigationState.routes
        .slice(0, navigationState.index)
        .every((_, r) => getTabWidth(r))
    : true;

  React.useEffect(() => {
    const fadeInIndicator = () => {
      if (!isIndicatorShown.current && isWidthDynamic && indicatorVisible) {
        isIndicatorShown.current = true;

        Animated.timing(opacity, {
          toValue: 1,
          duration: 150,
          easing: Easing.in(Easing.linear),
          useNativeDriver: true,
        }).start();
      }
    };

    fadeInIndicator();

    return () => opacity.stopAnimation();
  }, [indicatorVisible, isWidthDynamic, opacity]);

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

  if (width === 'auto') {
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
  }
  return (
    <Animated.View
      style={[
        styles.indicator,
        {width: width === 'auto' ? 1 : width},
        {transform},
        style,
      ]}
    />
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

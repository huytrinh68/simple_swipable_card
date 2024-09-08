import React, { useState } from 'react';
import { Text, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const Card = ({
  item,
  index,
  dataLength,
  maxVisibleItem,
  currentIndex,
  animatedValue,
  setNewData,
  setCurrentIndex,
  newData,
  onPressCard
}) => {
  const { width } = useWindowDimensions()
  const translateX = useSharedValue(0)
  const direction = useSharedValue(0)

  const pan = Gesture.Pan()
    .onUpdate(e => {
      const isSwipeRight = e.translationX > 0
      direction.value = isSwipeRight ? 1 : -1
      if (currentIndex === index) {
        translateX.value = e.translationX
        animatedValue.value = interpolate(
          Math.abs(e.translationX),
          [0, width],
          [index, index + 1]
        )
      }
    })
    .onEnd(e => {
      if (currentIndex === index) {
        if (Math.abs(e.translationX) > 150 || Math.abs(e.velocityX) > 1000) {
          translateX.value = withTiming(width * direction.value, {}, () => {
            runOnJS(setCurrentIndex)(currentIndex + 1)
            runOnJS(setNewData)([...newData, newData[currentIndex]])
          })
          animatedValue.value = withTiming(currentIndex + 1)
        } else {
          translateX.value = withTiming(0, { duration: 500 })
          animatedValue.value = withTiming(currentIndex)
        }
      }
    })


  const animatedTranslateX = useAnimatedStyle(() => {
    const currentItem = index === currentIndex
    const rotateZ = interpolate(
      Math.abs(translateX.value),
      [0, width],
      [0, 20]
    )

    const translateY = interpolate(
      animatedValue.value,
      [index - 1, index],
      [30, 0]
    )

    const scale = interpolate(
      animatedValue.value,
      [index - 1, index],
      [0.9, 1]
    )
    const opacity = interpolate(
      animatedValue.value + maxVisibleItem,
      [index, index + 1],
      [0, 1]
    )
    return {
      transform: [
        { translateX: translateX.value },
        {
          scale: currentItem ? 1 : scale
        },
        {
          translateY: currentItem ? 0 : translateY
        },
        {
          rotateZ: currentItem ? `${direction.value * rotateZ}deg` : '0deg'
        }

      ],
      opacity: index < maxVisibleItem + currentIndex ? 1 : opacity
    }
  })
  // onPress={() => onPressCard(item.label)}
  return (
    <GestureDetector gesture={pan}>
      <AnimatedPressable style={[styles.container(item), {
        zIndex: dataLength - index,
        opacity: index < maxVisibleItem ? 1 : 0
      }, animatedTranslateX]}
        onPress={() => onPressCard(item.label)}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>{item.label}</Text>
      </AnimatedPressable>
    </GestureDetector>
  )
};

const styles = StyleSheet.create({
  container: item => ({
    flex: 1,
    backgroundColor: item.color,
    position: 'absolute',
    width: 360,
    height: 200,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  }),
  pressableCard: {
    width: 360,
    height: 200,
  }
})
export default Card;

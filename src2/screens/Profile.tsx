import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import React, {FC, memo, useCallback, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  FlatListProps,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
  Text,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import useScrollSync from '../hooks/useScrollSync';
import ConnectionList from '../components/ConnectionList';
import {Connection} from '../types/Connection';
import {ScrollPair} from '../types/ScrollPair';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FRIENDS, SUGGESTIONS} from '../mocks/connections';
import {HeaderConfig} from '../types/HeaderConfig';
import {Visibility} from '../types/Visibility';
import HeaderOverlay from '../components/HeaderOverlay';

const TAB_BAR_HEIGHT = 48;
const HEADER_HEIGHT = 48;

const OVERLAY_VISIBILITY_OFFSET = 32;

const Tab = createMaterialTopTabNavigator();

const Profile: FC = () => {
  const {top, bottom} = useSafeAreaInsets();

  const {height: screenHeight} = useWindowDimensions();

  const friendsRef = useRef<FlatList>(null);
  const suggestionsRef = useRef<FlatList>(null);
  const otherRef = useRef<FlatList>(null);

  const [tabIndex, setTabIndex] = useState(0);

  const [headerHeight, setHeaderHeight] = useState(0);

  const defaultHeaderHeight = top + HEADER_HEIGHT;

  const headerConfig = useMemo<HeaderConfig>(
    () => ({
      heightCollapsed: defaultHeaderHeight,
      heightExpanded: headerHeight,
    }),
    [defaultHeaderHeight, headerHeight],
  );

  const {heightCollapsed, heightExpanded} = headerConfig;

  const headerDiff = heightExpanded - heightCollapsed;

  const rendered = headerHeight > 0;

  const handleHeaderLayout = useCallback<NonNullable<ViewProps['onLayout']>>(
    event => setHeaderHeight(event.nativeEvent.layout.height),
    [],
  );

  const friendsScrollValue = useSharedValue(0);

  const friendsScrollHandler = useAnimatedScrollHandler(
    event => (friendsScrollValue.value = event.contentOffset.y),
  );

  const suggestionsScrollValue = useSharedValue(0);

  const suggestionsScrollHandler = useAnimatedScrollHandler(
    event => (suggestionsScrollValue.value = event.contentOffset.y),
  );

  const otherScrollValue = useSharedValue(0);

  const otherScrollHandler = useAnimatedScrollHandler(
    event => (otherScrollValue.value = event.contentOffset.y),
  );

  const complexTab1Ref = useRef<FlatList>(null);
  const complexTab1ScrollValue = useSharedValue(0);

  const complexTab1ScrollHandler = useAnimatedScrollHandler(
    event => (complexTab1ScrollValue.value = event.contentOffset.y),
  );

  const scrollPairs = useMemo<ScrollPair[]>(
    () => [
      {list: friendsRef, position: friendsScrollValue},
      {list: suggestionsRef, position: suggestionsScrollValue},
      {list: otherRef, position: otherScrollValue},
    ],
    [
      friendsRef,
      friendsScrollValue,
      suggestionsRef,
      suggestionsScrollValue,
      otherRef,
      otherScrollValue,
    ],
  );

  const {sync} = useScrollSync(scrollPairs, headerConfig);

  const сurrentScrollValue = useDerivedValue(() => {
    if (tabIndex === 0) {
      return friendsScrollValue.value;
    } else if (tabIndex === 1) return suggestionsScrollValue.value;
    else return otherScrollValue.value;
  }, [tabIndex, friendsScrollValue, suggestionsScrollValue, otherScrollValue]);

  const translateY = useDerivedValue(
    () => -Math.min(сurrentScrollValue.value, headerDiff),
  );

  const tabBarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
    opacity: interpolate(
      translateY.value,
      [-headerDiff, 0],
      [Visibility.Hidden, Visibility.Visible],
    ),
  }));

  const contentContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      paddingTop: rendered ? headerHeight + TAB_BAR_HEIGHT : 0,
      paddingBottom: bottom,
      minHeight: screenHeight + headerDiff,
    }),
    [rendered, headerHeight, bottom, screenHeight, headerDiff],
  );

  const sharedProps = useMemo<Partial<FlatListProps<Connection>>>(
    () => ({
      contentContainerStyle,
      onMomentumScrollEnd: sync,
      onScrollEndDrag: sync,
      scrollEventThrottle: 16,
      scrollIndicatorInsets: {top: heightExpanded},
    }),
    [contentContainerStyle, sync, heightExpanded],
  );

  const renderFriends = useCallback(
    () => (
      <ConnectionList
        ref={friendsRef}
        data={FRIENDS}
        onScroll={friendsScrollHandler}
        {...sharedProps}
      />
    ),
    [friendsRef, friendsScrollHandler, sharedProps],
  );

  const renderSuggestions = useCallback(
    () => (
      <ConnectionList
        ref={suggestionsRef}
        data={SUGGESTIONS}
        onScroll={suggestionsScrollHandler}
        {...sharedProps}
      />
    ),
    [suggestionsRef, suggestionsScrollHandler, sharedProps],
  );

  const renderOther = useCallback(
    () => (
      <ConnectionList
        ref={otherRef}
        data={FRIENDS}
        onScroll={otherScrollHandler}
        {...sharedProps}
      />
    ),
    [otherRef, otherScrollHandler, sharedProps],
  );

  const tabBarStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      rendered ? styles.tabBarContainer : undefined,
      {top: rendered ? headerHeight : undefined},
      tabBarAnimatedStyle,
    ],
    [rendered, headerHeight, tabBarAnimatedStyle],
  );

  const renderTabBar = useCallback<
    (props: MaterialTopTabBarProps) => React.ReactElement
  >(
    props => (
      <Animated.View style={tabBarStyle}>
        <TabBar onIndexChange={setTabIndex} {...props} />
      </Animated.View>
    ),
    [tabBarStyle],
  );

  const headerContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      rendered ? styles.headerContainer : undefined,
      {paddingTop: top},
      headerAnimatedStyle,
    ],

    [rendered, top, headerAnimatedStyle],
  );

  const collapsedOverlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [-headerDiff, OVERLAY_VISIBILITY_OFFSET - headerDiff, 0],
      [Visibility.Visible, Visibility.Hidden, Visibility.Hidden],
    ),
  }));

  const collapsedOverlayStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      styles.collapsedOvarlay,
      collapsedOverlayAnimatedStyle,
      {height: heightCollapsed, paddingTop: top},
    ],
    [collapsedOverlayAnimatedStyle, heightCollapsed, top],
  );

  return (
    <View style={styles.container}>
      <Animated.View onLayout={handleHeaderLayout} style={headerContainerStyle}>
        <Header
          name="Emily Davis"
          bio="Let's get started 🚀"
          photo={'https://picsum.photos/id/1027/300/300'}
        />
      </Animated.View>
      <Animated.View style={{}}>
        <HeaderOverlay name="Emily Davis" />
      </Animated.View>
      <Tab.Navigator tabBar={renderTabBar}>
        <Tab.Screen name="Friends">{renderFriends}</Tab.Screen>
        <Tab.Screen
          name="Complex"
          component={ComplexTab}
          initialParams={{
            complexTab1Ref,
            complexTab1ScrollValue,
            complexTab1ScrollHandler,
            sharedProps,
          }}
        />
        <Tab.Screen name="Suggest">{renderSuggestions}</Tab.Screen>
        <Tab.Screen name="Other">{renderOther}</Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

const CPLTab = createMaterialTopTabNavigator();
const ComplexTab = props => {
  const {
    sharedProps,
    complexTab1Ref,
    complexTab1ScrollValue,
    complexTab1ScrollHandler,
  } = props?.params || '';
  const complexTab1 = useCallback(
    () => (
      <ConnectionList
        ref={complexTab1Ref}
        data={FRIENDS}
        onScroll={complexTab1ScrollHandler}
        // {...sharedProps}
      />
    ),
    [complexTab1Ref, complexTab1ScrollHandler, sharedProps],
  );
  const renderTabBar = () => (
    <Animated.View style={{}}>
      <TabBar onIndexChange={i => {}} {...props} />
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <CPLTab.Navigator>
        <CPLTab.Screen name="ComplexTab1">{complexTab1}</CPLTab.Screen>
        <CPLTab.Screen name="ComplexTab2" component={complexTab1} />
      </CPLTab.Navigator>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabBarContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1,
  },
  overlayName: {
    fontSize: 24,
  },
  collapsedOvarlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    zIndex: 2,
  },
  headerContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1,
  },
});

export default memo(Profile);

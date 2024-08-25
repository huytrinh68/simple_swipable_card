import React, {useCallback} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  CBAnimatedNavBar,
  CBAnimatedHeader,
  CBAnimatedTabBar,
  CBTabRoute,
  CBTabView,
  CBTabBar,
} from './lib';
import {useScrollManager} from './hooks';
import {Scene, NavBar, NavBarTitle, Header} from './components';

const initialWidth = Dimensions.get('window').width;
export type tabKeys =
  | 'all'
  | 'tradable'
  | 'gainers'
  | 'losers'
  | 'all2'
  | 'gainers2'
  | 'losers2';
export const tabs = [
  {key: 'all' as tabKeys, title: 'All assets'},
  {key: 'gainers' as tabKeys, title: 'Gainers'},
  {key: 'losers' as tabKeys, title: 'Losers'},
];

export const tab2s = [
  {key: 'all2' as tabKeys, title: 'All assets2'},
  {key: 'gainers2' as tabKeys, title: 'Gainers2'},
  {key: 'losers2' as tabKeys, title: 'Losers2'},
];

const data1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(i => ({
  title: `Title ${i}`,
  key: `key-${i}`,
}));

const data2 = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 119, 20, 21,
  22, 224, 123, 454, 1234, 6541,
].map(i => ({
  title: `Title ${i}`,
  key: `key-${i}`,
}));

export default function App() {
  const {scrollY, index, setIndex, getRefForKey, ...sceneProps} =
    useScrollManager(tabs);

  // const renderScene = () => {
  //   return (
  //     <View style={{width: 360, height: 500, backgroundColor: 'red'}}></View>
  //   );
  // };
  const renderScene = useCallback(
    ({route: tab}: {route: CBTabRoute}) => {
      console.log('tab', tab);
      // if (tab?.key === 'gainers') {
      //   return (
      //     <CBTabView
      //       index={index}
      //       setIndex={setIndex}
      //       width={initialWidth}
      //       routes={tab2s}
      //       renderTabBar={p => (
      //         <CBAnimatedTabBar scrollY={scrollY}>
      //           <CBTabBar {...p} />
      //         </CBAnimatedTabBar>
      //       )}
      //       renderScene={renderScene}
      //     />
      //   );
      // }
      return (
        <Scene
          isActive={tabs[index].key === tab.key}
          routeKey={tab.key}
          scrollY={scrollY}
          {...sceneProps}
          dataToRender={index === 0 || index == 2 ? data2 : data1}
        />
      );
    },
    [getRefForKey, index, tabs, scrollY],
  );

  return (
    <SafeAreaProvider>
      <View style={styles.screen}>
        <CBAnimatedHeader scrollY={scrollY}>
          <Header />
        </CBAnimatedHeader>

        <CBTabView
          index={index}
          setIndex={setIndex}
          width={initialWidth}
          routes={tabs}
          renderTabBar={p => (
            <CBAnimatedTabBar scrollY={scrollY}>
              {/* <CBTabBar {...p} /> */}
            </CBAnimatedTabBar>
          )}
          renderScene={renderScene}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

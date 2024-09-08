import * as React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {
  TabView,
  TabBar,
  SceneMap,
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view';
import Article from './Shared/Article';
import Albums from './Shared/Albums';
import Chat from './Shared/Chat';
import Contacts from './Shared/Contacts';
import {TabBarIndicator} from './TabBarIndicator';

type State = NavigationState<{
  key: string;
  title: string;
}>;

export default class DynamicWidthTabBarExample extends React.Component<
  {},
  State
> {
  static title = 'Scrollable tab bar (auto width)';
  static backgroundColor = '#3f51b5';
  static appbarElevation = 0;

  state = {
    index: 0,
    routes: [
      {key: 'article', title: 'Article'},
      {key: 'contacts', title: 'Contacts'},
      {key: 'albums', title: 'Albums'},
      {key: 'chat', title: 'Chat'},
      {key: 'long', title: 'long long long title'},
      {key: 'medium', title: 'medium title'},
    ],
  };

  private handleIndexChange = (index: number) =>
    this.setState({
      index,
    });

  private renderTabBar = (
    props: SceneRendererProps & {navigationState: State},
  ) => (
    <TabBar
      {...props}
      scrollEnabled
      style={styles.tabbar}
      labelStyle={styles.label}
      tabStyle={styles.tabStyle}
      renderIndicator={props => (
        <TabBarIndicator
          {...props}
          style={{backgroundColor: 'white', height: 2}}
        />
      )}
    />
  );

  private renderScene = SceneMap({
    albums: Albums,
    contacts: Contacts,
    article: Article,
    chat: Chat,
    long: Article,
    medium: Article,
  });

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TabView
          navigationState={this.state}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabBar}
          onIndexChange={this.handleIndexChange}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#3f51b5',
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
  label: {
    fontWeight: '400',
  },
  tabStyle: {
    width: 'auto',
  },
});

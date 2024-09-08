import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import Animated from 'react-native-reanimated';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import Tab4 from './Tab4';

const renderScene = SceneMap({
    tab1: Tab1,
    tab2: Tab2,
    tab3: Tab3,
    tab4: Tab4,
});

const MultipleTab = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'tab1', title: 'Tab1' },
        { key: 'tab2', title: 'Tab2' },
        { key: 'tab3', title: 'Tab3' },
        { key: 'tab4', title: 'Tab4' },
    ]);
    const _renderTabBar = (props) => {
        return (
            <TabBar
                {...props}
                // indicatorContainerStyle={{ alignItems: 'center', justifyContent: 'center', marginLeft: 20, paddingRight: 20 }}
                indicatorStyle={{ backgroundColor: 'red', borderRadius: 100, height: 4, alignSelf: 'center', alignItems: 'center', alignContent: 'center', marginTop: 20 }}
                style={{ backgroundColor: 'black' }}
                tabStyle={{ alignItems: 'center', justifyContent: 'center' }}
            // renderIndicator={() => <View style={{ width: 24, height: 4, backgroundColor: 'red' }} />}
            />
        );
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TabView
                lazy
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={(i) => { }}
                initialLayout={{ width: layout.width }}
                renderTabBar={_renderTabBar}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
});

export default MultipleTab
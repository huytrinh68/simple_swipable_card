import React from 'react'
import { SafeAreaView, useWindowDimensions, View } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import Tab21 from './Tab21';
import Tab22 from './Tab22';
import Tab23 from './Tab23';
import Tab24 from './Tab24';

const renderScene = SceneMap({
    tab21: Tab21,
    tab22: Tab22,
    tab23: Tab23,
    tab24: Tab24,
});

const Tab2 = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'tab21', title: 'Tab21' },
        { key: 'tab22', title: 'Tab22' },
        { key: 'tab23', title: 'Tab23' },
        { key: 'tab24', title: 'Tab24' },
    ]);
    return (
        <View style={{ flex: 1 }}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={(i) => { }}
                initialLayout={{ width: layout.width }}
            />
        </View>
    )
}
export default Tab2
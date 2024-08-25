import React from 'react'
import { View, Text } from 'react-native'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { TAB_TYPE } from './constant';
import MarketListStock from './MarketListStock';

const listTab = [
    {
        type: TAB_TYPE.VN30,
        showTabBar: true
    },
    {
        type: TAB_TYPE.HOSE,
        showTabBar: true
    },
    {
        type: TAB_TYPE.HNX,
        showTabBar: true
    },
    {
        type: TAB_TYPE.UPCOM,
        showTabBar: true
    },
]
const MarketList = () => {
    return (
        <View style={{ flex: 1 }}>
            <ScrollableTabView
                style={{ marginTop: 20 }}
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar />}
            >
                {listTab.map(e => {
                    return <MarketListStock tabType={e.type} showTabBar={e.showTabBar} tabLabel={e.type} key={e.type} />
                })}
            </ScrollableTabView>
        </View>
    )
}
export default MarketList
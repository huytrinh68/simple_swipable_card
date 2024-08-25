import React from 'react'
import { View } from 'react-native'
import MarketIndex from './MarketIndex'
import MarketList from './MarketList'
import MarketSearch from './MarketSearch'

const RDScreen = () => {
    return (
        <View style={{ flex: 1, paddingTop: 60 }}>
            <MarketSearch />
            <MarketIndex />
            <MarketList />
        </View>
    )
}
export default RDScreen
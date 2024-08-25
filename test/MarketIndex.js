import React from 'react'
import { ScrollView, View } from 'react-native'


const MarketIndex = () => {
    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ width: 120, height: 120, marginLeft: 12, borderRadius: 10, backgroundColor: '#c3c3c3' }} />
                <View style={{ width: 120, height: 120, marginLeft: 12, borderRadius: 10, backgroundColor: '#c3c3c3' }} />
                <View style={{ width: 120, height: 120, marginLeft: 12, borderRadius: 10, backgroundColor: '#c3c3c3' }} />
                <View style={{ width: 120, height: 120, marginLeft: 12, borderRadius: 10, backgroundColor: '#c3c3c3' }} />
                <View style={{ width: 120, height: 120, marginLeft: 12, borderRadius: 10, backgroundColor: '#c3c3c3' }} />
            </ScrollView>
        </View>
    )
}
export default MarketIndex
import React from 'react'
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native'
import useGetStock from './useGetStock'

const MarketListStock = ({ tabType, showTabBar }) => {
    const { loading, data } = useGetStock({ tabType })
    if (loading) {
        return (
            <View style={{ width: '100%', height: 300, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} color={'red'} />
            </View>
        )
    }

    const renderItem = ({ item }) => {
        return (
            <Pressable style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 12

            }}>
                <View>
                    <Text style={{ fontWeight: 'bold' }}>{item?.stockCode}</Text>
                    <Text>{item?.name}</Text>
                </View>
                <View>
                    <Text style={{ fontWeight: 'bold' }}>{item?.lastPrice}</Text>
                    <Text>{item?.changePriceValue}</Text>
                </View>
            </Pressable>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => `${item.stockCode}`}
                contentContainerStyle={{ padding: 16 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}
export default MarketListStock
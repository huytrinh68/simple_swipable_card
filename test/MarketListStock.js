import React, { forwardRef, useCallback } from 'react'
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import Animated from 'react-native-reanimated'
import useGetStock from './useGetStock'

const AnimatedList = Animated.createAnimatedComponent(FlatList)

const MarketListStock = forwardRef((props, ref) => {
    const { tabType } = props
    const { loading, data } = useGetStock({ tabType })

    const keyExtractor = useCallback((item) => item.stockCode, []);
    const renderItem = useCallback(
        ({ item }) => <StockItem item={item} />, [])

    if (loading) {
        return (
            <View style={styles.loadingStyle}>
                <ActivityIndicator size={'large'} color={'red'} />
            </View>
        )
    }


    return (
        <AnimatedList
            data={data}
            ref={ref}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
            {...props}
        />
    )
})

const StockItem = ({ item }) => {
    return (
        <Pressable style={styles.contentItemStyle}>
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
const styles = StyleSheet.create({
    contentItemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12

    },
    loadingStyle: {
        width: '100%',
        height: 300,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default MarketListStock
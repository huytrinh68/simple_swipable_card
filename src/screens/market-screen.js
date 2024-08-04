import React from "react"
import { SafeAreaView, ScrollView } from "react-native"
import Search from "../components/search"
import ListStock from "../sections/list-stock"
import MarketList from "../sections/market-list"

const MarketScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Search />
                <MarketList />
                <ListStock />
            </ScrollView>
        </SafeAreaView>
    )
}
export default MarketScreen
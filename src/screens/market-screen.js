import React from "react"
import { SafeAreaView, ScrollView } from "react-native"
import Search from "../components/search"
import MarketList from "../sections/market-list"

const MarketScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <Search />
                <MarketList />
            </ScrollView>
        </SafeAreaView>
    )
}
export default MarketScreen
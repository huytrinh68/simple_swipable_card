import React from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"

const data = [11, 2, 3, 4, 45, 5, 61, 6, 7, 53, 32, 12, 34, 15, 26]
const ListStock = () => {
    const renderItem = () => {
        return (
            <TouchableOpacity>
                <View style={{ marginHorizontal: 16, paddingVertical: 12, paddingHorizontal: 16, borderColor: "#888", borderWidth: 1, borderRadius: 20, marginBottom: 12 }}>
                    <Text>HPG</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            // nestedScrollEnabled
            scrollEnabled={false}
        />
    )
}

export default ListStock
import React from "react"
import { Text, View } from "react-native"

const Search = () => {
    return (
        <View style={{
            marginHorizontal: 16,
            borderColor: "#888",
            borderWidth: 1,
            borderRadius: 30,
            justifyContent: "center",
            paddingHorizontal: 16,
            paddingVertical: 12,
            width: "90%"
        }}>
            <Text style={{ color: "#888", fontSize: 16 }}>Search stocks...</Text>
        </View>
    )
}

export default Search
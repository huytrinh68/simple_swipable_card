import React from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"

const MarketList = () => {
    return (
        <View>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
                <TouchableOpacity>
                    <View style={{ width: 120, height: 120, alignItems: 'center', justifyContent: "center", borderColor: "#888", borderWidth: 1, borderRadius: 30, marginRight: 12 }}>
                        <Text>VNINDEX</Text>
                        <Text>1,236.60</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{ width: 120, height: 120, alignItems: 'center', justifyContent: "center", borderColor: "#888", borderWidth: 1, borderRadius: 30, marginRight: 12 }}>
                        <Text>VN30</Text>
                        <Text>1,281.01</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{ width: 120, height: 120, alignItems: 'center', justifyContent: "center", borderColor: "#888", borderWidth: 1, borderRadius: 30, marginRight: 12 }}>
                        <Text>UPCOM</Text>
                        <Text>93.77</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{ width: 120, height: 120, alignItems: 'center', justifyContent: "center", borderColor: "#888", borderWidth: 1, borderRadius: 30 }}>
                        <Text>HNX</Text>
                        <Text>231.56</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View >
    )
}

export default MarketList
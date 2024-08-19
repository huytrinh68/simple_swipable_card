import React, { useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { View } from 'react-native'
import { data } from './data'
import Card from './Card'
import { useSharedValue } from 'react-native-reanimated'


const MAX = 3
const SwipeableCard = () => {
    const [newData, setNewData] = useState([...data])
    const [currentIndex, setCurrentIndex] = useState(0)
    const animatedValue = useSharedValue(0)
    const onPressCard = (label) => {
        alert(label)
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#111111', alignItems: 'center', justifyContent: 'center' }}>
                {newData.map((e, i) => {
                    if (i > MAX + currentIndex || i < currentIndex) {
                        return null
                    }
                    return (
                        <Card
                            item={e}
                            key={e.id}
                            index={i}
                            dataLength={newData.length}
                            maxVisibleItem={MAX}
                            currentIndex={currentIndex}
                            animatedValue={animatedValue}
                            setNewData={setNewData}
                            setCurrentIndex={setCurrentIndex}
                            newData={newData}
                            onPressCard={onPressCard}
                        />
                    )
                })}
            </View>
        </GestureHandlerRootView>
    )
}
export default SwipeableCard
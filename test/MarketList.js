import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { View, Text, Dimensions } from 'react-native'
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { TAB_TYPE } from './constant';
import MarketListStock from './MarketListStock';
import useScrollSync from './useScrollSync';

const listTab = [
    {
        type: TAB_TYPE.VN30,
        showTabBar: true
    },
    {
        type: TAB_TYPE.HOSE,
        showTabBar: true
    },
    {
        type: TAB_TYPE.HNX,
        showTabBar: true
    },
    {
        type: TAB_TYPE.UPCOM,
        showTabBar: true
    },
]
const HEADER_TAB = 70
const POSITION_TAB = 236

const { height } = Dimensions.get('screen')
const MarketList = () => {

    const [headerHeight, setHeaderHeight] = useState(0);
    const rendered = headerHeight > 0;
    const [currentTab, setCurrentTab] = useState(0)
    const tabPositionRef = useRef(0)

    const headerConfig = useMemo(
        () => ({
            heightCollapsed: 0,
            heightExpanded: headerHeight + HEADER_TAB,
        }),
        [headerHeight]
    );

    const { heightCollapsed, heightExpanded } = headerConfig;

    const vn30Ref = useRef(null)
    const vn30ScrollValue = useSharedValue(0)
    const vn30ScrollHandler = useAnimatedScrollHandler(
        (event) => (vn30ScrollValue.value = event.contentOffset.y)
    );

    const hoseRef = useRef(null)
    const hoseScrollValue = useSharedValue(0)
    const hoseScrollHandler = useAnimatedScrollHandler(
        (event) => (hoseScrollValue.value = event.contentOffset.y)
    );

    const hnxRef = useRef(null)
    const hnxScrollValue = useSharedValue(0)
    const hnxScrollHandler = useAnimatedScrollHandler(
        (event) => (hnxScrollValue.value = event.contentOffset.y)
    );

    const upcomRef = useRef(null)
    const upcomScrollValue = useSharedValue(0)
    const upcomScrollHandler = useAnimatedScrollHandler(
        (event) => (upcomScrollValue.value = event.contentOffset.y)
    );

    const contentContainerStyle = useMemo(
        () => ({
            minHeight: 0,
            padding: 16,
        }),
        [rendered, headerHeight]
    );


    const scrollPairs = useMemo(
        () => [
            { list: vn30Ref, position: vn30ScrollValue },
            { list: hoseRef, position: hoseScrollValue },
            { list: hnxRef, position: hnxScrollValue },
            { list: upcomRef, position: upcomScrollValue },
        ],
        [
            vn30Ref, vn30ScrollValue,
            hoseRef, hoseScrollValue,
            hnxRef, hnxScrollValue,
            upcomRef, upcomScrollValue,
        ]
    );

    const { sync } = useScrollSync(scrollPairs, headerConfig);

    const sharedProps = useMemo(
        () => ({
            contentContainerStyle,
            onMomentumScrollEnd: sync,
            onScrollEndDrag: sync,
            scrollEventThrottle: 16,
            scrollIndicatorInsets: { top: heightExpanded },
        }),
        [contentContainerStyle, sync, heightExpanded]
    );

    const renderVN30Tab = useCallback(
        () => (
            <MarketListStock
                tabType={TAB_TYPE.VN30}
                showTabBar={true}
                tabLabel={TAB_TYPE.VN30}
                ref={vn30Ref}
                onScroll={vn30ScrollHandler}
                {...sharedProps}
            />
        ),
        [vn30Ref, vn30ScrollHandler, sharedProps]
    )


    const сurrentScrollValue = useDerivedValue(
        () => {
            switch (currentTab) {
                case 0:
                    return vn30ScrollValue.value
                case 1:
                    return hoseScrollValue.value
                case 2:
                    return hnxScrollValue.value
                case 3:
                    return upcomScrollValue.value
            }
        },
        [currentTab, vn30ScrollValue, hoseScrollValue, hnxScrollValue, upcomScrollValue]
    );

    const handleOnChangeTab = ({ i }) => {
        setCurrentTab(i)
    }

    // useEffect(() => {
    //     setInterval(() => {
    //         console.log(
    //             'сurrentScrollValue: ', сurrentScrollValue,
    //             'tabPositionRef: ', tabPositionRef.current
    //         )
    //     }, 5000)
    // }, [])

    const handleTabLayout = useCallback(
        (event) => {
            if (tabPositionRef.current === 0) {
                tabPositionRef.current = event.nativeEvent.layout
                setHeaderHeight(event.nativeEvent.layout.y)
            }
        },
        []
    );


    const viewAnimatedStyle = useAnimatedStyle(() => {
        // const transformY = interpolate(
        //     сurrentScrollValue.value,
        //     [0, 100],
        //     [0, -236],
        //     Extrapolation.CLAMP,
        // )
        console.log('сurrentScrollValue.value', сurrentScrollValue.value)
        const transformY = сurrentScrollValue.value > 100 ? withTiming(-(headerHeight + HEADER_TAB), { duration: 300 }) : withTiming(0, { duration: 300 })
        return {
            transform: [{ translateY: transformY }],
        };
    });

    return (
        <Animated.View style={[{ height: height * 1.1, backgroundColor: '#cecece' }, viewAnimatedStyle]} onLayout={handleTabLayout}>
            <ScrollableTabView
                style={{ marginTop: 20 }}
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar />}
                onChangeTab={handleOnChangeTab}
                prerenderingSiblingsNumber={Infinity} // Unexpected behavior for first time because when the first time, other tab not be initial
            >
                {renderVN30Tab()}
                <MarketListStock
                    tabType={TAB_TYPE.HOSE}
                    showTabBar={true}
                    tabLabel={TAB_TYPE.HOSE}
                    ref={hoseRef}
                    onScroll={hoseScrollHandler}
                    {...sharedProps}
                />
                <MarketListStock
                    tabType={TAB_TYPE.HNX}
                    showTabBar={true}
                    tabLabel={TAB_TYPE.HNX}
                    ref={hnxRef}
                    onScroll={hnxScrollHandler}
                    {...sharedProps}
                />
                <MarketListStock
                    tabType={TAB_TYPE.UPCOM}
                    showTabBar={true}
                    tabLabel={TAB_TYPE.UPCOM}
                    ref={upcomRef}
                    onScroll={upcomScrollHandler}
                    {...sharedProps}
                />
            </ScrollableTabView>
        </Animated.View>
    )
}

export default MarketList
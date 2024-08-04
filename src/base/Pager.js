import React, { forwardRef, useState, useRef, useCallback, useImperativeHandle } from 'react'
import { Animated, View } from 'react-native'
import PagerView, {
    PagerViewOnPageScrollEvent,
    PagerViewOnPageSelectedEvent,
    PageScrollStateChangedNativeEvent,
} from 'react-native-pager-view'

import { s } from 'lib/styles'

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

const Pager = forwardRef(function PagerImpl(
    {
        children,
        initialPage = 0,
        renderTabBar,
        onPageScrollStateChanged,
        onPageSelected,
        onPageSelecting,
        testID,
    }, ref) {
    const [selectedPage, setSelectedPage] = useState(0)
    const lastOffset = useRef(0)
    const lastDirection = useRef(0)
    const scrollState = useRef('')
    const pagerView = useRef(null)

    useImperativeHandle(ref, () => ({
        setPage: (
            index,
            reason
        ) => {
            pagerView.current?.setPage(index)
            onPageSelecting?.(index, reason)
        },
    }))

    const onPageSelectedInner = useCallback(
        (e) => {
            setSelectedPage(e.nativeEvent.position)
            onPageSelected?.(e.nativeEvent.position)
        },
        [setSelectedPage, onPageSelected],
    )

    const onPageScroll = useCallback(
        (e) => {
            const { position, offset } = e.nativeEvent
            if (offset === 0) {
                return
            }
            if (scrollState.current === 'settling') {
                if (lastDirection.current === -1 && offset < lastOffset.current) {
                    onPageSelecting?.(position, 'pager-swipe')
                    setSelectedPage(position)
                    lastDirection.current = 0
                } else if (
                    lastDirection.current === 1 &&
                    offset > lastOffset.current
                ) {
                    onPageSelecting?.(position + 1, 'pager-swipe')
                    setSelectedPage(position + 1)
                    lastDirection.current = 0
                }
            } else {
                if (offset < lastOffset.current) {
                    lastDirection.current = -1
                } else if (offset > lastOffset.current) {
                    lastDirection.current = 1
                }
            }
            lastOffset.current = offset
        },
        [lastOffset, lastDirection, onPageSelecting],
    )

    const handlePageScrollStateChanged = useCallback(
        (e) => {
            scrollState.current = e.nativeEvent.pageScrollState
            onPageScrollStateChanged?.(e.nativeEvent.pageScrollState)
        },
        [scrollState, onPageScrollStateChanged],
    )

    const onTabBarSelect = useCallback(
        (index) => {
            pagerView.current?.setPage(index)
            onPageSelecting?.(index, 'tabbar-click')
        },
        [pagerView, onPageSelecting],
    )

    return (
        <View testID={testID} style={{ flex: 1 }}>
            {renderTabBar({
                selectedPage,
                onSelect: onTabBarSelect,
            })}
            <AnimatedPagerView
                ref={pagerView}
                style={{ flex: 1 }}
                initialPage={initialPage}
                onPageScrollStateChanged={handlePageScrollStateChanged}
                onPageSelected={onPageSelectedInner}
                onPageScroll={onPageScroll}>
                {children}
            </AnimatedPagerView>
        </View>
    )
})

export { Pager, PageSelectedEvent, PagerRef, RenderTabBarFn, RenderTabBarFnProps }
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import DynamicTabView from "react-native-dynamic-tab-view";

const instructions = Platform.select({
    ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
    android:
        "Double tap R on your keyboard to reload,\n" +
        "Shake or press menu button for dev menu"
});

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            defaultIndex: 0
        };
        this.data = [
            { title: "Tab1", key: "item1", color: "blue" },
            { title: "Tab2", key: "item2", color: "yellow" }
        ];
    }

    _renderItem = (item, index) => {
        console.log("renderItem", index);
        return (
            <View
                key={item["key"]}
                style={{ backgroundColor: item["color"], height: index === 1 ? 500 : 300 }}
            />
        );
    };

    onChangeTab = index => { };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <DynamicTabView
                        data={this.data}
                        renderTab={this._renderItem}
                        defaultIndex={this.state.defaultIndex}
                        containerStyle={styles.container}
                        headerBackgroundColor={'pink'}
                        headerTextStyle={styles.headerText}
                        onChangeTab={this.onChangeTab}
                        headerUnderlayColor={'blue'}
                    />
                    <View style={{ backgroundColor: 'red', height: 100, width: 393 }}>

                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        marginTop: 16
    },
    headerText: {
        color: 'black'
    },
    tabItemContainer: {
        backgroundColor: "#cf6bab"
    }
});
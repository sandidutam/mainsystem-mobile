import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, Stylesheet } from 'react-native';

const TopTab = createMaterialTopTabNavigator();

function Inventory() {
    return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Invetory</Text>
        </View>
    );
}

function Bookkeeping() {
    return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Akuntansi</Text>
        </View>
    );
}


export const HighLevelLedgerComp = ({}) => {
    return (
    <TopTab.Navigator>
        <TopTab.Screen name="Inventory" component={Inventory} options={{tabBarLabel:'Inventaris'}} />
        <TopTab.Screen name="Bookkeeping" component={Bookkeeping} options={{tabBarLabel:'Pembukuan'}} />
    </TopTab.Navigator>
    );
}

export const LowLevelLedgerComp = ({}) => {
    return (
    <TopTab.Navigator>
        <TopTab.Screen name="Inventory" component={Inventory} options={{tabBarLabel:'Inventaris'}} />
        <TopTab.Screen name="Bookkeeping" component={Bookkeeping} options={{tabBarLabel:'Pembukuan'}} />
    </TopTab.Navigator>
    );
}
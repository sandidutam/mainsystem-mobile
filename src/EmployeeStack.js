import React, { useContext, useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, AntDesign, EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from "./AuthProvider";
import * as Device from 'expo-device';
import axios from 'axios';


export const HighLevelEmployee = ({}) => {
    return(
        <View>
            <Text>High Level</Text>
        </View>
    );   
}

export const LowLevelEmployee = ({}) => {
    return(
        <View>
            <Text>Low Level</Text>
        </View>
    );   
}
  
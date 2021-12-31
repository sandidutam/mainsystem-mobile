import React, { useContext, useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { 
    Image, Button, Text, View, StyleSheet, 
    TouchableOpacity, KeyboardAvoidingView, Systrace
} from "react-native";
import { Ionicons, AntDesign, EvilIcons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from "./AuthProvider";
import axios from 'axios';
import Color from './Color';
import { MainButton, SecondaryButton} from './Button';
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "react-native-elements/dist/helpers";



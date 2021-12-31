import React, { useContext, useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Systrace} from "react-native";
import { Ionicons, AntDesign, EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from "./AuthProvider";
import * as Device from 'expo-device';
import axios from 'axios';
import Color from './Color';
import { AttendantComp } from './AttendantComp';
import { MainButton } from './Button';
import { HighLevelLedgerComp, LowLevelLedgerComp } from './LedgerComp';
import { HighLevelDashboard, MandorLevelDashboard } from "./DashboardStack";
import { HighLevelEmployee, LowLevelEmployee } from "./EmployeeStack";
import { ProfileStack } from "./ProfileStack";

import { NavigationContainer } from '@react-navigation/native';
import { color } from "react-native-elements/dist/helpers";

// axios.defaults.baseURL = 'http://192.168.100.109:8000';
axios.defaults.baseURL = 'https://mainsystem.space';


const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function AccountScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext)

  return (
    <View style={{ flex:1, margin:20}}>
      <Text >Settings Screen</Text>
      <Text>User: {user.email}</Text>
      <Button title="Go to Dashboard" onPress={() => navigation.navigate('Dashboard')} />
      <View style={{flex:1, justifyContent: 'flex-end', marginBottom: 100}}>
          
        {/* <TouchableOpacity style={{
          alignSelf: 'center',
          justifyContent:'center',
          width: "60%",
          height: 50,
          borderColor: "blue",
          borderRadius: 10,
          marginVertical: 10,
          borderWidth: 0,
          backgroundColor: '#46A587',
          color: 'red'
        }}
        onPress={() => alert('ahay')}
        >
        <Text style={{color: 'white', alignSelf:'center'}}>Test Button</Text>
        </TouchableOpacity> */}
        
        <MainButton     title="Logout" color={Color.dangerColor}
                        clicked={() => {
                        // alert('Hello')
                        logout()
                    }}>
                        </MainButton>
      </View>
    </View>
  );
}

// Exported Screen for AppTabsStack
//  HighLevelStack

export const HighLevel = ({}) => {
  const { user, logout } = useContext(AuthContext);
  const [ valid, setValid ] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

    axios.get('/api/user')
      .then(response => {
        setRole(response.data.role);
        // console.log(role);
        var key = 'SuperAdmin';
        if (role === key ) {
          setValid(true);
          // debug
          // console.log(valid);
        }
      })
      .catch(error => {
        console.log(error.response);
      })

  }, []);


  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = focused
            ? 'ios-home'
            : 'ios-home-outline';
          // } else if (route.name === "Employee") {
          //   iconName = focused ? 'ios-people-sharp' : 'ios-people-outline';
          } else if ( route.name === "Attendant") {
            iconName = focused
            ? 'qrcode-scan'
            : 'magnify-scan';
            return <MaterialCommunityIcons name={iconName} size={30} color={'#6777EF'} />;
          // } else if (route.name === "Ledger") {
          //   iconName = focused ? 'book-sharp' : 'book-outline';
          } else if (route.name === "Account") {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={30} color={'#6777EF'} />;
        },
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        headerTitleAlign: 'center',
        tabBarStyle: {
          paddingTop:10,
          paddingBottom:10,
          // margin:20,
          position: 'absolute',
          bottom: 25,
          left: 20,
          right:20,
          elevation:60,
          borderRadius:25,
          height:80,
          
        },
        // tabBarLabelStyle: {
        //   color: '#46A587',
        //   fontSize: 10,
        // }
        tabBarShowLabel:false
        
      })}
    >
      <Tabs.Screen name="Dashboard" component={HighLevelDashboard} />
      {/* <Tabs.Screen name="Employee" component={HighLevelEmployee} options={{headerTitle: "Pegawai"}} /> */}
      <Tabs.Screen name="Attendant" component={AttendantComp} options={{headerTitle: "Presensi"}} />
      {/* <Tabs.Screen name="Ledger" component={HighLevelLedgerComp} options={{headerTitle: "Pembukuan"}} /> */}
      <Tabs.Screen name="Account" component={ProfileStack} options={{headerShown:false}} />
    </Tabs.Navigator>
  );
};


// LowLevelStack

export const MandorLevel = ({}) => {
  const { user, logout } = useContext(AuthContext);
  const [ valid, setValid ] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

    axios.get('/api/user')
      .then(response => {
        setRole(response.data.role);
        // console.log(role);
        var key = 'SuperAdmin';
        if (role === key ) {
          setValid(true);
          // debug
          // console.log(valid);
        }
      })
      .catch(error => {
        console.log(error.response);
      })

  }, []);

  

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = focused
            ? 'ios-home'
            : 'ios-home-outline';
          // } else if (route.name === "Employee") {
          //   iconName = focused ? 'ios-people-sharp' : 'ios-people-outline';
          } else if ( route.name === "Attendant") {
            iconName = focused
            ? 'qrcode-scan'
            : 'magnify-scan';
            return <MaterialCommunityIcons name={iconName} size={30} color={'#6777EF'} />;
          // } else if (route.name === "Ledger") {
          //   iconName = focused ? 'book-sharp' : 'book-outline';
          } else if (route.name === "Account") {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={30} color={'#6777EF'} />;
        },
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        headerTitleAlign: 'center',
        tabBarStyle: {
          paddingTop:10,
          paddingBottom:10,
          // margin:20,
          position: 'absolute',
          bottom: 25,
          left: 20,
          right:20,
          elevation:60,
          borderRadius:25,
          height:80,
          color: '#ffffff'
          
        },
        headerTitleContainerStyle: ({}) => {
          height:20
        },
        // tabBarLabelStyle: {
        //   color: '#46A587',
        //   fontSize: 10,
        // }
        tabBarShowLabel:false
      })}
    >
      <Tabs.Screen name="Dashboard" component={MandorLevelDashboard} />
      {/* <Tabs.Screen name="Employee" component={LowLevelEmployee} options={{headerTitle: "Pegawai"}} /> */}
      <Tabs.Screen name="Attendant" component={AttendantComp} options={{headerTitle: "Presensi"}} />
      {/* <Tabs.Screen name="Ledger" component={LowLevelLedgerComp} options={{headerTitle: "Pembukuan"}} /> */}
      <Tabs.Screen name="Account" component={ProfileStack}  options={{headerShown:false}} />
    </Tabs.Navigator>
  );
};

export const AdminLevel = ({}) => {
  const { user, logout } = useContext(AuthContext);
  const [ valid, setValid ] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

    axios.get('/api/user')
      .then(response => {
        setRole(response.data.role);
        // console.log(role);
        var key = 'SuperAdmin';
        if (role === key ) {
          setValid(true);
          // debug
          // console.log(valid);
        }
      })
      .catch(error => {
        console.log(error.response);
      })

  }, []);

  

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = focused
            ? 'ios-home'
            : 'ios-home-outline';
          // } else if (route.name === "Employee") {
          //   iconName = focused ? 'ios-people-sharp' : 'ios-people-outline';
          // } else if ( route.name === "Attendant") {
          //   iconName = focused
          //   ? 'qrcode-scan'
          //   : 'magnify-scan';
          //   return <MaterialCommunityIcons name={iconName} size={30} color={'#46A587'} />;
          // } else if (route.name === "Ledger") {
          //   iconName = focused ? 'book-sharp' : 'book-outline';
          } else if (route.name === "Account") {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={30} color={'#6777EF'} />;
        },
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        headerTitleAlign: 'center',
        tabBarStyle: {
          paddingTop:10,
          paddingBottom:10,
          // margin:20,
          position: 'absolute',
          bottom: 25,
          left: 20,
          right:20,
          elevation:60,
          borderRadius:25,
          height:80,
          color: '#ffffff'
          
        },
        headerTitleContainerStyle: ({}) => {
          height:20
        },
        // tabBarLabelStyle: {
        //   color: '#46A587',
        //   fontSize: 10,
        // }
        tabBarShowLabel:false
      })}
    >
      <Tabs.Screen name="Dashboard" component={MandorLevelDashboard} />
      {/* <Tabs.Screen name="Employee" component={LowLevelEmployee} options={{headerTitle: "Pegawai"}} /> */}
      {/* <Tabs.Screen name="Attendant" component={AttendantComp} options={{headerTitle: "Presensi"}} /> */}
      {/* <Tabs.Screen name="Ledger" component={LowLevelLedgerComp} options={{headerTitle: "Pembukuan"}} /> */}
      <Tabs.Screen name="Account" component={ProfileStack}  options={{headerShown:false}} />
    </Tabs.Navigator>
  );
}
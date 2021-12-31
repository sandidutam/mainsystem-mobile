import React, { useContext, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileScreen,EditProfileScreen } from "./ProfileScreen";


const Stack =  createStackNavigator();

export const ProfileStack = () => {
  return (  
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{headerTitleAlign:'center'}}/>
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{headerTitle:'Edit Profile'}}/>
    </Stack.Navigator>
  )
}

import React, { useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./AuthProvider";
import { Button, Text, View, TextInput } from "react-native";
import * as Device from 'expo-device';
import Color from './Color';
import { MainButton } from './Button';
import { Inputcustom } from './Input';
import { color } from "react-native-elements/dist/helpers";
import { AntDesign } from '@expo/vector-icons'; 

const Stack = createStackNavigator();

function LoginScreen({ navigation }) {
  const { login, error } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [device_name, setdevice_Name] = useState('');

//   const getDeviceName = () => {
//     var abc = Device.modelName;
//     setdevice_Name(abc);
// }

  useEffect(() => {
    var abc = Device.modelName;
    setdevice_Name(abc);
  })

 
  return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View>
                <Text
                        style={{  
                            // position: "absolute",
                            top: 30,
                            marginVertical: 80,
                            fontWeight: "bold",
                            fontSize: 30
                        }}
                >Main<Text style={{color: Color.primaryColor}}>2</Text>x</Text>
            </View>


            { error &&
                <Text style={{ color: 'red', marginBottom: 24 }}>{ error }</Text>
            }
            <TextInput
                style={{    
                            // width: 300, 
                            borderColor: Color.primaryColor, 
                            padding: 8, 
                            width: "80%",
                            height: 50,
                            borderRadius: 10,
                            marginVertical: 10,
                            borderWidth: 2
                        }}
                onChangeText={text => setEmail(text)}
                placeholder="Isi alamat email"
                textContentType="emailAddress"
                autoCapitalize = 'none'
            />
            <TextInput
                style={{    
                    // width: 300, 
                    borderColor: Color.primaryColor, 
                    padding: 8, 
                    width: "80%",
                    height: 50,
                    borderRadius: 10,
                    marginVertical: 10,
                    borderWidth: 2
                }}
                onChangeText={text => setPassword(text)}
                placeholder="Isi Password"
                secureTextEntry={true}
            />


            <MainButton   title="Login" color={Color.primaryColor}
                            clicked={() => {
                            // alert('Hello')
                            login(email, password, device_name)
                            }}
            />
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} >
                <Text>Made with</Text> 
                <AntDesign name="heart" size={18} color={Color.dangerColor} style={{marginLeft:6}}/>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} >

                <Text>by Siris <AntDesign name="copyright" size={12} color="black" />2021</Text> 
            </View>
        
        </View>
  );
}

function RegisterScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Register Screen</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
      {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
    </View>
  );
}

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}

import React, { useContext, useState, useEffect } from "react";
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

export const ProfileScreen = ({navigation}) => {
    const { user, logout } = useContext(AuthContext)
    var urlfoto = (user.foto_user)

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
          <ScrollView
              style={styles.container}
              // contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
              showsVerticalScrollIndicator={false}
          >
            
              <View 
              style={{
                        flexDirection: 'column', 
                        alignItems: 'center'
                      }}
              >
                { (user.role) === "SuperAdmin" ? 
                    <View>
                      <Image  style={styles.userSuperImage} 
                              source={{ uri: "https://www.mainsystem.space/images/user/"+urlfoto}} />
                              
                      {/* <MaterialIcons  name="verified" size={40} color='white'
                                      style={{ 
                                                position: 'absolute', top: 8, left: 118,
                                                }}  /> 
                       */}
                      <MaterialIcons  name="verified" size={36} color={Color.successColor}  
                                      style={{ 
                                                position: 'absolute', top: 10, left: 120, 
                                                backgroundColor: 'white',
                                                borderRadius: 50,
                                                padding: 1,
                                                }}  /> 

                    </View>
                      
                  :  <Image   style={styles.userImage} 
                              source={{ uri: "https://www.mainsystem.space/images/user/"+urlfoto}} />
              }

                <Text   style={{  
                                  fontWeight: 'bold', fontSize: 28, marginTop: 20,
                                  // marginLeft: 20,
                                }}      
                > 
                  {user.firstname}                                
                </Text>
                <Text   style={{
                                  // marginLeft: 20,
                                  fontSize: 32, marginTop: -10,
                                  color: 'rgba(0, 0, 0, 0.5)'
                                }}>
                    {user.lastname} 
                </Text>
              </View>

              <View
                      style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                marginTop: 16,
                      }}
              >
                  <Text
                        style={{
                                  backgroundColor: Color.primaryColor,
                                  padding: 6,
                                  paddingHorizontal:12,
                                  borderRadius: 40,
                                  fontSize: 12,
                                  color: 'rgba(255,255,255, 1)'
                        }}
                  >{user.email}</Text>

                  <Text
                        style={{
                                  backgroundColor: Color.warningColor,
                                  padding: 6,
                                  paddingHorizontal:12,
                                  borderRadius: 40,
                                  fontSize: 12,
                                  color: 'rgba(255,255,255, 1)'
                        }}
                  >#{user.nopeg}</Text>
              </View>
              
              <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 40,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
              >
                <Text
                        style={{
                                  fontSize: 12,
                                  fontStyle: 'italic',
                                  position: 'absolute',
                                  left: 70, 
                        }}
                >
                    Role
                </Text>
                <Text
                        style={{
                                  fontSize: 18,
                                  fontWeight: 'bold',
                                  position: 'absolute',
                                  left: 140, 
                        }}
                >
                    {user.role} <MaterialIcons   name="verified" size={16} color={Color.successColor} />  
                </Text>
              </View>

              <View
                      style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginTop: 40,
                      }}
              >
                <Text
                        style={{
                                  fontSize: 12,
                                  fontStyle: 'italic',
                                  position: 'absolute',
                                  left: 70, 
                        }}
                >
                    Jabatan
                </Text>
                <Text
                        style={{
                                  fontSize: 18,
                                  fontWeight: 'bold',
                                  position: 'absolute',
                                  left: 140, 
                        }}
                >
                    {user.jabatan}
                </Text>
              </View>

              <View
                      style={{
                        marginTop: 30,
                      }}
              >
                <SecondaryButton    title="Edit Profile" color={Color.accentColor}
                                    icon={<AntDesign name="edit" size={16} color="white" />}
                              clicked={() => {
                                // alert('Coming Soon!')
                                navigation.navigate('EditProfile')
                          }} >
                              </SecondaryButton>

                <SecondaryButton    title="Logout" color={Color.primaryColor}
                                    icon={<AntDesign name="logout" size={16} color="white" />}
                              clicked={() => {
                              logout()
                          }} >
                              </SecondaryButton>
              </View>


              
          </ScrollView>
        </SafeAreaView>

      );
}

export const EditProfileScreen = () => {
    return (
        <View
                style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                }}
        >
            <MaterialIcons name="construction" size={40} color={Color.dangerColor} />
            <Text>Coming Soon!</Text>
        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 10,
    },
    userImage: {
      height: 150,
      width: 150,
      borderRadius: 75,
      // marginLeft:16
    },
    userSuperImage: {
      borderColor: Color.primaryColor,
      borderWidth: 4,
      height: 150,
      width: 150,
      borderRadius: 75,
      // marginLeft:16
    },
    userName: {
      fontSize: 20,
      // fontWeight: 'bold',
    }
})
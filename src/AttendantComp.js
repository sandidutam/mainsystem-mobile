import React, { useEffect, useState, useContext, createRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet, Button, TouchableOpacity, TextInput,Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
// import { ManualAttendant } from './ManualAttendant';
import Color from './Color';
import axios from 'axios';
import { AuthContext } from "./AuthProvider";
import { AuthProvider } from "./AuthProvider";
import { MainButton } from './Button';
import { AntDesign } from '@expo/vector-icons';
import ActionSheet from "@expo/react-native-action-sheet";


const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const actionSheetRef = createRef();

function ScanQrCode({navigation}) {

    const { getpresent, getupdate, datapegawai, pesan} = useContext(AuthContext);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned')
    const [formid, setFormid] = useState(null);
    const [ setPesan ] = useState(null);
    const [ namaLengkap, setNamaLengkap] = useState(null);
    const [ nomorPegawai, setNomorPegawai] = useState(null);
    const [ jabatan, setJabatan] = useState(null);
    const [ sektor, setSektor] = useState(null);
    const [ status, setStatus] = useState(null);

    let actionSheet;

    const askForCameraPermission = () => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })()
      }
    
    // Request Camera Permission
    useEffect(() => {
        askForCameraPermission();
        
      }, []);


     // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
      setFormid(data);
      setScanned(true);  
      datapegawai(data);
      // console.log('Type: ' + type + '\nData: ' + data);

      axios.post('/api/pegawai', {
        data
      })
      .then(response => {
        const getResponse = {
          nopeg : response.data.nomor_pegawai,
          namadepan: response.data.nama_depan,
          namabelakang: response.data.nama_belakang,
          namalengkap: response.data.nama_lengkap,
          jabatan : response.data.jabatan,
          sektor : response.data.sektor,
          status : response.data.status,
        }
        // console.log(getResponse);
        setNomorPegawai(getResponse.nopeg);
        setNamaLengkap(getResponse.namalengkap);
        setJabatan(getResponse.jabatan);
        setSektor(getResponse.sektor);
        setStatus(getResponse.status);
        setError(null);
      })
      .catch(error => {
        console.log(error.response);
      })
    };


    // Check permissions and return the screens
    if (hasPermission === null) {
        return (
        <View style={styles.container}>
            <Text>Requesting for camera permission</Text>
        </View>)
    }
    if (hasPermission === false) {
        return (
        <View style={styles.container}>
            <Text style={{ margin: 10 }}>No access to camera</Text>
            <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
        </View>)
    }

    // Return the View
    return (
        
        <View style={styles.container}>
            {/* { scanned ? <Text style={{position: 'absolute', top: 15, fontSize:15}}>Scan Berhasil</Text> :
                        <Text style={{position: 'absolute', top: 15, fontSize:15}}>Arahkan kamera ke QR Code</Text>
            } */}
          <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
            />

              <View style={styles.card}>
                <View
                        style={{
                                  flexDirection: 'row',
                                  marginTop: 20,
                                  alignItems: 'center',
                        }}
                >
                  <Text style={styles.subtext}>Nomor Pegawai : </Text>
                  <Text style={styles.maintext}>{nomorPegawai}12345678</Text>
                </View>
                <View
                        style={{
                                  flexDirection: 'row',
                                  marginTop: 10,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                        }}
                >
                  <Text style={styles.subtext}>Nama Lengkap : </Text>
                  <Text style={styles.maintext}>{namaLengkap} John Doe</Text>
                </View>
                <View
                        style={{
                                  flexDirection: 'row',
                                  marginTop: 10,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                        }}
                >
                  <Text style={styles.subtext}>Jabatan : </Text>
                  <Text style={styles.maintext}>{jabatan} Manager</Text>
                </View>
                <View
                        style={{
                                  flexDirection: 'row',
                                  marginTop: 10,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                        }}
                >
                  <Text style={styles.subtext}>Sektor : </Text>
                  <Text style={styles.maintext}>{sektor} 2</Text>
                </View>
                <View
                        style={{
                                  flexDirection: 'row',
                                  marginTop: 10,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                        }}
                >
                  <Text style={styles.subtext}>Status : </Text>
                  <Text style={styles.maintext}>{status} Belum Hadir</Text>
                </View>

                <TouchableOpacity style={{
                              alignSelf: 'center',
                              justifyContent:'center',
                              width: "60%",
                              height: 50,
                              borderColor: "blue",
                              borderRadius: 10,
                              marginVertical: 10,
                              borderWidth: 0,
                              backgroundColor: Color.dangerColor,
                              }}
                              onPress={() => {
                                  setScanned(false)
                                  // setPesan(null)
                                }
                              }
                              >
                              <Text style={{color: 'white', alignSelf:'center'}}>Scan Lagi?</Text>
                </TouchableOpacity> 
                <Text style={styles.maintext}>{namaLengkap} hari ini {status}</Text>
                <Text>Mau Pulang?</Text>

                <TouchableOpacity style={{
                              alignSelf: 'center',
                              justifyContent:'center',
                              width: "60%",
                              height: 50,
                              borderColor: "blue",
                              borderRadius: 10,
                              marginVertical: 10,
                              borderWidth: 0,
                              backgroundColor: Color.successColor,
                              }}
                              onPress={() => {
                                  getupdate(formid)
                                  // actionSheetRef.current?.setModalVisible()
                                  setScanned(false)
                                  // setPesan(null)
                                }
                              }
                              >
                              <Text style={{color: 'white', alignSelf:'center'}}>Pulang</Text>
                </TouchableOpacity> 

              </View>
            
            {/* <Button style={styles.scanBtn} title={'Scan again?'} onPress={() => setScanned(false)} /> */}
      
            { scanned && status === 'Sudah Hadir' ?
              <View style={styles.card}>
              
              <Text style={styles.maintext}>Nomor Pegawai : {nomorPegawai}</Text>
              <Text style={styles.maintext}>Nama Lengkap : {namaLengkap}</Text>
              <Text style={styles.maintext}>Jabatan : {jabatan}</Text>
              <Text style={styles.maintext}>Sektor : {sektor}</Text>
              <Text style={styles.maintext}>Status : {status}</Text>
              <TouchableOpacity style={{
                            alignSelf: 'center',
                            justifyContent:'center',
                            width: "60%",
                            height: 50,
                            borderColor: "blue",
                            borderRadius: 10,
                            marginVertical: 10,
                            borderWidth: 0,
                            backgroundColor: Color.dangerColor,
                            }}
                            onPress={() => {
                                setScanned(false)
                                // setPesan(null)
                               }
                            }
                            >
                            <Text style={{color: 'white', alignSelf:'center'}}>Scan Lagi?</Text>
              </TouchableOpacity> 
              <Text style={styles.maintext}>{namaLengkap} hari ini {status}</Text>
              <Text>Mau Pulang?</Text>

              <TouchableOpacity style={{
                            alignSelf: 'center',
                            justifyContent:'center',
                            width: "60%",
                            height: 50,
                            borderColor: "blue",
                            borderRadius: 10,
                            marginVertical: 10,
                            borderWidth: 0,
                            backgroundColor: Color.successColor,
                            }}
                            onPress={() => {
                                getupdate(formid)
                                // actionSheetRef.current?.setModalVisible()
                                setScanned(false)
                                // setPesan(null)
                              }
                            }
                            >
                            <Text style={{color: 'white', alignSelf:'center'}}>Pulang</Text>
              </TouchableOpacity> 

              </View>
            : scanned && status === 'Belum Hadir' ?

                      <View style={styles.card}>
                        {/* <Text style={styles.maintext}>{formid}</Text> */}
                        <Text style={styles.maintext}>Nomor Pegawai : {nomorPegawai}</Text>
                        <Text style={styles.maintext}>Nama Lengkap : {namaLengkap}</Text>
                        <Text style={styles.maintext}>Jabatan : {jabatan}</Text>
                        <Text style={styles.maintext}>Sektor : {sektor}</Text>
                        <Text style={styles.maintext}>Status : {status}</Text>
                        <TouchableOpacity style={{
                            alignSelf: 'center',
                            justifyContent:'center',
                            width: "60%",
                            height: 50,
                            borderColor: "blue",
                            borderRadius: 10,
                            marginVertical: 10,
                            borderWidth: 0,
                            backgroundColor: Color.dangerColor,
                            color: 'red'
                            }}
                            onPress={() => {
                                setScanned(false)
                                // setPesan(null)
                               }
                            }
                            >
                            <Text style={{color: 'white', alignSelf:'center'}}>Scan Lagi?</Text>
                        </TouchableOpacity> 
                          
                        <TouchableOpacity style={{
                            alignSelf: 'center',
                            justifyContent:'center',
                            width: "60%",
                            height: 50,
                            borderColor: "blue",
                            borderRadius: 10,
                            marginVertical: 10,
                            borderWidth: 0,
                            backgroundColor: Color.successColor,
                            color: 'red'
                            }}
                            onPress={() => {
                                getpresent(formid)
                                // actionSheetRef.current?.setModalVisible()
                                setScanned(false)
                                // setPesan(null)
                              }
                            }
                            >
                            <Text style={{color: 'white', alignSelf:'center'}}>Presensi</Text>
                        </TouchableOpacity> 
                      </View>

            : scanned && status === 'Sudah Pulang' ? 
                      <View style={styles.card}>
                        <Text style={styles.maintext}>Nomor Pegawai : {nomorPegawai}</Text>
                        <Text style={styles.maintext}>Nama Lengkap : {namaLengkap}</Text>
                        <Text style={styles.maintext}>Jabatan : {jabatan}</Text>
                        <Text style={styles.maintext}>Sektor : {sektor}</Text>
                        <Text style={styles.maintext}>Status : {status}</Text>

                        <Text style={styles.maintext}>{namaLengkap} hari ini {status}</Text>
                        <TouchableOpacity style={{
                            alignSelf: 'center',
                            justifyContent:'center',
                            width: "60%",
                            height: 50,
                            borderColor: "blue",
                            borderRadius: 10,
                            marginVertical: 10,
                            borderWidth: 0,
                            backgroundColor: Color.dangerColor,
                            color: 'red'
                            }}
                            onPress={() => {
                                setScanned(false)
                                // setPesan(null)
                              }
                            }
                            >
                            <Text style={{color: 'white', alignSelf:'center'}}>Scan Lagi?</Text>
                        </TouchableOpacity> 
                          
                      </View>

            : <View style={styles.textbar}>
              <Text style={styles.whitetext}><AntDesign name="camera" size={18} color="white" /> Arahkan ke QR Code</Text>
              </View>
            } 
            
          </View>
            
        </View>
    );
}

function History() {
    return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>GetIn</Text>
            
        </View>
    );
}

export const AttendantComp = ({}) => {
    return (

    <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Scan" component={ScanQrCode} options={{tabBarLabel:'Scan'}} />
        {/* <TopTab.Screen name="Manual" component={ManualAttendant} options={{tabBarLabel:'Manual'}} /> */}
        <Stack.Screen name="History" component={History} options={{tabBarLabel:'Riwayat'}} />
    </Stack.Navigator>
    


    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    scanBtn: {
        height: 50,
        width: '50%',
        color: Color.accentColor,

    },
    subtext: {
        fontSize: 12,
        fontStyle: 'italic',
        color: Color.accentColor,
        marginRight: 20,
    },
    maintext: {
        // position: 'absolute',
        // bottom: '60%',
        // margin: 20,
        fontWeight: 'bold',
        fontSize: 14,
        color: Color.primaryColor,
    },
    whitetext: {
        fontSize: 14,
        color: Color.white,
    },
    textbar: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: Color.primaryColor,
        backgroundColor: 'rgba(103, 119, 239, 0.4)',
        opacity:50,
        height: 50,
        width: 250,
        borderRadius: 50,
    },
    barcodebox: {
        position: 'absolute',
        bottom: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 500,
        width: '100%',
        // borderRadius: 50,
        // marginBottom:30
        overflow: 'hidden',
        
    },
    card: {
      borderRadius: 20,
      backgroundColor: 'white',
      alignItems: 'center',
      // justifyContent: 'center',
      height: '90%',
      width: '90%',
    },
    cameraContainer: {
      marginHorizontal: 0, marginLeft: 0, marginStart: 0,
      paddingHorizontal: 0, paddingLeft: 0, paddingStart: 0,
      height: '115%',
      padding: 0
  }

  })
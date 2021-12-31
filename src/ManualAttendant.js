import React, { useEffect, useState, useContext, createRef} from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./AuthProvider";
import ActionSheet from "@expo/react-native-action-sheet";
import { MainButton } from './Button';
import Color from './Color';
import Inputcustom from './Input';

const Stack = createStackNavigator();
const actionSheetRef = createRef();


export const ManualAttendant = () => {

    const { user, pegawai, setPegawai, login, getlast, getpresent, delpresent, logout} = useContext(AuthContext);
    const [ pegawai_id, setPegawai_ID] = useState('');
    const [ formid, setFormid] = useState(null);
    const [ nama_lengkap, setNamaLengkap ] = useState('');
    const [pesan, setPesan ] = useState(null);


    let actionSheet;

    return (
      <View style={styles.container} >
        <View style={{
                      top : 20,
                      justifyContent: 'center',
                      alignItems: 'center'
                      }}
                      >
          <Inputcustom 
          name="Enter ID" icon="key"
          onChangeText = {text => setFormid(text)}
          />

          <MainButton   title="Submit" color={Color.accentColor}
                        clicked={() => {
                          getpresent(formid)
                          actionSheetRef.current?.setModalVisible()
                          console.log(formid)
                        }}
          />
        

        </View>

        {/* Bottom Sheet */}

        <View>
          <ActionSheet ref={actionSheetRef}>
            <View style={styles.sheetcontainer}>
              {pegawai ?  <View>
                            <Text>Data Pegawai</Text>
                            <Text>Nama : {pegawai.name}</Text>
                            <Text>Nomor Pegawai : {pegawai.nopeg}</Text>
                            
                            <TextInput
                              style={{ height: 40, width: 300, padding: 8, color: 'tomato'}}
                              onChangeText={text => setNamaLengkap(text)}
                              placeholder="Nama"
                              value= {pegawai.name}
                              editable= {false}
                            />
                            <MainButton   title="Close" color={Color.primaryColor}
                                  clicked={() => {
                                    checkout(id, nama_lengkap)
                                    setPesan(null)
                                    // setId('')
                                  }}
                            />
                          </View> 
              : 
              <Text>Tes</Text>
              
              }
              
              <MainButton   title="Close" color={Color.primaryColor}
                    clicked={() => {
                      actionSheetRef.current?.setModalVisible(false)
                      // delpresent()
                      // setPegawai(null)
                    }}
              />
            </View>
          </ActionSheet>
        </View>

      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  sheetcontainer: {
    height:500,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40
  },
});
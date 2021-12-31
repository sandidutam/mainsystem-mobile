import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import * as Device from 'expo-device';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';

// axios.defaults.baseURL = 'http://192.168.100.109:8000';
axios.defaults.baseURL = 'https://mainsystem.space';


export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [pegawai, setPegawai] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('Not yet');
  const [pesan, setPesan ] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        pesan,
        pegawai,
        user,
        setUser,
        setPesan,
        setPegawai,
        error,
        getpresent: (formid) => {
          axios.post('/api/presensi/getpresent', {
            formid
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
              // data: response.data,
            }
            setPegawai(getResponse);
            
            var setStatus = (getResponse.status);
            var setStatus2 = JSON.stringify(getResponse.status);
            var statuscheck = 'Belum Hadir';
            var statuschecked = 'Sudah Hadir';

            if ( setStatus === statuscheck) {

              setPesan(statuscheck);
              
            } else {
              setPesan(statuschecked);
            }

            // setPegawai(getResponse);
            setError(null);
          })
          .catch(error => {
            console.log(error.response);
          })
        },
        getupdate: (formid) => {
          axios.post('/api/presensi/getupdate', {
            formid
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
              // data: response.data,
            }
            setPegawai(getResponse);
            
            var setStatus = (getResponse.status);
            var setStatus2 = JSON.stringify(getResponse.status);
            var pulangcheck = 'Sudah Hadir';
            var pulangchecked = 'Sudah Pulang';
            // console.log(setStatus);

            if ( setStatus === pulangcheck) {

              setPesan(pulangcheck);
              
            } else {
              setPesan(pulangchecked);
            }
            setError(null);
          })
          .catch(error => {
            console.log(error.response);
          })
        },
        datapegawai: (data) => {
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
            setPegawai(getResponse);
            setError(null);
          })
          .catch(error => {
            console.log(error.response);
          })
        },
        login: (email, password, device_name) => {
          axios.post('/api/sanctum/token', {
            email,
            password,
            device_name,
          })
          .then(response => {
            const userResponse = {
              email: response.data.user.email,
              token: response.data.token,
              role: response.data.user.role,
              nopeg: response.data.nopeg,
              firstname: response.data.firstname,
              lastname: response.data.lastname,
              birthdate: response.data.birthdate,
              jabatan: response.data.jabatan,
              foto_user: response.data.foto_user,
              no_hp: response.data.no_hp,
            }
            setUser(userResponse);
            // console.log(userResponse);
            setError(null);
            SecureStore.setItemAsync('user', JSON.stringify(userResponse));
          })
          .catch(error => {
            const key = Object.keys(error.response.data.errors)[0];
            setError(error.response.data.errors[key][0]);
            // setError(response.data);c
          })
        },
        logout: () => {
          // setUser(null);
          axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

          axios.post('/api/logout')
          .then(response => {
            setUser(null);
            SecureStore.deleteItemAsync('user')
          })
          .catch(error => {
            console.log(error.response);
          })
        }
      }}>
      {children}
    </AuthContext.Provider>
  );
}
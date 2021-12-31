import React, { Children } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign, EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export const MainButton = (props) => {
    return (
      <TouchableOpacity
        
        onPress={props.clicked}
        style={[styles.container, { backgroundColor: props.color }]}
      >
        <Text style={styles.submitText}>{props.title}</Text>
      </TouchableOpacity>
    );
  };
  
export const SecondaryButton = (props) => {
    return (
      <TouchableOpacity
        
        onPress={props.clicked}
        style={[styles.container2, { backgroundColor: props.color }]}
      >
        <Text style={styles.submitText2}>{props.icon}  {props.title}</Text>
      </TouchableOpacity>
    );
  };
  
  
const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignSelf: "center",
    width: "60%",
    height: 50,
    borderRadius: 50,
    marginVertical: 10,
    borderWidth: 0,
  },
  submitText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
  },
  container2: {
    justifyContent:'center',
    alignSelf: "center",
    width: "60%",
    height: 50,
    borderRadius: 14,
    marginVertical: 10,
    borderWidth: 0,
  },
  submitText2: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
  },
});
  
// export default Submit;
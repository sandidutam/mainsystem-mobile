import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { Input } from "react-native-elements";
import Color from "./Color";

class Inputcustom extends Component {
  state = { isFocused: false };

  onFocusChange = () => {
    this.setState({ isFocused: true });
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          { borderColor: this.state.isFocused ? "#46A587" : "grey" },
        ]}
      >
        <Input
          onChangeText={this.props.onChangeText}
          placeholder={this.props.name}
          onFocus={this.onFocusChange}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          secureTextEntry={this.props.pass}
          leftIcon={
            <Icon
              name={this.props.icon}
              size={22}
              color={this.state.isFocused ? "#46A587" : "black"}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "70%",
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 2,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  inputText: {
    color: "#0779e4",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default Inputcustom;
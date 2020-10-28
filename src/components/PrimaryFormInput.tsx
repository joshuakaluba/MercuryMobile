import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Colors } from "../constants";

export default function PrimaryFormInput(props: any) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        // @ts-ignore
        label={props.label}
        editable={props.editable}
        value={props.value}
        placeholder={props.placeholder ? props.placeholder : ""}
        placeholderTextColor={Colors.constants.lightGrey}
        onChangeText={props.onChangeText}
        keyboardType={props.numeric ? 'numeric' : 'default'}
        secureTextEntry={props.secureTextEntry ? props.secureTextEntry : false}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    width: "100%",
    height: 45,
    backgroundColor: Colors.constants.bodyBackgroundColor,
    textAlign: "center",
    fontSize: 15,
    marginTop: 5,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: Colors.constants.lightGrey,
    color: Colors.constants.darkGrey,
    fontWeight: "700"
  }
});

import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Colors } from "../constants";
import useColorScheme from '../hooks/useColorScheme';

export default function PrimaryFormInput(props: any) {

    const colorScheme = useColorScheme();

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.textInput,
                {
                    backgroundColor: Colors[colorScheme].bodyBackgroundColor,
                    color: Colors[colorScheme].textInputColor
                }]}
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
        textAlign: "center",
        fontSize: 15,
        marginTop: 5,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: Colors.constants.lightGrey,
        fontWeight: "700"
    }
});

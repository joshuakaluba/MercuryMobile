import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Colors } from "../constants";
import useColorScheme from '../hooks/useColorScheme';

const PrimaryFormInput = (props: any) => {

    const colorScheme = useColorScheme();

    const fixedWidth = !!props.fixedWidth ? {
        width: '100%'
    } : {};

    return (
        <View style={[styles.container, fixedWidth]}>
            <TextInput
                style={[styles.textInput,
                {
                    backgroundColor: Colors[colorScheme].textInputBackgroundColor,
                    color: Colors[colorScheme].textInputColor
                }]}
                // @ts-ignore
                label={props.label}
                editable={props.editable}
                value={props.value}
                placeholder={props.placeholder ? props.placeholder : ""}
                placeholderTextColor={Colors.constants.lightGrey}
                onChangeText={props.onChangeText}
                keyboardType={props.numeric ? 'number-pad' : 'default'}
                min={0}
                secureTextEntry={props.secureTextEntry ? props.secureTextEntry : false}
            ></TextInput>
        </View>
    );
};

export default PrimaryFormInput;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
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

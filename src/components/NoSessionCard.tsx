import React from "react";
import { StyleSheet, View, TextInput, Text as NativeText } from "react-native";
import { Container, Tab, Tabs, Text, Button, TabHeading } from 'native-base';
import { Colors } from "../constants";

//@ts-ignore
export default function NoSessionCard(props: any ) {

    function _addJoinLocation() {
        props.onAddJoinClick();
    }

    return (
        <View style={styles.container}>
            <NativeText style={styles.noSessionText}>You currently have no locations available. Please add or join a location to proceed</NativeText>

            <Button onPress={_addJoinLocation}
                style={styles.addJoinButton}>
                <Text style={{ fontWeight: 'bold' }}>Add/Join Location</Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: '50%',
        alignItems: "center",
        justifyContent: "center",
        margin: 15,
        backgroundColor: Colors.constants.white,
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 50,
        paddingBottom: 50,
        borderColor: Colors.constants.lightGrey,
        borderWidth: 2,
        borderRadius: 12
    },
    noSessionText: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },
    addJoinButton: {
        marginTop: 15,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

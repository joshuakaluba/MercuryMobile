import React from "react";
import { StyleSheet, } from "react-native";
import { Colors } from "../constants";
import PrimaryButton from './PrimaryButton';
import { View, Text } from './Themed';

//@ts-ignore
const NoSessionCard = (props: any) => {

    const _addJoinLocation = () => props.onAddJoinClick();

    return (
        <View style={styles.container}>
            <Text style={styles.noSessionText}>
                You currently have no locations available. Please add or join a location to proceed
            </Text>

            <PrimaryButton
                title={'Add/Join Location'}
                onPress={_addJoinLocation}
                loading={props.loading} />
        </View>
    );
}

export default NoSessionCard;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        margin: 15,
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 75,
        paddingBottom: 75,
        borderColor: Colors.constants.lightGrey,
        borderWidth: 2,
        borderRadius: 12
    },
    noSessionText: {
        fontWeight: 'bold',
        paddingBottom: 30,
        fontSize: 18,
        textAlign: 'center'
    }
});

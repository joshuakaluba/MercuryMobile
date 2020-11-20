import React from "react";
import { Modal, StyleSheet, View, Alert } from "react-native";
import { Icon } from 'react-native-elements';
import useColorScheme from '../hooks/useColorScheme';
import { Text } from '../components/Themed';
import { Colors } from "../constants";
import { Session } from './../models';
import PrimaryFormInput from './PrimaryFormInput';

const EditSessionModal = (props: any) => {

    const colorScheme = useColorScheme();

    const _updateSessionAsync = () => {
        const session: Session = {
            id: props.sessionId,
            name: props.sessionName,
            capacity: props.capacity,
            currentCount: props.currentCount
        };

        props.onUpdateSession(session);
    }

    const _showDeleteAlert = () => {
        Alert.alert(
            "Leave location",
            "Are you sure you want to leave this location?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => props.onLeaveLocation() }
            ],
            { cancelable: false }
        );
    }

    const _showSaveAlert = () => {
        Alert.alert(
            "Save changes",
            "Are you sure you want to save these changes?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => _updateSessionAsync() }
            ],
            { cancelable: false }
        );
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            onRequestClose={props.onDismiss}>
            <View style={[styles.centeredView,{backgroundColor: Colors[colorScheme].bodyBackgroundColor}]}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Update location</Text>

                    <PrimaryFormInput
                        editable={!props.loading}
                        onChangeText={(value: React.SetStateAction<string>) => { props.setName(value); }}
                        value={props.sessionName}
                        fixedWidth
                        placeholder={'Name'} />

                    <Text style={styles.text}>Current Capacity</Text>

                    <PrimaryFormInput
                        editable={!props.loading}
                        fixedWidth
                        numeric
                        value={`${props.currentCount}`}
                        onChangeText={(value: React.SetStateAction<number>) => {
                            // @ts-ignore
                            props.setCurrentCount(parseInt(value) || 0);
                        }}
                        placeholder={'Capacity'} />

                    <Text style={styles.text}>Total Capacity</Text>

                    <PrimaryFormInput
                        editable={!props.loading}
                        fixedWidth
                        numeric
                        value={`${props.capacity}`}
                        onChangeText={(value: React.SetStateAction<number>) => {
                            // @ts-ignore
                            props.setCapacity(parseInt(value) || 0);
                        }}
                        placeholder={'Capacity'} />

                    <View style={styles.iconContainer}>
                        <Icon
                            reverse
                            onPress={_showSaveAlert}
                            name='save'
                            size={30}
                            type='ionicons'
                            color={Colors.constants.darkGrey} />

                        <Icon
                            reverse
                            onPress={props.onDismiss}
                            name='closecircle'
                            size={30}
                            type='antdesign'
                            color={Colors.constants.blue} />

                        <Icon
                            reverse
                            onPress={_showDeleteAlert}
                            name='delete'
                            size={30}
                            type='antdesign'
                            color={Colors.constants.danger} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default EditSessionModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        width: '100%',
        marginTop: 0,
        padding: 20
    },
    modalView: {
        marginTop: 50,
        alignItems: "center"
    },
    modalTitle: {
        margin: 15,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: "center"
    },
    text: {
        margin: 15,
        textAlign: "center"
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15
    }
});

import React from "react";
import { View, Text, StyleSheet, Share } from "react-native";
import SvgQRCode from 'react-native-qrcode-svg';
import { Modal } from 'react-native-paper';
import { Colors } from '../constants';
import { Icon } from 'react-native-elements';
import { Lib } from "../utilities";

const ShareSessionModal = (props: any) => {

    const _onShare = async () => {
        try {
            const result = await Share.share({
                message: `Join my Mercury Smart Occupancy tracking session with code: ${props.shortSessionCode.toUpperCase()} \n\n\n`,
                url: 'https://apps.apple.com/ca/app/mercury-occupancy-tracker/id1535347240'
            });

            if (result.action === Share.sharedAction) {
               _onShareEnd();
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const _onShareEnd = () => {
        props.onDismiss();

        const title = 'Shared successfully';
        const message = 'The join code has been shared successfully';

        Lib.showSuccessMessageToast(title,message);
    }

    return (
        <Modal onDismiss={props.onDismiss} visible={props.visible}>
            <View style={styles.modal}>

                <Text style={styles.modalHeading}>
                    Scan the following QR Code to share this session.
                </Text>

                <SvgQRCode value={props.qrCode} size={130} />

                <Text style={styles.modalHeading}>
                    or enter the following code:
                </Text>

                <Text style={styles.sessionCode}>
                    {props.shortSessionCode.toUpperCase()}
                </Text>

                <View style={styles.iconContainer}>
                    <Icon
                        reverse
                        onPress={props.onCopyToClipboardClick}
                        name='copy'
                        size={26}
                        type='feather'
                        color={Colors.constants.darkGrey} />

                    <Icon
                        reverse
                        onPress={_onShare}
                        name='share'
                        size={26}
                        type='feather'
                        color={Colors.constants.blue} />
                </View>

            </View>
        </Modal>
    );
}

export default ShareSessionModal;

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    modalHeading: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    sessionCode: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
    },
    copyToClipboardButton: {
        marginTop: 5,
        marginBottom: 15,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15
    }
});

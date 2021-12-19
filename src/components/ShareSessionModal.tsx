import React from "react";
import { Text, StyleSheet, Share } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import SvgQRCode from 'react-native-qrcode-svg';
import { Lib } from "../utilities";
import PrimaryButton from './PrimaryButton';

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

        Lib.showSuccessMessageToast(title, message);
    }

    return (
        <Portal>
            <Dialog
                visible={props.visible}
                style={styles.dialogBody}
                onDismiss={props.onDismiss}>

                <Dialog.Content style={{ alignItems: 'center', justifyContent: 'center', }}>

                    <Text style={styles.modalHeading}>
                        Scan the following QR Code to share this session.
                    </Text>

                    <SvgQRCode value={props.qrCode} size={130} />

                    <Text style={styles.modalHeading}>
                        or enter the following code:
                    </Text>

                    <Text style={styles.shoppingListCode} selectable={true}>
                        {props.shortSessionCode.toUpperCase()}
                    </Text>

                </Dialog.Content>
                <Dialog.Actions style={styles.dialogActions}>
                    <PrimaryButton
                        title={`Share`}
                        alternativeColors
                        icon={'share'}
                        onPress={_onShare} />

                </Dialog.Actions>
                <Dialog.Actions style={styles.dialogActions}>
                    <PrimaryButton
                        title={`Copy to clipboard`}
                        icon={`copy`}
                        onPress={props.onCopyToClipboardClick} />
                </Dialog.Actions>
            </Dialog>
        </Portal>
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
    shoppingListCode: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
    },
    dialogBody: {
        paddingBottom: 10,
        backgroundColor: 'white'
    },
    dialogActions: {
        justifyContent: "center",
        alignItems: "center"
    }
});


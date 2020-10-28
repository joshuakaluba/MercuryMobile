import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { View, Text } from '../components/Themed';
import { Colors, Config } from '../constants';
import { Icon } from 'react-native-elements';
import { SessionsService } from '../services';
import { Session } from '../models';

// @ts-ignore
export default function CameraScreen({ navigation }) {

    const sessionsService: SessionsService = new SessionsService();

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    let scanned = false;

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();

            // @ts-ignore
            setHasPermission(status === 'granted');
        })();
    }, []);

    async function _onBarCodeScanned(result: BarCodeScannerResult) {
        try {
            if (result.data.includes(Config.downloadUrl) && scanned === false) {
                scanned = true;
                const sessionCode = result.data.replace(Config.downloadUrl, '');

                const session: Session = await sessionsService.joinSession(sessionCode);

                navigation.replace('SessionScreen', session);
                return;
            }
        } catch (error) {
            console.log(error);
            // do nothing
        }
    }

    let textOutput: string = 'Scan QR Code to join location.';

    if (hasPermission === null || hasPermission === false) {
        textOutput = 'Unable to access camera due to permissions.';
    }

    return (
        <View style={{ flex: 1, padding: 15 }}>
            {
                hasPermission === true &&
                <Camera
                    style={styles.row}
                    onBarCodeScanned={_onBarCodeScanned}
                    type={type} barCodeScannerSettings={{
                        barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                    }} />
            }
            {
                (hasPermission === false || hasPermission === null) &&
                <View style={[styles.row, { backgroundColor: Colors.constants.lightGrey }]}>
                    <Icon
                        name='camera-off'
                        size={65}
                        type='feather'
                        color={Colors.constants.darkGrey} />

                </View>
            }
            <View style={styles.row}>
                <Text style={styles.outputText}> {textOutput}</Text>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    row: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    outputText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20
    }
});
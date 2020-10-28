import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View as NativeView, Text as NativeText, Clipboard } from 'react-native';
import { Button, Text as NativeBaseText } from 'native-base';
import { Icon } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import SvgQRCode from 'react-native-qrcode-svg';
import { SessionsService } from '../services';
import { Session, SessionOperation } from '../models';
import { SessionOperationEnum } from '../enums';
import { Modal } from 'react-native-paper';
import { View, Text } from '../components/Themed';
import { Colors, Config } from '../constants';
import useColorScheme from '../hooks/useColorScheme';

// @ts-ignore
export default function SessionScreen({ route, navigation }) {

    const params = route.params;
    const sessionService: SessionsService = new SessionsService();

    const [loading, setLoading] = useState(false);
    const [capacity, setCapacity] = useState(0);
    const [currentCount, setCurrentCount] = useState(0);
    const [shortSessionCode, setShortSessionCode] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [fill, setFill] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const colorScheme = useColorScheme();

    const hideModal = () => setModalVisible(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <NativeView style={{ display: 'flex', flexDirection: 'row', marginRight: 5 }}>
                    <Icon
                        onPress={() => {
                            setModalVisible(true);
                        }}
                        name='share'
                        size={26}
                        type='feather'
                        color={Colors[colorScheme].tabHeaderIconColor} />
                </NativeView>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        const init = async () => {
            await _getSessionAsync();
        };
        init();
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            console.log('Updating');
            await _getSessionAsync();
        }, 3000);
        return () => {
            console.log('Clearing Interval')
            clearInterval(interval);
        };
    }, []);

    async function _getSessionAsync() {
        const session: Session = await sessionService.getSession(params.id);
        _updateSession(session);
    }

    async function _updateSessionCount(operation: SessionOperationEnum): Promise<void> {
        const sessionOperation: SessionOperation = {
            sessionId: params.id,
            sessionOperation: operation
        };

        const session: Session = await sessionService.updateSessionCount(sessionOperation);
        _updateSession(session);
    }

    function _updateSession(session: Session): void {
        const sessionName = session.name || '';
        const sessionCode = session.shortSessionCode || '';
        const sessionCurrentCount = session.currentCount || 0;

        let sessionCapacity = session.capacity || 0;

        setCapacity(sessionCapacity);
        setCurrentCount(sessionCurrentCount);
        setShortSessionCode(sessionCode);
        setQrCode(`${Config.downloadUrl}${sessionCode}`)

        // prevent divide by 0
        sessionCapacity = sessionCapacity === 0 ? 1 : sessionCapacity;

        const calculatedFill = Math.round((sessionCurrentCount / sessionCapacity) * 100);
        setFill(calculatedFill);

        navigation.setOptions({
            title: sessionName
        });
    }

    function _copyToClipboard(): void {
        setModalVisible(false);
        Clipboard.setString(shortSessionCode);
    }

    return (
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <AnimatedCircularProgress
                size={300}
                width={40}
                backgroundWidth={30}
                fill={fill}
                tintColor={fill > 90 ? Colors.constants.danger : "#00e0ff"}
                style={{ marginBottom: 15 }}
                backgroundColor={Colors.constants.darkGrey}>
                {fill => <Text style={{ fontFamily: 'CounterFont', fontSize: 40 }}>{`${currentCount}/${capacity}`}</Text>}
            </AnimatedCircularProgress>
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 30, paddingTop: 40 }}>
                <Icon
                    reverse
                    onPress={async () => { await _updateSessionCount(SessionOperationEnum.DECREMENT) }}
                    disabled={loading}
                    name='minus'
                    size={40}
                    type='feather'
                    color={Colors.constants.darkGrey} />
                <Icon
                    reverse
                    disabled={loading}
                    onPress={async () => { await _updateSessionCount(SessionOperationEnum.INCREMENT) }}
                    name='plus'
                    size={40}
                    type='feather'
                    color={Colors.constants.danger} />
            </View>

            <Modal onDismiss={hideModal} visible={modalVisible}>
                <NativeView style={styles.modal}>

                    <NativeText style={styles.modalHeading}>
                        Scan the following QR Code to share this session.
                            </NativeText>

                    <SvgQRCode value={qrCode} size={130} />

                    <NativeText style={styles.modalHeading}>or enter the following code:</NativeText>

                    <NativeText style={styles.sessionCode}>
                        {shortSessionCode.toUpperCase()}
                    </NativeText>

                    <Button onPress={_copyToClipboard}
                        style={styles.copyToClipboardButton}
                        disabled={loading || capacity < 1}>
                        <NativeBaseText style={{ fontWeight: 'bold' }}>COPY TO CLIPBOARD</NativeBaseText>
                    </Button>
                </NativeView>
            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
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
        fontSize: 28,
        textAlign: 'center',
    },
    copyToClipboardButton: {
        marginTop: 5,
        marginBottom: 15,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
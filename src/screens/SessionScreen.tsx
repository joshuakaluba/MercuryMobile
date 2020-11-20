import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View as NativeView, Clipboard } from 'react-native';
import { Icon } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Lib } from './../utilities';
import { SessionsService } from '../services';
import { Session, SessionOperation } from '../models';
import { SessionOperationEnum } from '../enums';
import { View, Text } from '../components/Themed';
import { ShareSessionModal, EditSessionModal } from '../components';
import { Colors, Config } from '../constants';
import useColorScheme from '../hooks/useColorScheme';

// @ts-ignore
const SessionScreen = ({ route, navigation }) => {

    const params = route.params;
    const sessionService: SessionsService = new SessionsService();
    const colorScheme = useColorScheme();

    let updating = false;

    const [loading] = useState(false);

    const [capacity, setCapacity] = useState(0);
    const [currentCount, setCurrentCount] = useState(0);
    const [sessionId, setSessionId] = useState('');

    const [newCapacity, setNewCapacity] = useState(0);
    const [newCurrentCount, setNewCurrentCount] = useState(0);
    const [newSessionName, setNewSessionName] = useState('');

    const [shortSessionCode, setShortSessionCode] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [fill, setFill] = useState(0);
    const [showShareModalVisible, setShowShareModalVisible] = useState(false);
    const [showUpdateSessionModalVisible, setShowUpdateSessionModalVisible] = useState(false);

    const _hideShowShareModalVisible = () => setShowShareModalVisible(false);

    const _setNewCapacity = (capacity: number) => setNewCapacity(capacity);
    const _setNewCurrentCount = (capacity: number) => setNewCurrentCount(capacity);
    const _setNewSessionName = (name: string) => setNewSessionName(name);

    const _hideShowUpdateSessionModalVisible = () => {
        updating = false;
        setShowUpdateSessionModalVisible(false);
    }

    const _showEditSessionModal = () => {
        updating = true;
        setShowUpdateSessionModalVisible(true);
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <NativeView style={{ display: 'flex', flexDirection: 'row', marginRight: 5 }}>
                    <Icon
                        onPress={() => {
                            setShowShareModalVisible(true);
                        }}
                        name='share'
                        size={26}
                        type='feather'
                        color={Colors[colorScheme].tabHeaderIconColor} />

                    <Icon
                        onPress={_showEditSessionModal}
                        name='edit'
                        style={{ marginLeft: 15, marginRight: 10 }}
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
            await _getSessionAsync();
        }, 3000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const _getSessionAsync = async () => {
        try {
            const session: Session = await sessionService.getSession(params.id);
            _updateSession(session);
        } catch (error) {
            Lib.showError(error);
        }
    };

    const _onLeaveLocation = async () => {
        try {
            _hideShowUpdateSessionModalVisible();

            await sessionService.leaveSession(sessionId);
            navigation.goBack();
        } catch (error) {
            Lib.showError(error);
        }
    }

    const _updateSessionCountAsync = async (operation: SessionOperationEnum): Promise<void> => {
        try {
            const sessionOperation: SessionOperation = {
                sessionId: params.id,
                sessionOperation: operation
            };

            const session: Session = await sessionService.updateSessionCount(sessionOperation);

            _updateSession(session);
        } catch (error) {
            Lib.showError(error);
        }
    }

    const _updateSession = (session: Session): void => {
        const id = session.id || '';
        const name = session.name || '';
        const sessionCode = session.shortSessionCode || '';
        const sessionCurrentCount = session.currentCount || 0;

        let sessionCapacity = session.capacity || 0;

        setSessionId(id);
        setCapacity(sessionCapacity);
        setCurrentCount(sessionCurrentCount);

        if (updating === false) {
            setNewSessionName(name);
            setNewCapacity(sessionCapacity);
            setNewCurrentCount(sessionCurrentCount);
        }

        setShortSessionCode(sessionCode);
        setQrCode(`${Config.downloadUrl}${sessionCode}`);

        // prevent divide by 0
        sessionCapacity = sessionCapacity === 0 ? 1 : sessionCapacity;

        const calculatedFill = Math.round((sessionCurrentCount / sessionCapacity) * 100);
        setFill(calculatedFill);

        navigation.setOptions({ title: name });
    }

    const _copyToClipboard = (): void => {
        setShowShareModalVisible(false);
        Clipboard.setString(shortSessionCode);
        Lib.showSuccessMessageToast('Copied', 'Your join code has been copied to clipboard')
    }

    const _changeSessionInfoAsync = async (session: Session): Promise<void> => {
        try {
            const updatedSession: Session = await sessionService.updateSession(session);
            _updateSession(updatedSession);
            setShowUpdateSessionModalVisible(false);
            console.log(session);
        } catch (error) {
            Lib.showError(error);
        }
    }

    return (
        <View style={styles.container}>

            <AnimatedCircularProgress
                size={300}
                width={40}
                backgroundWidth={30}
                fill={fill}
                tintColor={fill > 90 ? Colors.constants.danger : '#00e0ff'}
                style={{ marginBottom: 15 }}
                backgroundColor={Colors.constants.darkGrey}>
                {() => <Text style={styles.progressText}>{`${currentCount}/${capacity}`}</Text>}
            </AnimatedCircularProgress>

            <View style={styles.iconContainer}>
                <Icon
                    reverse
                    onPress={async () => { await _updateSessionCountAsync(SessionOperationEnum.DECREMENT) }}
                    disabled={loading}
                    name='minus'
                    size={40}
                    type='feather'
                    color={Colors.constants.darkGrey} />
                <Icon
                    reverse
                    disabled={loading}
                    onPress={async () => { await _updateSessionCountAsync(SessionOperationEnum.INCREMENT) }}
                    name='plus'
                    size={40}
                    type='feather'
                    color={Colors.constants.danger} />
            </View>

            <ShareSessionModal
                visible={showShareModalVisible}
                loading={loading}
                capacity={capacity}
                qrCode={qrCode}
                shortSessionCode={shortSessionCode}
                onCopyToClipboardClick={_copyToClipboard}
                onDismiss={_hideShowShareModalVisible} />

            <EditSessionModal
                visible={showUpdateSessionModalVisible}
                loading={loading}
                sessionId={sessionId}
                capacity={newCapacity}
                sessionName={newSessionName}
                currentCount={newCurrentCount}
                setName={_setNewSessionName}
                setCapacity={_setNewCapacity}
                setCurrentCount={_setNewCurrentCount}
                onUpdateSession={_changeSessionInfoAsync}
                onLeaveLocation={_onLeaveLocation}
                onDismiss={() => { _hideShowUpdateSessionModalVisible() }} />

        </View>
    );
}

export default SessionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 30,
        paddingTop: 40
    },
    progressText: {
        fontSize: 40,
        fontWeight: 'bold'
    }
});



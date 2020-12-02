import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, RefreshControl, View as NativeView, AsyncStorage } from 'react-native';
import { Icon as ReactNativeElementsIcon } from 'react-native-elements';
import { Container } from 'native-base';
import { Colors } from '../constants';
import { LocationList, NoSessionCard } from '../components';
import { ScrollView } from '../components/Themed';
import { SessionsService } from '../services/SessionsService';
import { Session } from '../models';
import useColorScheme from '../hooks/useColorScheme';
import { StorageKeysEnum } from '../enums';
import Lib from './../utilities/Lib';

// @ts-ignore
const LocationsScreen = ({ route, navigation }) => {

    const sessionService: SessionsService = new SessionsService();

    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(false);
    const colorScheme = useColorScheme();

    function _onItemPress(item: any) {
        console.log(item);
        navigation.navigate('SessionScreen', item);
    }

    const _getSessionsAsync = async () => {
        try {
            setLoading(true);
            const sessions = await sessionService.getSessions();
            setSessions(sessions);

        } catch (error) {
            Lib.showError(error)
        }
        setLoading(false);
    }

    function _onAddJoinClick() {
        navigation.navigate('SessionCreationScreen')
    }

    useEffect(() => {
        const init = async () => {
            await _getSessionsAsync();
        };
        init();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            const sessionJson: string | null = await AsyncStorage.getItem(StorageKeysEnum.JOINED_SESSION_KEY);

            if (sessionJson !== null && sessionJson.length > 1) {
                await AsyncStorage.removeItem(StorageKeysEnum.JOINED_SESSION_KEY);
                const session: Session = JSON.parse(sessionJson || '');
                navigation.navigate('SessionScreen', session);
            }
            await _getSessionsAsync();
        });

        return unsubscribe;
    }, [navigation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <NativeView style={styles.headerIcon}>
                    <ReactNativeElementsIcon
                        onPress={() => {
                            navigation.navigate('SessionCreationScreen');
                        }}
                        name='plus'
                        size={26}
                        type='feather'
                        color={Colors[colorScheme].tabHeaderIconColor} />
                </NativeView>
            ),
        });
    }, [navigation]);

    const hasSessions = !!sessions && sessions.length > 0;

    return (
        <Container>
            <ScrollView
                //@ts-ignore
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={async () => {
                            await _getSessionsAsync();
                        }}
                    />
                }>
                {
                    !hasSessions &&
                    <NoSessionCard onAddJoinClick={_onAddJoinClick} />
                }
                {
                    !!hasSessions &&
                    <LocationList
                        onPress={_onItemPress.bind(this)}
                        sessions={sessions} />
                }
            </ScrollView>

        </Container>
    );
}

export default LocationsScreen;

const styles = StyleSheet.create({
    headerIcon: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: 5
    }
});

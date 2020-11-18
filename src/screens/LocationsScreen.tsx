import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, ScrollView, RefreshControl, View as NativeView, AsyncStorage } from 'react-native';
import { Icon as ReactNativeElementsIcon } from 'react-native-elements';
import { ListItem, Text, Left, Right, Icon } from 'native-base';
import { Container } from 'native-base';
import { Colors } from '../constants';
import { NoSessionCard } from '../components';
import { SessionsService } from '../services/SessionsService';
import { Session } from '../models';
import useColorScheme from '../hooks/useColorScheme';
import { StorageKeysEnum } from '../enums';

// @ts-ignore
export default function LocationsScreen({ route, navigation }) {

    const sessionService: SessionsService = new SessionsService();

    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);
    const colorScheme = useColorScheme();

    function _onItemPress(item: any) {
        console.log(item);
        navigation.navigate('SessionScreen', item);
    }

    async function _getSessionsAsync() {
        setLoading(true);
        const sessions = await sessionService.getSessions();
        setSessions(sessions);
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
                <NativeView style={{ display: 'flex', flexDirection: 'row', marginRight: 5 }}>
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
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={async () => {
                            await _getSessionsAsync();
                        }}
                    />
                }
            >
                {
                    hasSessions && sessions.map((session, i) => (
                        <ListItem key={i} onPress={() => { _onItemPress(session) }}>
                            <Left>
                                <Text>
                                    {
                                        //@ts-ignore
                                        session.name
                                    }
                                </Text>
                            </Left>
                            <Right>
                                <Icon name={'arrow-forward'} />
                            </Right>
                        </ListItem>
                    ))
                }
                {
                    !hasSessions && <NoSessionCard onAddJoinClick={_onAddJoinClick} />
                }

            </ScrollView>

        </Container>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

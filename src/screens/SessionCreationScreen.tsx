import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Tab, Tabs, Text, Button, TabHeading } from 'native-base';
import { View, Text as ThemedText } from '../components/Themed';
import { PrimaryFormInput } from '../components';
import { SessionsService } from '../services';
import { Session } from './../models';
import { Lib } from './../utilities';

// @ts-ignore
export default function SessionCreationScreen({ navigation }) {

    const sessionService: SessionsService = new SessionsService();

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [sessionCode, setSessionCode] = useState('');
    const [capacity, setCapacity] = useState(0);

    async function createSession(): Promise<void> {
        try {
            setLoading(true);
            const session: Session = { name, capacity };
            const result = await sessionService.createSession(session);            
            navigation.replace('SessionScreen', result);
            return;
        } catch (error) {
            Lib.showError(error);
        }

        setLoading(false);
    }

    async function joinSession(): Promise<void> {
        try {
            const session: Session = await sessionService.joinSession(sessionCode);
            navigation.replace('SessionScreen', session);
        } catch (e) {
            alert(e);
        }
    }

    return (
        <Container>
            <Tabs>
                <Tab heading={<TabHeading><Text>New Location</Text></TabHeading>}>
                    <View style={styles.view}>
                        <PrimaryFormInput
                            editable={!loading}
                            onChangeText={(value: React.SetStateAction<string>) => setName(value)}
                            placeholder={'Name'} />
                        <PrimaryFormInput
                            editable={!loading}
                            numeric
                            // @ts-ignore
                            onChangeText={(value: React.SetStateAction<number>) => setCapacity(parseInt(value))}
                            placeholder={'Capacity'} />
                        <Button onPress={createSession}
                            style={styles.createButton}
                            disabled={loading || capacity < 1}>
                            <Text style={{ fontWeight: 'bold' }}>Create Location</Text>
                        </Button>
                    </View>
                </Tab>
                <Tab heading={<TabHeading><Text>Join Location</Text></TabHeading>}>
                    <View style={styles.view}>
                        <PrimaryFormInput
                            editable={!loading}
                            onChangeText={(value: React.SetStateAction<string>) => setSessionCode(value)}
                            placeholder={'Location Code'} />
                        <Button onPress={joinSession}
                            style={styles.createButton}
                            disabled={loading || sessionCode.length < 6}>
                            <Text style={{ fontWeight: 'bold' }}>Join Location</Text>
                        </Button>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <ThemedText style={styles.orText}>or</ThemedText>
                        </View>
                        <Button onPress={() => { navigation.replace("CameraScreen") }}
                            style={styles.createButton}>
                            <Text style={{ fontWeight: 'bold' }}>Scan QR Code</Text>
                        </Button>
                    </View>
                </Tab>
            </Tabs>
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
    view: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5
    },
    createButton: {
        marginTop: 5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    orText: {
        fontSize: 18,
        marginTop: 30,
        fontWeight: 'bold',
        marginBottom: 30,
    }
});

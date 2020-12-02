import React from "react";
import { Session } from "../models";
import { List, ListItem, Left, Right } from 'native-base';
import { Text } from '../components/Themed';
import Lib from '../utilities/Lib';
import environment from '../../environment';
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Colors } from '../constants';

const LocationList = (props: any) => {

    const _onLocationItemPress = async (session: Session) => {
        const probability = Math.random();

        if (probability < 0.5 && environment.showAds === true) {
            // Do not want to be too annoying
            await Lib.showInterstitial();
        }

        props.onPress(session)
    };

    const list = <List>
        {
            props.sessions.map((session: Session, i: number) => (
                <ListItem
                    key={i}
                    onPress={async () => { await _onLocationItemPress(session) }} >
                    <Left>
                        <Text>{session.name}</Text>
                    </Left>
                    <Right>
                        <AnimatedCircularProgress
                            size={60}
                            width={10}
                            style={{ padding: 5 }}
                            backgroundWidth={5}
                            // @ts-ignore
                            fill={Math.round((session.currentCount / session.capacity) * 100)}
                            // @ts-ignore
                            tintColor={Math.round((session.currentCount / session.capacity) * 100) > 90 ? Colors.constants.danger : '#00e0ff'}
                            backgroundColor={Colors.constants.darkGrey}>
                            {() => <Text >{ }</Text>}
                        </AnimatedCircularProgress>
                    </Right>
                </ListItem>
            ))
        }
    </List>;

    return list;


}

export default LocationList;

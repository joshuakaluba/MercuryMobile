import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Colors from '../constants/Colors';

const PrimaryButton = (props: any) => {

    const buttonColor = !!props.alternativeColors ?
        { backgroundColor: Colors.constants.blue } :
        { backgroundColor: Colors.constants.primary };

    return (
        <Button
            title={props.title}
            disabled={props.disabled ? props.disabled : false}
            onPress={props.onPress}
            icon={props.icon ? { name: props.icon } : {}}
            loading={props.loading ? props.loading : false}
            titleStyle={styles.titleStyle}
            buttonStyle={[styles.buttonStyle, buttonColor]}
        />
    );
};

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonStyle: {
        width: 300,
        height: 45,
        borderColor: 'transparent',
        marginTop: 5,
        borderWidth: 0,
        borderRadius: 5
    },
    titleStyle: {
        fontWeight: '700'
    }
});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IconButton, useTheme, withTheme} from 'react-native-paper';
import AddServiceSheet from '../modules/app/addService/AddServiceSheet';
import { useNavigation } from '@react-navigation/native';

export default function TitleViewWithBackButton(props) {
    let {colors} = useTheme();
    let navigation = useNavigation();
    let {title, rightIcon, rightAction} = props;


    return (
        <View style={styles.titleView}>
            <IconButton
                icon={'arrow-left'}
                size={28}
                onPress={navigation.goBack}
                style={[styles.goBackButton]}
            />
            <Text style={[styles.titleText, {color: colors.onBackground}]}>{title}</Text>
            {rightIcon && rightAction
                ? <IconButton
                    icon={rightIcon}
                    size={28}
                    onPress={rightAction}
                    style={[styles.actionButton]}
                />
                : <></>}
        </View>
    )
}

const styles = StyleSheet.create({
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        flex:1
    },
    goBackButton: {
        position: 'absolute',
        zIndex: 5
    },
    actionButton: {
        position: 'absolute',
        zIndex: 5,
        right:8
    }
});

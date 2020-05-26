import React from 'react';
import {Text, withTheme, ActivityIndicator, Colors, Button, IconButton} from 'react-native-paper';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import HueBridge from '../../../assets/images/hue-bridge.png'
import LightBulb from '../../../assets/images/light-bulb.png'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {discoverBridge, HueAPI} from './api/HueAPI';

import {getUser, getOrAuthUser} from '../../utils/Authentication'
import {getFirestoreBridge, saveBridgeInFirestore, deleteBridgeFromFirestore} from './utils/FireStore'

import { getDeviceName } from 'react-native-device-info';


class HueCreateWidgetListPage extends React.Component{

    constructor(props) {
        super(props);
        this.colors = props.theme.colors;
        this.state = {
            bridgeFound: false,
            bridgeAddress: null,
            bridgeDiscoveryError: false,
            username: null
        };
        this.hueAPI = null;
    }

    render () {
        return (
            <>
                <View style={styles.titleView}>
                    <IconButton
                        icon={'arrow-left'}
                        size={28}
                        onPress={() => this.props.navigation.popToTop()}
                        style={[styles.goBackButton]}
                    />
                    <Text style={[styles.titleText, {color: this.colors.onBackground}]}>Select widget</Text>
                </View>
            </>
        );
    }
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
    }
});

export default withTheme(HueCreateWidgetListPage)

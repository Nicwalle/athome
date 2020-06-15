import React from 'react';
import {Text, withTheme, ActivityIndicator, Colors, Button} from 'react-native-paper';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import HueBridge from '../../../assets/images/hue-bridge.png'
import LightBulb from '../../../assets/images/light-bulb.png'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {discoverBridge, HueAPI} from './api/HueAPI';

import {getUser, getOrAuthUser} from '../../utils/Authentication'
import {getFirestoreBridges, saveBridgeInFirestore, deleteBridgeFromFirestore} from './utils/FireStore'

import { getDeviceName } from 'react-native-device-info';
import {connect} from 'react-redux';


class BridgeConfigPage extends React.Component{

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

    componentDidMount(): void {
        getOrAuthUser()
            .then(user => {
                return getFirestoreBridges(user.uid);
            })
            .then(result => {
                if (result.length > 0) {
                    let {apiAddress, username} = result[0].data();
                    let bridgeID = result[0].id;
                    this.hueAPI = new HueAPI(apiAddress, username);
                    this.hueAPI.isBridgeAndUserValid()
                        .then(isValid => {
                            if (isValid) {
                                this.setState({
                                    bridgeFound: true,
                                    bridgeAddress: apiAddress,
                                    username: username
                                });
                                const action = {type: 'ADD_BRIDGE', bridgeID, bridge: {
                                        bridgeAddress: apiAddress,
                                        username: username
                                }};
                                this.props.dispatch(action);
                            } else {
                                deleteBridgeFromFirestore(getUser().uid, bridgeID).done();
                                this.discoverBridge().done()
                            }
                        })

                } else {
                    this.discoverBridge().done()
                }

            })
    }


    createHueUser = async () => {
        return getDeviceName()
            .then(deviceName => {
                return this.hueAPI.createUser('Athome', deviceName)
            })
            .then(username => {
                this.setState({username});
            })
            .then(_ => {
                return saveBridgeInFirestore(this.hueAPI.baseAddress, this.hueAPI.username, getUser().uid)
            })
            .catch(_ => null);
    };

    discoverBridge = () => {
        this.setState({bridgeFound: false});
        return discoverBridge()
            .then(bridges => {
                if (bridges.length === 0) {
                    this.setState({bridgeDiscoveryError:true});
                    return null;
                }
                const address = `http://${bridges[0].internalipaddress}/api`;
                this.setState({
                    bridgeDiscoveryError: false,
                    bridgeFound: true,
                    bridgeAddress: address
                });
                return address;
            })
            .then(address => {
                this.hueAPI = new HueAPI(address);
            })
            .then(_ => {
                return this.createHueUser()
            });
    };

    renderFindBridgeStep = () => {
        const bridgeWidth = Dimensions.get('window').width * .8;
        const {width, height} = Image.resolveAssetSource(HueBridge);
        const bridgeFoundPressButton = (<>
            <Image source={HueBridge} style={{width:bridgeWidth, height: (height/width) * bridgeWidth}}/>
            <Text style={{marginTop: 32, fontSize: 24, textAlign: 'center'}}>Press the big button on the Hue bridge</Text>
            <Button icon="gesture-tap" mode="outlined" onPress={() => this.createHueUser()} style={{marginTop: 36}}>
                Button Pressed
            </Button>
        </>);
        const lookingForBridge = (<>
            <ActivityIndicator animating={true} color={this.colors.onBackground} size={'large'} />
            <Text style={{marginTop: 32, fontSize: 24, textAlign: 'center'}}>Looking for your bridge on the network</Text>
        </>);

        const noBridgeFound = (<>
            <Icon name={'access-point-network-off'} size={96} color={this.colors.onBackground}/>
            <Text style={{marginTop: 32, fontSize: 16, textAlign: 'center', width:'80%'}}>
                Could not find your bridge, make sure you are connected to the right network
            </Text>
            <Button icon="refresh" mode="outlined" onPress={() => this.discoverBridge()} style={{marginTop: 36}}>
                Retry
            </Button>
        </>);

        return (
            <>
                {this.state.bridgeFound
                    ? bridgeFoundPressButton    // Image inviting to press the Bridge Button
                    : this.state.bridgeDiscoveryError
                        ? noBridgeFound         // Network error image
                        : lookingForBridge      // Loading image
                }
            </>
        )
    };

    renderConfigurationDone = () => (<>
        <Image source={LightBulb} style={{height:300, aspectRatio: 1}}/>
        <Text style={{marginTop: 32, fontSize: 24, textAlign: 'center'}}>All set and ready to use</Text>
        <Button
            icon="plus"
            mode="outlined"
            style={{marginTop: 36}}
            onPress={() => this.props.navigation.navigate('CreateHueToggleWidget')} >
            Configure widgets
        </Button>
    </>);

    render () {
        return (
            <>
                <View style={styles.titleView}>
                    <Text style={[styles.titleText, {color: this.colors.onBackground}]}>Configure your Hue Devices</Text>
                </View>
                <View style={{ alignItems: 'center', flex:1, justifyContent:'center'}}>
                    {!this.state.username
                        ? this.renderFindBridgeStep()
                        : this.renderConfigurationDone()
                    }
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    titleView: {
        marginTop: 48,
        flexDirection: 'column',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

const mapStateToProps = (state) => {
    return {
        bridges: state.bridges
    };
};

export default connect(mapStateToProps)(withTheme(BridgeConfigPage));

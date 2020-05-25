import React from 'react';
import {Text, withTheme, ActivityIndicator, Colors, Button} from 'react-native-paper';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import HueBridge from '../../../images/hue-bridge.png'
//import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import ProgressStep from '../../components/ProgressSteps/ProgressStep';
import ProgressSteps from '../../components/ProgressSteps/ProgressSteps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {discoverBridge, HueAPI} from './api/HueAPI';
import {add} from 'react-native-reanimated';

class HueConfigPage extends React.Component{

    constructor(props) {
        super(props);
        this.colors = props.theme.colors;
        this.state = {
            bridgeFound: false,
            bridgeAddress: null,
            bridgeDiscoveryError: false
        }
    }

    componentDidMount(): void {
        this.findBridge()
    }

    findBridge = () => {
        this.setState({bridgeFound: false});
        discoverBridge()
            .then(bridges => {
                if (bridges.length === 0) {
                    this.setState({bridgeDiscoveryError:true});
                    return null;
                }
                return `https://${bridges[0].internalipaddress}/api`;
            })
            .then(address => {
                this.setState({
                    bridgeDiscoveryError: false,
                    bridgeFound: true,
                    bridgeAddress: address
                });
                return new HueAPI(address);
            }).then(hueAPI => {
                hueAPI.createUser('Athome', 'Oneplus A5010'); // TODO : Get device name
            })
    };

    renderFindBridgeStep = () => {
        const bridgeWidth = Dimensions.get('window').width * .8;
        const {width, height} = Image.resolveAssetSource(HueBridge);

        const bridgeFound = (<>
            <Image source={HueBridge} style={{width:bridgeWidth, height: (height/width) * bridgeWidth}}/>
            <Text style={{marginTop: 32, fontSize: 24, textAlign: 'center'}}>Press the big button on the Hue bridge</Text>
        </>);

        const lookingForBridge = (<>
            <ActivityIndicator animating={true} color={this.colors.onBackground} size={'large'} />
            <Text style={{marginTop: 32, fontSize: 24, textAlign: 'center'}}>Looking for your bridge on the network</Text>
        </>);

        const noBridgeFound = (<>
            <Icon name={'access-point-network-off'} size={96} color={this.colors.onBackground}/>
            <Text style={{marginTop: 32, fontSize: 16, textAlign: 'center', width:'80%'}}>Could not find your bridge, make sure you are connected to the right network</Text>
            <Button icon="refresh" mode="text" onPress={() => this.findBridge()} style={{marginTop: 36}}>
                Retry
            </Button>
        </>);

        return (
            <>
                {this.state.bridgeFound
                    ? bridgeFound
                    : this.state.bridgeDiscoveryError
                    ? noBridgeFound
                    : lookingForBridge
                }
            </>
        )
    };

    render () {
        return (
            <>
                <View style={styles.titleView}>
                    <Text style={[styles.titleText, {color: this.colors.onBackground}]}>Configure your Hue Devices</Text>
                </View>
                <View style={{flex:1}}>
                    <ProgressSteps
                        activeStepNumColor={this.colors.onBackground}
                        disabledStepNumColor={this.colors.background}
                        disabledStepIconColor={this.colors.onBackground}
                        progressBarColor={this.colors.onBackground}
                        stepIconsLocation={'top'}>
                        <ProgressStep scrollViewProps={{justifyContent: 'center'}} previousBtnDisabled nextBtnText={''} nextBtnDisabled>
                            <View style={{ alignItems: 'center'}}>
                                {this.renderFindBridgeStep()}
                            </View>
                        </ProgressStep>
                        <ProgressStep>
                            <View style={{ alignItems: 'center' }}>
                                <Text>This is the content within step 2!</Text>
                            </View>
                        </ProgressStep>
                        <ProgressStep>
                            <View style={{ alignItems: 'center' }}>
                                <Text>This is the content within step 3!</Text>
                            </View>
                        </ProgressStep>
                    </ProgressSteps>
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
})

export default withTheme(HueConfigPage)

import React from 'react';
import {Text, withTheme, ActivityIndicator, Colors, Button} from 'react-native-paper';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import HueBridge from '../../../images/hue-bridge.png'
//import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import ProgressStep from '../../components/ProgressSteps/ProgressStep';
import ProgressSteps from '../../components/ProgressSteps/ProgressSteps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {discoverBridge} from './api/HueAPI';
import TouchableRipple from 'react-native-paper/src/components/TouchableRipple/index';

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
        discoverBridge()
            .then(bridges => {
                if (bridges.length === 0) {
                    this.setState({bridgeDiscoveryError:true})
                } else {

                }
            })
    };

    renderFindBridgeStep = () => {
        return (
            <>
                {this.state.bridgeFound
                    ? (<>
                        <Image source={HueBridge} style={{width:bridgeWidth, height: (height/width) * bridgeWidth}}/>
                        <Text style={{marginTop: 32, fontSize: 24, textAlign: 'center'}}>Press the big button on the Hue bridge</Text>
                    </>)
                    :(<>
                        {this.state.bridgeDiscoveryError
                            ? <Icon name={'emoticon-cry-outline'} size={96}/>
                            : <ActivityIndicator animating={true} color={Colors.white} size={'large'} />
                        }
                        <Text style={{marginTop: 32, fontSize: 24, textAlign: 'center'}}>Looking for your bridge on the network</Text>
                        {this.state.bridgeDiscoveryError
                            ?   <Button icon="refresh" mode="text" onPress={() => this.findBridge()}>
                                Retry
                            </Button>
                            : <></>
                        }
                    </>)}
            </>
        )
    };

    render () {
        const bridgeWidth = Dimensions.get('window').width * .8;
        const {width, height} = Image.resolveAssetSource(HueBridge);

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

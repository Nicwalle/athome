import React from 'react';
import {Text, withTheme} from 'react-native-paper';
import {StyleSheet, View, Image} from 'react-native';
import HueBridge from '../../../images/hue-bridge.png'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';


class HueConfigPage extends React.Component{

    constructor(props) {
        super(props);
        this.colors = props.theme.colors
    }

    render () {
        return (
            <>
                <View style={styles.titleView}>
                    <Text style={[styles.titleText, {color: this.colors.onBackground}]}>Configure your Hue Devices</Text>
                </View>
                <View style={{flex: 1}}>
                    <ProgressSteps
                        activeStepNumColor={this.colors.onBackground}
                        disabledStepNumColor={this.colors.background}
                        disabledStepIconColor={this.colors.onBackground}
                        progressBarColor={this.colors.onBackground}>
                        <ProgressStep>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={HueBridge} style={{resizeMode: 'contain', height:200}}/>
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
        marginTop: 64,
        marginHorizontal: 16,
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

import React from 'react';
import {Text, TextInput} from 'react-native-paper';
import {View} from 'react-native';
import BigSlider from '../../../components/BigSlider';
import AsyncStorage from '@react-native-community/async-storage';
import RBSheet from 'react-native-raw-bottom-sheet';

export default class CurtainsSettings extends React.Component {

    RBSheet;

    open = () => this.RBSheet.open();

    render () {
        return (
            <RBSheet
                ref={ref => {
                    this.RBSheet = ref;
                }}
                height={300}
                duration={300}
                animationType={'fade'}
                closeOnDragDown={true}
                customStyles={{
                    container: {
                        paddingHorizontal:16,
                        borderTopLeftRadius: 24,
                        borderTopRightRadius: 24
                    }
                }}
            >

                <Text>Set current state (without moving curtains)</Text>
                <View style={{height:80}}>
                    <BigSlider
                        trackStyle={{ backgroundColor: '#FFC107' }}
                        maximumValue={this.props.state.closedState}
                        minimumValue={this.props.state.openState}
                        value={this.props.state.curtainState}
                        onValueChange={val => {
                            this.props.setState({ curtainState: Math.round(val) });
                            this.props.slideTo(Math.round(val))
                        }}
                        onSlidingComplete={() => {
                            this.props.apiRequest('/set-state', {state: this.props.state.curtainState}).done();
                        }}
                        ref={'bigSlider'}
                    />
                </View>
                <View style={{flexDirection:'row', marginTop:16}}>
                    <View style={{flex: .5, marginRight: 8}}>
                        <TextInput
                            mode={'outlined'}
                            label={'Open state'}
                            value={this.props.state.openState.toString()}
                            keyboardType={'numeric'}
                            onChangeText={text => {
                                this.props.setState({openState: text});
                                if (Number.isInteger(parseInt(text)) && parseInt(text) < this.props.state.closedState) {
                                    this.props.apiRequest('/set-bounds', {open: parseInt(text)})
                                        .then(() => {
                                            this.props.setExtrema(parseInt(text), this.props.state.closedState)
                                        })
                                        .done();
                                }
                            }}
                        />
                    </View>
                    <View style={{flex: .5, marginLeft: 8}}>
                        <TextInput
                            mode={'outlined'}
                            label={'Closed state'}
                            value={this.props.state.closedState.toString()}
                            keyboardType={'numeric'}
                            onChangeText={text => {
                                this.props.setState({closedState: text});
                                if (Number.isInteger(parseInt(text)) && parseInt(text) > this.props.state.openState) {
                                    this.props.apiRequest('/set-bounds', {closed: parseInt(text)})
                                        .then(() => {
                                            this.props.setExtrema(this.props.state.openState, parseInt(text))
                                        })
                                        .done();
                                }
                            }}
                        />
                    </View>
                </View>
                <View style={{flex: 1, marginTop: 16}}>
                    <TextInput
                        mode={'outlined'}
                        label={'Network address'}
                        value={this.props.state.curtainsAddress}
                        onChangeText={address => {
                            this.props.setState({curtainsAddress: address.replace(/\/$/, "")});
                            AsyncStorage.setItem('@curtainsModule.ip', address.replace(/\/$/, "")).done();
                            this.props.refresh()
                        }}
                    />
                </View>
            </RBSheet>
        );
    }
}

import {View} from 'react-native';
import React from 'react';
import CurtainsSlider from './curtains/slider/CurtainsSlider';
import BlockButton from '../components/BlockButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Text, TextInput} from 'react-native-paper';
import BigSlider from '../components/BigSlider';

export class CurtainsModule extends React.Component {
    state = {
        curtainState: 0
    };

    refresh = () => this.getCurrentState();

    constructor() {
        super();
        this.state = {
            openState: 0,
            closedState: 4200,
            curtainState: 0,
            curtainsAddress: "http://192.168.188.37"
        };
    }


    componentDidMount() {
        this.getCurrentState().done();
    }


    getCurrentState = () => {
        return fetch(this.state.curtainsAddress + '/get-state')
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    openState: response.openState,
                    closedState: response.closedState,
                    curtainState: response.state,
                    loaded: true
                });
                this.refs.slider.bigSlider.slideTo(response.state);
                this.refs.slider.bigSlider.setExtrema(response.openState, response.closedState);
            })
            .catch(() => this.setState({loaded: false}));
    };

    render () {
        return (
            <>
                <View style={{marginBottom:16}}>
                    <CurtainsSlider
                        ref={'slider'}
                        loaded={this.state.loaded}
                        openState={this.state.openState}
                        closedState={this.state.closedState}
                        state={this.state.curtainState}
                        curtainsAddress={this.state.curtainsAddress}
                    />
                </View>
                <View style={{flex: 1, flexDirection:'row', marginBottom:16}}>
                    <View style={{flex: .25, marginRight: 8}}>
                        <BlockButton icon={'stop'} color={'#fff'} backgroundColor={'#f44336'}
                                     onPress={() => {
                                         fetch(this.state.curtainsAddress + '/stop').done()
                                         }}
                        />
                    </View>
                    <View style={{flex: .25, marginHorizontal: 8}}>
                        <BlockButton icon={'fast-rewind'} color={'#fff'} backgroundColor={'#FFC107'}
                                     onPress={() => {
                                         fetch(this.state.curtainsAddress + '/left').done();
                                         this.getCurrentState().done();
                                     }}
                        />
                    </View>
                    <View style={{flex: .25, marginHorizontal: 8}}>
                        <BlockButton icon={'fast-forward'} color={'#fff'} backgroundColor={'#FFC107'}
                                     onPress={() => {
                                         fetch(this.state.curtainsAddress + '/right').done();
                                         this.getCurrentState().done();
                                     }}
                        />
                    </View>
                    <View style={{flex: .25, marginLeft: 8}}>
                        <BlockButton icon={'settings'} color={'#fff'} backgroundColor={'rgb(59,185,253)'}
                                     onPress={() => this.RBSheet.open()}
                        />
                    </View>
                </View>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={400}
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
                    <>
                    <Text>Set current state (without moving curtains)</Text>
                    <View style={{height:80}}>
                        <BigSlider
                            trackStyle={{ backgroundColor: '#FFC107' }}
                            maximumValue={this.state.closedState}
                            minimumValue={this.state.openState}
                            value={this.state.curtainState}
                            onValueChange={val => {
                                this.setState({ curtainState: Math.round(val) });
                                this.refs.slider.bigSlider.slideTo(Math.round(val))
                            }}
                            onSlidingComplete={() => {
                                fetch(this.state.curtainsAddress + '/set-state?state='+this.state.curtainState).done();
                            }}
                            ref={'bigSlider'}
                        />
                    </View>
                    <View style={{flexDirection:'row', marginTop:16}}>
                        <View style={{flex: .5, marginRight: 8}}>
                            <TextInput
                                mode={'outlined'}
                                label={'Open state'}
                                value={this.state.openState.toString()}
                                onChangeText={text => {
                                    // TODO : accept values and validate then
                                    if (Number.isInteger(parseInt(text))) {
                                        fetch(this.state.curtainsAddress + '/set-bounds?open=' + text).done();
                                        this.setState({
                                            openState: parseInt(text)
                                        });
                                        this.refs.slider.bigSlider.setExtrema(parseInt(text), this.state.closedState);
                                    }
                                }}
                            />
                        </View>
                        <View style={{flex: .5, marginLeft: 8}}>
                            <TextInput
                                mode={'outlined'}
                                label={'Closed state'}
                                value={this.state.closedState.toString()}
                                onChangeText={text => {
                                    // TODO : accept values and validate then
                                    if (Number.isInteger(parseInt(text))) {
                                        fetch(this.state.curtainsAddress + '/set-bounds?close=' + text).done();
                                        this.setState({
                                            closedState: parseInt(text)
                                        });
                                        this.refs.slider.bigSlider.setExtrema(this.state.openState, parseInt(text));
                                    }
                                }}
                            />
                        </View>
                    </View>
                        </>
                </RBSheet>
            </>
        )
    }
}

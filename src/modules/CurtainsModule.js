import {View} from 'react-native';
import React from 'react';
import CurtainsSlider from './curtains/slider/CurtainsSlider';
import BlockButton from '../components/BlockButton';
import {Text} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import CurtainsSettings from './curtains/configurator/CurtainsSettings';

export class CurtainsModule extends React.Component {
    refresh = () => this.getCurrentState();

    slider;

    constructor() {
        super();
        this.state = {
            openState: 0,
            closedState: 4200,
            curtainState: 0,
            curtainsAddress: null
        };
    }


    componentDidMount() {
        this.getCurrentState().done();
    }

    apiRequest = (uri, params={}) => {
        return this.getAddress()
            .then((address) => {
                let fullUrl = address + uri;
                let i = 0;
                for (let key in params) {
                    fullUrl += i===0 ? "?": "&";
                    fullUrl += key + "=" + params[key];
                    i++
                }

                return fetch(fullUrl)
            })
            .then(response => response.json())
    };

    getAddress = () => {
        if (this.state.curtainsAddress != null) {
            return Promise.resolve(this.state.curtainsAddress)
        } else {
            return AsyncStorage.getItem('@curtainsModule.ip').then((value) => {
                this.setState({curtainsAddress: value});
                return value
            });
        }
    };

    getCurrentState = () => {
        return this.apiRequest('/get-state')
            .then((response) => {
                this.setState({
                    openState: response.openState,
                    closedState: response.closedState,
                    curtainState: response.state,
                    loaded: true
                });
                this.slideTo(response.state);
                this.setExtrema(response.openState, response.closedState);
            })
            .catch(() => this.setState({loaded: false}));

    };

    slideTo = (value) => this.slider.bigSlider.slideTo(value);

    setExtrema = (min, max) => this.slider.bigSlider.setExtrema(min, max);

    updateState = (newState) => this.setState(newState);

    render () {
        return (
            <>
                <View style={{marginBottom:16, alignItems:'center'}}>
                    <Text>Curtains</Text>
                </View>
                <View style={{marginBottom:16}}>
                    <CurtainsSlider
                        ref={ref => {
                            this.slider = ref;
                        }}
                        loaded={this.state.loaded}
                        openState={this.state.openState}
                        closedState={this.state.closedState}
                        state={this.state.curtainState}
                        curtainsAddress={this.state.curtainsAddress}
                        setCurtainState={newValue => this.setState({curtainState: newValue})}
                        apiRequest={this.apiRequest}
                    />
                </View>
                <View style={{flex: 1, flexDirection:'row', marginBottom:16}}>
                    <View style={{flex: .25, marginRight: 8}}>
                        <BlockButton icon={'stop'} color={'#fff'} backgroundColor={'#f44336'}
                                     onPress={() => {
                                         this.apiRequest('/stop')
                                             .then(response => {
                                                 const realState = response.state;
                                                 this.setState({curtainState: realState});
                                                 this.slideTo(realState);
                                             })
                                             .done()
                                     }}
                        />
                    </View>
                    <View style={{flex: .25, marginHorizontal: 8}}>
                        <BlockButton icon={'fast-rewind'} color={'#fff'} backgroundColor={'#FFC107'}
                                     onPress={() => {
                                         this.apiRequest('/left')
                                             .then(response => {
                                                 this.setState({curtainState: response.objective,});
                                                 this.slideTo(response.objective);
                                             }).done();
                                     }}
                        />
                    </View>
                    <View style={{flex: .25, marginHorizontal: 8}}>
                        <BlockButton icon={'fast-forward'} color={'#fff'} backgroundColor={'#FFC107'}
                                     onPress={() => {
                                         this.apiRequest('/right')
                                             .then(response => {
                                                 this.setState({curtainState: response.objective});
                                                 this.slideTo(response.objective);
                                             }).done();
                                     }}
                        />
                    </View>
                    <View style={{flex: .25, marginLeft: 8}}>
                        <BlockButton icon={'settings'} color={'#fff'} backgroundColor={'rgb(59,185,253)'}
                                     onPress={() => this.refs.curtainsSettings.open()}
                        />
                    </View>
                </View>
                <CurtainsSettings
                    ref={'curtainsSettings'}
                    state={this.state}
                    setState={this.updateState}
                    slideTo={this.slideTo}
                    setExtrema={this.setExtrema}
                    apiRequest={this.apiRequest}
                    refresh={this.refresh}
                />
            </>
        )
    }
}

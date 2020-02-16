import BigSlider from './BigSlider';
import {View} from 'react-native';
import React from 'react';
import {EmptyView} from './EmptyView';

export default class CurtainsSlider extends React.Component {
    state = {
        curtainState: 0
    };

    refresh = () => this.getCurrentState();

    constructor() {
        super();
        this.state = {
            openState: 0,
            closedState: 1,
            curtainState: 0,
            loaded:false
        };
        setInterval(this.getCurrentState, 2000);

    }

    componentDidMount() {
        this.getCurrentState();
    }

    getCurrentState = () => {
        return new Promise((resolve, reject) => {
            fetch('http://192.168.188.37/get-state')
                .then((response) => response.json())
                .then((response) => {
                    this.setState({
                        openState: response.openState,
                        closedState: response.closedState,
                        curtainState: response.state,
                        loaded: true
                    });
                    this.refs.bigSlider.slideTo(response.state);
                    this.refs.bigSlider.setExtrema(response.openState, response.closedState);
                    resolve();
                })
                .catch((error) => reject(error))
            ;
        });

    };

    render () {
        return (
            this.state.loaded
                ? <View style={{height: 100}}>
                    <BigSlider
                        trackStyle={{ backgroundColor: 'rgb(59,185,253)' }}
                        maximumValue={this.state.closedState}
                        minimumValue={this.state.openState}
                        value={this.state.curtainState}
                        onValueChange={val => {
                            this.setState({ curtainState: Math.round(val) });
                        }}
                        onSlidingComplete={_ => {
                            fetch('http://192.168.188.37/goto?goal='+this.state.curtainState);
                        }}
                        ref={'bigSlider'}
                    />
                </View>
                : <EmptyView/>
        )
    }
}

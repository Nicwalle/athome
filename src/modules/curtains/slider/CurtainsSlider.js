import BigSlider from '../../../components/BigSlider';
import React from 'react';
import {LoadingCurtainsSlider} from './LoadingCurtainsSlider';

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
    }

    componentDidMount() {
        this.getCurrentState().then().catch();
    }

    getCurrentState = () => {
        return fetch('http://192.168.188.37/get-state')
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
            })
            .catch(() => this.setState({loaded: false}));
    };

    render () {
        return (
            this.state.loaded
                ?
                    <BigSlider
                        trackStyle={{ backgroundColor: 'rgb(59,185,253)' }}
                        maximumValue={this.state.closedState}
                        minimumValue={this.state.openState}
                        value={this.state.curtainState}
                        onValueChange={val => {
                            this.setState({ curtainState: Math.round(val) });
                        }}
                        onSlidingComplete={_ => {
                            // fetch('http://192.168.188.37/goto?goal='+this.state.curtainState);
                            console.log('OK')
                        }}
                        ref={'bigSlider'}
                    />
                : <LoadingCurtainsSlider/>
        );
    }
}

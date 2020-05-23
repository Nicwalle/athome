import BigSlider from '../../../components/BigSlider';
import React from 'react';
import LoadingCurtainsSlider from './LoadingCurtainsSlider';
import WindowLight from '../../../../images/window-light.png';
import WindowColor from '../../../../images/curtains.png';

export default class CurtainsSlider extends React.Component {
    state = {
        goto: -1
    };

    bigSlider;

    render () {
        return (
            this.props.loaded
                ?
                <BigSlider
                    trackStyle={{ backgroundColor: 'rgb(59,185,253)' }}
                    maximumValue={this.props.closedState}
                    minimumValue={this.props.openState}
                    value={this.state.moving?this.state.goto:this.props.state}
                    onValueChange={val => {
                        this.setState({ moving: true, goto: Math.round(val) });
                    }}
                    onSlidingComplete={() => {
                        this.props.apiRequest('/goto', {goal: this.state.goto})
                            .then(response => {
                                this.props.setCurtainState(response.objective);
                                this.setState({moving: false});
                            })
                            .done();
                    }}
                    ref={ref => {
                        this.bigSlider = ref;
                    }}
                    leftImage={WindowLight}
                    rightImage={WindowColor}
                />
                : <LoadingCurtainsSlider/>
        );
    }
}

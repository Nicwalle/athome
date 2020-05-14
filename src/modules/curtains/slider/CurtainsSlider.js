import BigSlider from '../../../components/BigSlider';
import React from 'react';
import {LoadingCurtainsSlider} from './LoadingCurtainsSlider';
import WindowLight from '../../../../images/window-light.png';
import WindowColor from '../../../../images/window-color.png';

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
                    value={this.state.goto !== -1 ? this.state.goto : this.props.state}
                    onValueChange={val => {
                        this.setState({ goto: Math.round(val) });
                    }}
                    onSlidingComplete={() => {
                        fetch(this.props.curtainsAddress + '/goto?goal='+this.state.goto).done();
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

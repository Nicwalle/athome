import {Dimensions, Image, View} from 'react-native';
import React from 'react';
import CurtainsSlider from '../components/curtainsSlider/CurtainsSlider';

export class CurtainsModule extends React.Component {

    render () {
        return (
            <>
                <CurtainsSlider ref={'curtainsSlider'}/>
            </>
        )
    }
}

import {View} from 'react-native';
import React from 'react';
import CurtainsSlider from './curtains/slider/CurtainsSlider';
import BlockButton from '../components/BlockButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Text, TextInput} from 'react-native-paper';
import BigSlider from '../components/BigSlider';

export class HueModule extends React.Component {
    constructor() {
        super();
        this.state = {
            hueAddress: 'http://192.168.188.24/api/dxY2ij3DNYPa9iBNGsJY7rXOO4jlG62of0cEGjHc',
            harryPotterOn: false
        };
    }

    render () {
        return (
            <>
                <View style={{marginBottom:16, alignItems:'center'}}>
                    <Text>Philips Hue</Text>
                </View>
                <View style={{flex: 1, flexDirection:'row', marginBottom:16}}>
                    <BlockButton icon={'tv'} color={'#fff'} backgroundColor={'#9b59b6'}
                                 onPress={() => {
                                     if (this.state.harryPotterOn) {
                                         fetch(this.state.hueAddress + '/groups/1/action', {
                                             method: 'PUT',
                                             body: JSON.stringify({
                                                 on:false
                                             })
                                         }).done();
                                         this.setState({harryPotterOn: false})
                                     } else {
                                         fetch(this.state.hueAddress + '/groups/1/action', {
                                             method: 'PUT',
                                             body: JSON.stringify({
                                                 scene:"ZMTibsD6LtfsfVE"
                                             })
                                         }).done();
                                         this.setState({harryPotterOn: true})
                                     }
                                 }}
                    />
                </View>
            </>
        )
    }
}

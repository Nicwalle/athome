import {View} from 'react-native';
import React from 'react';
import BlockButton from '../components/BlockButton';
import {Text} from 'react-native-paper';

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
                    <BlockButton icon={'tv'} color={'#fff'} text={'Harry Potter'} gradientColors={['#2face2', '#c36976', '#f7cba5']}
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

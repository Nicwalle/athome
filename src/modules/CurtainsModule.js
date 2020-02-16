import {View} from 'react-native';
import React from 'react';
import CurtainsSlider from './curtains/slider/CurtainsSlider';
import BlockButton from './curtains/stopButton/BlockButton';

export class CurtainsModule extends React.Component {

    render () {
        return (
            <>
                <View style={{marginBottom:16}}>
                    <CurtainsSlider ref={'slider'}/>
                </View>
                <View style={{flex: 1, flexDirection:'row', marginBottom:16}}>
                    <View style={{flex: 0.33, marginRight: 8}}>
                        <BlockButton icon={'stop'} color={'#fff'} backgroundColor={'#f44336'}
                                     onPress={() => fetch('http://192.168.188.37/stop').done()}
                        />
                    </View>
                    <View style={{flex: 0.5, marginLeft: 8}}>
                        <BlockButton disabled/>
                    </View>
                </View>
            </>
        )
    }
}

import {Dimensions, Image, View} from 'react-native';
import React from 'react';

export class EmptyView extends React.Component {

    render () {
        return (
            <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                <Image
                    source={require('../../../assets/images/atom.png')}
                    style={{
                        width:Dimensions.get('window').width*.8,
                        height:Dimensions.get('window').width*.8
                    }}
                />
            </View>
        )
    }
}

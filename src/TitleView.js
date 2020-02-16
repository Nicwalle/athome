import {Text, View} from 'react-native';
import React from 'react';
import {IconButton} from 'react-native-paper';

export class TitleView extends React.Component {
    styles = {
        titleView: {
            marginTop: 24,
            marginHorizontal: 16,
            elevation: 10,
            flexDirection: 'row',
        },
        titleText: {
            fontSize: 28,
            fontWeight: '700',
            color: '#212121',
            flex: 1,
        },
    };

    render () {
        return (
            <View style={this.styles.titleView}>
                <Text style={this.styles.titleText}>Athome</Text>
                <IconButton
                    icon={'plus'}
                    size={28}
                    onPress={() => console.log('Nothing')}
                    style={{backgroundColor: '#dedede', marginTop: -2, marginHorizontal: 0}}
                />
            </View>
        )
    }
}

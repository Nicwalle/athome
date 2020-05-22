import {Text, View} from 'react-native';
import React from 'react';
import {IconButton} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import AddServiceSheet from './AddServiceSheet';

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
        addItemButton: {
            backgroundColor: '#dedede',
            marginTop: -2,
            marginHorizontal: 0
        }
    };

    addItemSheet;

    render () {
        return (
            <>
                <View style={this.styles.titleView}>
                    <Text style={this.styles.titleText}>Athome</Text>
                    <IconButton
                        icon={'plus'}
                        size={28}
                        onPress={() => this.addItemSheet.open()}
                        style={this.styles.addItemButton}
                    />
                </View>
                <AddServiceSheet ref={(ref) => this.addItemSheet = ref}/>
            </>
        )
    }
}

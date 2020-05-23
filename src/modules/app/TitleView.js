import {Text, View} from 'react-native';
import React from 'react';
import {IconButton, withTheme} from 'react-native-paper';
import AddServiceSheet from './AddServiceSheet';

class TitleView extends React.Component {
    colors;
    constructor(props) {
        super();
        let {text, surface} = props.theme.colors;
        this.styles.titleText.color = text;
        this.styles.addItemButton.backgroundColor = surface;
    }
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
            flex: 1,
        },
        addItemButton: {
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
                        style={[this.styles.addItemButton, {backgroundColor: this.props.theme.colors.surface}]}
                    />
                </View>
                <AddServiceSheet ref={(ref) => this.addItemSheet = ref}/>
            </>
        )
    }
}

export default withTheme(TitleView);

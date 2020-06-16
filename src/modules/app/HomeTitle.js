import {Text, View} from 'react-native';
import React from 'react';
import {IconButton, withTheme} from 'react-native-paper';
import AddServiceSheet from './addService/AddServiceSheet';

class HomeTitle extends React.Component {
    colors;
    constructor(props) {
        super();
        let {onBackground, surface} = props.theme.colors;
        this.styles.titleText.color = onBackground;
        this.styles.addItemButton.backgroundColor = surface;
    }
    styles = {
        titleView: {
            marginTop: 24,
            marginHorizontal: 16,
            flexDirection: 'row'
        },
        titleText: {
            fontSize: 28,
            fontWeight: 'bold',
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
                <AddServiceSheet ref={(ref) => this.addItemSheet = ref} navigation={this.props.navigation}/>
            </>
        )
    }
}

export default withTheme(HomeTitle);

import React from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import {withTheme} from 'react-native-paper';
import SelectorBottomSheet from './SelectorBottomSheet';
import HueIcon from './customIcons/HueIcons';


class HueIconSelectorBottomSheet extends SelectorBottomSheet {

    constructor(props) {
        super(props);
        this.sheetTitle = 'Select icon'
    }

    renderItem = (icon) => {
        return (
            <View style={{
                flex:1,
                alignItems: 'center',
                justifyContent: 'center',
                margin:8,
                maxWidth: Dimensions.get('window').width / 4 - 24,
            }}>
                <TouchableOpacity
                    onPress={() => this.props.onItem(icon)}
                    style={{
                        width: 56,
                        height:56,
                        borderRadius:28,
                        backgroundColor: icon===this.props.currentItem? this.colors.surface2:'transparent'
                    }}>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1
                        }}>
                        <HueIcon
                            name={icon}
                            size={32}
                            color={this.colors.onSurface}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    };

}

export default withTheme(HueIconSelectorBottomSheet);

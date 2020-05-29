import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import HueIcon from './customIcons/HueIcons';

export default function HueIconSelectorButton (props){
    const {colors} = useTheme();
    const {icon, onPress} = props;

    return (
        <>
            <TouchableOpacity
                onPress={() => onPress()}
                style={{
                    width: 56,
                    height:56,
                    backgroundColor: colors.surface,
                    borderRadius:28,
                }}
            >
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1
                    }}>
                    <HueIcon
                        name={icon}
                        size={28}
                        color={colors.onSurface}
                    />
                </View>
            </TouchableOpacity>
        </>
    )
}

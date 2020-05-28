import {IconButton, Text, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import React from 'react';

export default function IncrementInput(props) {

    const {onMinus, onPlus, value, min, max} = props;
    const {colors} = useTheme();

    return (
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <IconButton
                icon={'minus'}
                color={colors.onSurface}
                style={{backgroundColor:colors.surface}}
                size={24}
                onPress={() => value>min? onMinus():''}
            />
            <Text style={{fontSize:20, minWidth: 30, textAlign:'center'}}>{value}</Text>
            <IconButton
                icon={'plus'}
                color={colors.onSurface}
                style={{backgroundColor:colors.surface}}
                size={24}
                onPress={() => value<max? onPlus():''}
            />
        </View>
    );

}

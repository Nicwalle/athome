import {View, TouchableWithoutFeedback} from 'react-native';
import React, {useState} from 'react';
import {Text, useTheme} from 'react-native-paper';

export default function MockUnitWidget() {
    const [visible, setVisible] = useState(false);
    const {colors} = useTheme();

    return (
        <>
            <TouchableWithoutFeedback onPress={() => setVisible(!visible)}>
                <View
                    style={{
                        borderRadius:16,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height:64,
                        flex: 1,
                        backgroundColor: colors.surface,
                        marginHorizontal:8
                    }}

                >
                    <Text>{visible ? 'Mock element' : ''}</Text>
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}

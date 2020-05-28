import React from 'react';
import {TouchableOpacity} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import {useTheme} from 'react-native-paper';


export default function GradientSelectorButton (props){


    const {gradients} = useTheme();
    const {color, onPress} = props;


    let gradient;
    if (!(color in gradients)) {
        gradient = gradients.orange;
    } else {
        gradient = gradients[color]
    }



    return (
        <>
            <TouchableOpacity
                onPress={() => onPress()}
                style={{
                    width: 56,
                    height:56,
                }}
            >
                <LinearGradient
                    colors={gradient}
                    start={{x:0, y:0}}
                    end={{x:1, y:1}}
                    style={{
                        borderRadius:28,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1
                    }}
                />
            </TouchableOpacity>
        </>
    )
}





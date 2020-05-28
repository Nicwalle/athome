import LinearGradient from "react-native-linear-gradient";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, useTheme} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

export default function ToggleWidget(props) {

    const {gradients, colors} = useTheme();
    const {icon, name, width, color, isOn} = props;

    const [toggle, setToggle] = useState(isOn || true);

    let gradient;
    if (!toggle) {
        gradient = [colors.surface, colors.surface]
    } else if (!(color in gradients)) {
        gradient = gradients.orange;
    } else {
        gradient = gradients[color]
    }

    function renderName() {
        if (name === '') return <></>;
        const style = {
            color: colors.onSurface
        };

        if (width>1) {
            style['fontSize'] = 18;
            style['marginLeft'] = 8;
        }

        return <Text style={style}>{name}</Text>


    }

    return (
        <TouchableOpacity
            onPress={() => setToggle(!toggle)}
            style={{
                flex:width || 1,
                height:64,
                marginHorizontal:8
            }}
        >
            <LinearGradient
                colors={gradient}
                start={{x:0, y:0}}
                end={{x:1, y:1}}
                style={{
                    borderRadius:16,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    flexDirection:width>1?'row':'column'
                }}
            >
                <Icon
                    name={icon || 'power'}
                    color={'white'}
                    size={width>1?36:32}
                />
                {renderName()}
            </LinearGradient>
        </TouchableOpacity>
    );

}

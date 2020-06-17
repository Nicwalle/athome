import LinearGradient from "react-native-linear-gradient";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, useTheme} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import HueIcon from './customIcons/HueIcons'
import {HueAPI} from '../modules/hue/api/HueAPI';
import {connect, useSelector} from 'react-redux';

export default function ToggleWidget(props) {

    const {gradients, colors} = useTheme();
    const [powerState, setPowerState] = useState(true);
    const {icon, name, width, color, bridgeID, lights, groups} = props;
    const store = useSelector(state => state.bridges);
    let hueAPI;
    if (bridgeID) {
        hueAPI = new HueAPI(store[bridgeID].bridgeAddress, store[bridgeID].username);
    }

    useEffect(()=>{
        updatePowerState()
    });

    let gradient;

    if (!powerState) {
        gradient = [colors.surface, colors.surface]
    } else if (!(color in gradients)) {
        gradient = gradients.orange;
    } else {
        gradient = gradients[color]
    }

    const renderName = () => {
        if (name === '') return <></>;
        const style = {
            color: colors.onSurface
        };

        if (width>1) {
            style['fontSize'] = 18;
            style['marginLeft'] = 8;
        }
        return <Text style={style}>{name}</Text>
    };

    const updatePowerState = () => {
        let trues = 0;
        let total = 0;
        const lightsPromises = Object.keys(lights).map(light => hueAPI.getPowerState(light).then(powerState => {
                total++;
                if (powerState) trues++;
            })
        );

        const groupsPromises = Object.keys(groups).map(group => hueAPI.getPowerState(group, 'groups').then(powerState => {
                total++;
                if (powerState) trues++;
            })
        );
        const promises = [...lightsPromises, ...groupsPromises];
        if (promises.length > 0) {
            Promise.all(promises).then(() => {
                setPowerState(trues / total >= .5)
            });
        } else setPowerState(true);
    };

    const onclick = () => {
        const promises = [];
        Object.keys(lights).forEach(light => {
            promises.push(hueAPI.toggleLight(light, !powerState, 'lights'));
        });

        Object.keys(groups).forEach(light => {
            promises.push(hueAPI.toggleLight(light, !powerState, 'groups'));
        });

        Promise.all(promises).then(()=>updatePowerState());
    };




    return (
        <TouchableOpacity
            onPress={() => onclick()}
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
                <HueIcon
                    name={icon || 'power'}
                    color={'white'}
                    size={width>1?36:32}
                />
                {renderName()}
            </LinearGradient>
        </TouchableOpacity>
    );

}

import React, {useState, useRef} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import {withTheme} from 'react-native-paper';
import SelectorBottomSheet from './SelectorBottomSheet';


class GradientSelectorBottomSheet extends SelectorBottomSheet {

    constructor(props) {
        const {gradients} = props.theme;
        console.log(gradients)
        Object.keys(gradients)
        super(props);
        this.gradients = gradients;
    }

    renderItem = (gradient) => {
        return (
            <View style={{
                flex:1,
                alignItems: 'center',
                justifyContent: 'center',
                margin:8,
                maxWidth: Dimensions.get('window').width / 4 - 24,
            }}>
                <TouchableOpacity
                    onPress={() => this.props.onColor(gradient)}
                    style={{
                        width: 56,
                        height:56,
                    }}>
                    <LinearGradient
                        colors={this.gradients[gradient]}
                        start={{x:0, y:0}}
                        end={{x:1, y:1}}
                        style={{
                            flex: 1,
                            borderRadius:this.props.color===gradient ? 12 : 28,
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    };

}

export default withTheme(GradientSelectorBottomSheet);

import React, {useState, useRef} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import {useTheme} from 'react-native-paper';
import {getStatusBarHeight} from "react-native-status-bar-height";
import BottomSheet from 'reanimated-bottom-sheet'


export default function GradientSelectorBottomSheet (props){


    const {gradients, colors} = useTheme();
    const {color, visible, onColor} = props;
    const bottomSheetRef = useRef(null);

    if (visible) {
        bottomSheetRef.current.snapTo(0);
    }

    const gradientColors = Object.keys(gradients);
    let numRows = Math.ceil(gradientColors.length/4);
    let rowHeight = 72;

    const renderItem = (gradient) => {
        return (
            <View style={{
                flex:1,
                alignItems: 'center',
                justifyContent: 'center',
                margin:8,
                maxWidth: Dimensions.get('window').width / 4 - 24,
            }}>
                <TouchableOpacity
                    onPress={() => onColor(gradient)}
                    style={{
                        width: 56,
                        height:56,
                    }}>
                    <LinearGradient
                        colors={gradients[gradient]}
                        start={{x:0, y:0}}
                        end={{x:1, y:1}}
                        style={{
                            flex: 1,
                            borderRadius:color===gradient?12:28,
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    };

    const renderContent = () => (
        <View style={{backgroundColor: colors.surface, paddingHorizontal:16}}>
            <FlatList
                horizontal={false}
                numColumns={4}
                data={gradientColors}
                renderItem={({item})=>renderItem(item)}
                keyExtractor={item=> item}
            />
        </View>
    );

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints= {getSnapPoints(numRows, rowHeight)}
            initialSnap={2}
            renderContent={renderContent}
            renderHeader={()=> (
                <View style={[styles.panelHeader, {backgroundColor: colors.surface}]}>
                    <View style={styles.panelHandle} />
                    <Text style={[styles.panelHeaderTitle, {color: colors.onSurface}]}>Select color</Text>
                </View>
            )}
        />
    )
}

function getSnapPoints(numRows, rowHeight) {
    const fullHeight = Dimensions.get('window').height - getStatusBarHeight(false);
    let maxHeight = Math.min(fullHeight, (numRows) * rowHeight + 56);
    return [maxHeight, 0, -10000];
}

const styles = StyleSheet.create({
    panel: {
    },
    panelHeaderTitle: {
        fontSize:16,
        marginBottom: 8,
        marginTop: 8,
    },
    panelHeader: {
        backgroundColor: 'black',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        minHeight:30,
    },
    panelHandle: {
        width: 40,
        height: 6,
        borderRadius: 4,
        backgroundColor: '#FFFFFF40',
        marginTop: 12,
    },
});





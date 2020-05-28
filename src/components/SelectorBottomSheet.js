import React, {useState, useRef} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import {useTheme, withTheme} from 'react-native-paper';
import {getStatusBarHeight} from "react-native-status-bar-height";
import BottomSheet from 'reanimated-bottom-sheet'


class SelectorBottomSheet extends React.Component {

    constructor(props) {
        super(props);
        const {colors} = props.theme;
        this.data = props.data;
        this.colors = colors;

        this.bottomSheetRef = React.createRef();
        this.numRows = Math.ceil(this.data.length/4);
        this.rowHeight = 72;
    }

    open = () => this.bottomSheetRef.current.snapTo(0);

    close = () => this.bottomSheetRef.current.snapTo(2);

    renderItem;

    renderContent = () => (
        <View style={{backgroundColor: this.colors.surface, paddingHorizontal:16}}>
            <FlatList
                horizontal={false}
                numColumns={4}
                data={this.data}
                renderItem={({item})=>this.renderItem(item)}
                keyExtractor={item=> item}
            />
        </View>
    );

    getSnapPoints = () => {
        const fullHeight = Dimensions.get('window').height - getStatusBarHeight(false);
        let maxHeight = Math.min(fullHeight, (this.numRows) * this.rowHeight + 56);
        return [maxHeight, 0, -10000];
    };

    render() {
        return (
            <BottomSheet
                ref={this.bottomSheetRef}
                snapPoints={this.getSnapPoints()}
                initialSnap={2}
                renderContent={this.renderContent}
                renderHeader={() => (
                    <View style={[styles.panelHeader, {backgroundColor: this.colors.surface}]}>
                        <View style={styles.panelHandle}/>
                        <Text style={[styles.panelHeaderTitle, {color: this.colors.onSurface}]}>Select color</Text>
                    </View>
                )}
                onCloseEnd={() => this.close()}
            />
        )
    }
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

export default SelectorBottomSheet;





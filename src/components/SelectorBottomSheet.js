import React from 'react';
import {Dimensions, StyleSheet, Text, View, FlatList} from 'react-native';
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
        this.sheetTitle = 'Select';
        this.fullHeight = Dimensions.get('window').height - getStatusBarHeight(false);
        this.snapPoints = null;
    }

    open = () => {
        this.props.closeAll(this);
        this.bottomSheetRef.current.snapTo(1);
    };

    close = () => {
        this.bottomSheetRef.current.snapTo(3);
    };

    renderItem;

    renderContent = () => (
        <View style={{backgroundColor: this.colors.surface, paddingHorizontal:16, height: this.numRows * this.rowHeight}}>
            <FlatList
                numColumns={4}
                data={this.data}
                renderItem={({item})=>this.renderItem(item)}
                keyExtractor={item=> item}
            />
        </View>
    );

    getSnapPoints = () => {
        if (this.snapPoint) return this.snapPoints;
        let maxHeight = Math.min(this.fullHeight, (this.numRows) * this.rowHeight + 56);
        let intermediate = this.fullHeight * .4;
        let snapPoints;
        if (intermediate >= maxHeight) {
            snapPoints = [maxHeight, maxHeight, 0, -10000];
        } else {
            snapPoints = [maxHeight, intermediate, 0, -10000];
        }
        this.snapPoints= snapPoints;
        return snapPoints;
    };

    render() {
        return (
            <BottomSheet
                ref={this.bottomSheetRef}
                snapPoints={this.getSnapPoints()}
                initialSnap={3}
                renderContent={this.renderContent}
                renderHeader={() => (
                    <View style={[styles.panelHeader, {backgroundColor: this.colors.surface}]}>
                        <View style={styles.panelHandle}/>
                        <Text style={[styles.panelHeaderTitle, {color: this.colors.onSurface}]}>{this.sheetTitle}</Text>
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





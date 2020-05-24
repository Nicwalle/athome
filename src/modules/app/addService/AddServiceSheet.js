import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import AddServiceListItem from './AddServiceListItem';
import BottomSheet from 'reanimated-bottom-sheet'
import Icon from 'react-native-vector-icons';
import {withTheme} from 'react-native-paper';

class AddServiceSheet extends React.Component{

    constructor(props) {
        super(props);
        this.bottomSheetRef = React.createRef();
        this.colors = this.props.theme.colors
    }

    mock = [
        {name: "Netatmo", icon: 'netatmo'},
        {name: "Smart Curtains", icon: 'smart-curtains'},
        {name: "Philips Hue", icon: 'philips-hue'},
        {name: "Smart Life", icon: 'smartlife'}
    ];

    open = () => {
        this.bottomSheetRef.current.snapTo(1);
    };

    renderContent = () => (
        <View style={{...styles.panel, backgroundColor: this.colors.surface}}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
            <FlatList
                data={this.mock}
                renderItem={({ item }) => <AddServiceListItem service={item} color={this.colors.onSurface}/>}
                keyExtractor={item => item.name}
            />
        </View>
    );

    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <BottomSheet
                ref={this.bottomSheetRef}
                snapPoints= {['80%', 300, 0]}
                initialSnap={2}
                renderContent={this.renderContent}
                borderRadius={30}
            />
        );
    }
}


const styles = StyleSheet.create({
    panel: {
        height: 700,
        paddingTop: 16,
    },
    header: {
        height:20,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 6,
        borderRadius: 4,
        backgroundColor: '#FFFFFF40',
        marginBottom: 10,
    },
    listItem: {
    }
});

export default withTheme(AddServiceSheet)

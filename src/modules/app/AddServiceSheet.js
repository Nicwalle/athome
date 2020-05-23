import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import AddServiceListItem from './AddServiceListItem';
import BottomSheet from 'reanimated-bottom-sheet'
import Icon from 'react-native-vector-icons';
import {withTheme} from 'react-native-paper';

class AddServiceSheet extends React.Component{

    constructor(props) {
        super(props);
        this.bottomSheetRef = React.createRef();
    }

    state = {
        sheetView: false
    };



    mock = [
        {
            "name": "Philips Hue",
            "icon": "https://firebasestorage.googleapis.com/v0/b/nicwalle-athome.appspot.com/o/available-services%2Fhue.png?alt=media"
        },
        {
            "name": "Curtains",
            "icon": "https://firebasestorage.googleapis.com/v0/b/nicwalle-athome.appspot.com/o/available-services%2Fcurtains.png?alt=media"
        },
        {
            "name": "dd Hue",
            "icon": "https://firebasestorage.googleapis.com/v0/b/nicwalle-athome.appspot.com/o/available-services%2Fhue.png?alt=media"
        },
        {
            "name": "ddd",
            "icon": "https://firebasestorage.googleapis.com/v0/b/nicwalle-athome.appspot.com/o/available-services%2Fcurtains.png?alt=media"
        }
    ];

    open = () => {
        this.bottomSheetRef.current.snapTo(1);
    };

    renderHeader = () => (
        <View style={{...styles.header, backgroundColor: this.props.theme.colors.surface}}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );

    renderInner = () => (
        <View style={{...styles.panel, backgroundColor: this.props.theme.colors.surface}}>
            <Text style={{color: this.props.theme.colors.onSurface}}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid cumque deleniti dolore eos exercitationem id, illum laborum maxime mollitia nobis odio quidem quod repellat reprehenderit sit unde veritatis voluptas.
            </Text>
        </View>
    );

    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <BottomSheet
                ref={this.bottomSheetRef}
                snapPoints= {['80%', 300, 0]}
                initialSnap={2}
                renderContent={this.renderInner}
                renderHeader={this.renderHeader}
            />
        );
    }
}


const styles = StyleSheet.create({
    panel: {
        height: 700,
        padding: 20,
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
    }
});

export default withTheme(AddServiceSheet)

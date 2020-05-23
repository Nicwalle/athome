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
            <View style={styles.container}>
            <BottomSheet
                ref={this.bottomSheetRef}
                snapPoints= {['50%', '10%', 0]}
                initialSnap={2}
                renderContent={this.renderInner}
                renderHeader={this.renderHeader}
            />
            </View>
        );
    }
}

const IMAGE_SIZE = 200;

const styles = StyleSheet.create({
    panel: {
        height: 600,
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
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#318bfb',
        alignItems: 'center',
        marginVertical: 10,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    photo: {
        width: '100%',
        height: 225,
        marginTop: 30,
    },
    map: {
        height: '100%',
        width: '100%',
    },
});

export default withTheme(AddServiceSheet)

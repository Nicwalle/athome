import React from 'react';
import {Text, View, FlatList} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import AddServiceListItem from './AddServiceListItem';
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import Icon from 'react-native-vector-icons';

export default class AddServiceSheet extends React.Component{

    state = {
        sheetView: false
    };

    styles = {
        addItemSheet: {
            container: {
                paddingHorizontal:16,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24
            }
        },
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

    addItemSheet;

    open = () => this.setState({sheetView: true});

    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        let facebook = <Icon family={'FontAwesome'} name={'facebook'} color={'#000000'} size={30} />;
        let instagram = <Icon family={'FontAwesome'} name={'instagram'} color={'#000000'} size={30} />;
        return (
            <RNBottomActionSheet.SheetView visible={this.state.sheetView} title={"Awesome!"} theme={"dark"} onSelection={(index, value) => {
                this.setState({sheetView: false})
                console.log("selection: " + index + " " + value);
            }}>
                <RNBottomActionSheet.SheetView.Item title={"Facebook"} subTitle={"Facebook Description"} icon={facebook} />
                <RNBottomActionSheet.SheetView.Item title={"Instagram"} subTitle={"Instagram Description"} icon={instagram} />
            </RNBottomActionSheet.SheetView>
        );
    }
}

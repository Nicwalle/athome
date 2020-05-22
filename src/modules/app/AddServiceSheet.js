import React from 'react';
import {Text, View, FlatList} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import AddServiceListItem from './AddServiceListItem';
import {ScrollView} from 'react-native-reanimated';

export default class AddServiceSheet extends React.Component{
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

    open = () => this.addItemSheet.open();

    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <RBSheet
                ref={ref => {
                    this.addItemSheet = ref;
                }}
                height={600}
                duration={300}
                animationType={'fade'}
                closeOnDragDown={false}
                customStyles={this.styles.addItemSheet}>
                <View style={{alignItems: 'center'}}>
                    <Text>Add a device</Text>
                </View>

                <FlatList
                    data={this.mock}
                    renderItem={({item}) => <AddServiceListItem service={item}/>}
                    keyExtractor={service => service.name}/>
            </RBSheet>
        );
    }
}

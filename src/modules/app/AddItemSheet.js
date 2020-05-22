import React from 'react';
import {Text, View, Image} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

export default class AddItemSheet extends React.Component{
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
            "icon": "hue.png"
        },
        {
            "name": "Curtains",
            "icon": "curtains.svg"
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
                closeOnDragDown={true}
                customStyles={this.styles.addItemSheet}>
                <View style={{alignItems: 'center'}}>
                    <Text>Add a device</Text>
                </View>
                <View>
                    {this.mock.map(device => <Image source={require('../../../images/hue.png')}/>)}
                </View>
            </RBSheet>
        );
    }
}

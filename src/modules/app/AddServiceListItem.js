import React from 'react';
import {Text, View, Image} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

export default class AddServiceListItem extends React.Component{
    styles = {
        main_container: {
            width: 150,
            padding: 0,
            flexDirection: 'column',
        },
        image: {
            width: 150,
            height: 150,
            backgroundColor: 'gray',
            resizeMode: 'contain'
        },
        content_container: {
            flex: 1,
            margin: 5
        },
        header_container: {
            flex: 3,
            flexDirection: 'row'
        },
        title_text: {
            fontWeight: 'bold',
            fontSize: 20,
            flex: 1,
            flexWrap: 'wrap',
        }
    };

    render() {
        return (
            <View style={this.styles.main_container}>
                <Image
                    style={this.styles.image}
                    source={{uri: this.props.service.icon}}
                />
                <Text style={this.styles.title_text}>{this.props.service.name}</Text>
            </View>
        );
    }
}

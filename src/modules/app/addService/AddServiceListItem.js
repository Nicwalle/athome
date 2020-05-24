import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ServiceIcon from './ServiceIcon';
import {TouchableRipple} from 'react-native-paper';

class AddServiceListItem extends React.Component{
    constructor(props) {
        super(props);
        styles.title = {
            ...styles.title,
            color: this.props.color
        };
        styles.description = {
            ...styles.description,
            color: this.props.color,
            opacity: 0.5
        };
    }

    render() {
        return (
            <TouchableRipple onPress={() => console.log("Clicked", this.props.service.name)}>
            <View style={styles.itemView}>
                <ServiceIcon name={this.props.service.icon} color={this.props.color} size={32}/>
                <View style={styles.textView}>
                    <Text style={styles.title}>{this.props.service.name}</Text>
                    <Text style={styles.description}>{this.props.service.name}</Text>
                </View>
            </View>
            </TouchableRipple>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize:18
    },
    description: {
        fontSize: 12
    },
    textView: {
        flexDirection: 'column',
        marginLeft: 16
    },
    itemView: {
        flex: 1,
        flexDirection:'row',
        alignItems: 'center',
        height:56,
        paddingLeft: 24,
        paddingRight: 24,
    }
});

export default AddServiceListItem;

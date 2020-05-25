import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ServiceIcon from './ServiceIcon';
import {TouchableRipple} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

function AddServiceListItem ({service, color}) {
    const navigation = useNavigation();
    styles.title = {
        ...styles.title,
        color
    };
    styles.description = {
        ...styles.description,
        color,
        opacity: 0.5
    };

    return (
        <TouchableRipple onPress={() => navigation.navigate(service.configScreen)}>
            <View style={styles.itemView}>
                <ServiceIcon name={service.icon} color={color} size={32}/>
                <View style={styles.textView}>
                    <Text style={styles.title}>{service.name}</Text>
                    <Text style={styles.description}>{service.description || service.name}</Text>
                </View>
            </View>
        </TouchableRipple>
    );
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

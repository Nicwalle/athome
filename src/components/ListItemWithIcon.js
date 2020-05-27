import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import CustomIcon from './customIcons/CustomIcon';
import {TouchableRipple} from 'react-native-paper';

function ListItemWithIcon ({icon, title, description, color, onClick}) {
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
        <TouchableRipple onPress={onClick}>
            <View style={styles.itemView}>
                <View style={{width:32}}>
                    <CustomIcon name={icon} color={color} size={32}/>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.title}>{title}</Text>
                    {description?<Text style={styles.description}>{description}</Text> : <></>}
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



export default ListItemWithIcon;

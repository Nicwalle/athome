import React from 'react';
import {Text, withTheme, ActivityIndicator, Colors, Button, IconButton} from 'react-native-paper';
import {StyleSheet, View, Image, Dimensions, FlatList} from 'react-native';
import {HueAPI} from './api/HueAPI';

import {getUser} from '../../utils/Authentication'
import {} from './utils/FireStore'
import firestore from '@react-native-firebase/firestore';
import AddServiceListItem from '../app/addService/AddServiceListItem';



class HueCreateWidgetListPage extends React.Component{

    constructor(props) {
        super(props);
        this.colors = props.theme.colors;
        this.state = {
            bridgeFound: false,
            bridgeAddress: null,
            bridgeDiscoveryError: false,
            username: null
        };
        let {apiAddress, username} = props.route.params;
        this.hueAPI = new HueAPI(apiAddress, username);
    }

    componentDidMount(): void {
        firestore()
            .collection('Services').doc('philips-hue').collection('Widgets')
            .get()
            .then(querySnapshot => {
                let widgets = [];
                querySnapshot.forEach(documentSnapshot => {
                    widgets.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id
                    })
                });
                this.setState({widgets})
            });
    }

    render () {
        return (
            <>
                <View style={styles.titleView}>
                    <IconButton
                        icon={'arrow-left'}
                        size={28}
                        onPress={() => this.props.navigation.popToTop()}
                        style={[styles.goBackButton]}
                    />
                    <Text style={[styles.titleText, {color: this.colors.onBackground}]}>Select widget</Text>
                </View>
                <FlatList
                    data={this.state.widgets}
                    renderItem={({item}) => <AddServiceListItem service={item} color={this.colors.onSurface}/>}
                    keyExtractor={item => item.key}
                />
            </>
        );
    }
}

const styles = StyleSheet.create({
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        flex:1
    },
    goBackButton: {
        position: 'absolute',
        zIndex: 5
    }
});

export default withTheme(HueCreateWidgetListPage)

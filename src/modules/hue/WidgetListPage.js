import React from 'react';
import {Text, withTheme, Button, TextInput} from 'react-native-paper';
import {StyleSheet, View, Image, Dimensions, FlatList} from 'react-native';

import {} from './utils/FireStore'
import firestore from '@react-native-firebase/firestore';
import ListItemWithIcon from '../../components/ListItemWithIcon';
import Empty from '../../../assets/images/empty.png'
import TitleViewWithBackButton from '../app/TitleViewWithBackButton';



class WidgetListPage extends React.Component{

    constructor(props) {
        super(props);
        this.colors = props.theme.colors;
        this.state = {
            bridgeFound: false,
            bridgeAddress: null,
            bridgeDiscoveryError: false,
            username: null
        };
        let {serviceID} = props.route.params;
        this.serviceID = serviceID
    }

    componentDidMount(): void {
        firestore()
            .collection('Services').doc(this.serviceID).collection('Widgets')
            .onSnapshot(this.handleFirebaseWidgets)
    }

    handleFirebaseWidgets = (querySnapshot) => {
        let widgets = [];
        querySnapshot.forEach(documentSnapshot => {
            widgets.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id
            })
        });
        this.setState({widgets})
    };

    renderItem = (item) => (
        <ListItemWithIcon
            title={item.name}
            description={item.description}
            icon={item.icon}
            color={this.colors.onSurface}
            onClick={() => {
                this.props.navigation.navigate(item.creationPage);
            }}
        />
    );

    emptyList = () => {
        const bridgeWidth = Dimensions.get('window').width * .8;
        const {width, height} = Image.resolveAssetSource(Empty);
        return (
            <View style={{flexGrow:1, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={Empty} style={{width:bridgeWidth, height: (height/width) * bridgeWidth}}/>
                <Text style={{marginTop: 32, fontSize: 24, textAlign: 'center'}}>No widgets available yet</Text>
                <Button icon="arrow-left" mode="outlined" onPress={() => this.props.navigation.goBack()} style={{marginTop: 36}}>
                    Go back
                </Button>
            </View>
        )
    };

    render () {
        return (
            <>
                <TitleViewWithBackButton title={'Select widget type'} onPress={() => this.props.navigation.popToTop()}/>
                <FlatList
                        data={this.state.widgets}
                        renderItem={({item}) => this.renderItem(item)}
                        keyExtractor={item => item.key}
                        ListEmptyComponent={this.emptyList}
                        style={{marginTop: 8}}
                        contentContainerStyle={{flexGrow:1}}
                    />
            </>
        );
    }
}

export default withTheme(WidgetListPage)

import React from 'react';
import {Text, View, StyleSheet, FlatList, Dimensions} from 'react-native';
import ListItemWithIcon from '../../../components/ListItemWithIcon';
import BottomSheet from 'reanimated-bottom-sheet'
import {withTheme} from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import firestore from '@react-native-firebase/firestore';

class AddServiceSheet extends React.Component{

    constructor(props) {
        super(props);
        this.bottomSheetRef = React.createRef();
        this.colors = this.props.theme.colors;
        this.fullHeight = Dimensions.get('window').height - getStatusBarHeight(false);
    }

    componentDidMount(): void {
        this.loadAvailableServices()
    }

    loadAvailableServices = () => {
        firestore()
            .collection('Services')
            .onSnapshot(querySnapshot => {
                let availableServices = [];
                if (querySnapshot !== null) querySnapshot.forEach(documentSnapshot => {
                    availableServices.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id
                    })
                });
                this.setState({availableServices})
            });
    };

    state = {
        availableServices: []
    };

    open = () => {
        if (this.state.availableServices.length === 0) this.loadAvailableServices();
        this.bottomSheetRef.current.snapTo(1);
    };

    close = () => this.bottomSheetRef.current.snapTo(2);

    renderItem = (item) => (

            <ListItemWithIcon
                title={item.name}
                description={item.description}
                icon={item.icon}
                color={this.colors.onSurface}
                onClick={() => {
                    this.props.navigation.navigate('WidgetListPage', {
                        serviceID: item.key
                    });
                    this.close();
                }}
            />
        );

    renderContent = () => {
        return (
            <View style={[styles.panel, {
                backgroundColor: this.colors.surface,
                height: this.state.availableServices.length * 56
            }]}>
                <FlatList
                    data={this.state.availableServices}
                    renderItem={
                        ({item}) => this.renderItem(item)
                    }
                    keyExtractor={item => item.key}
                />
            </View>
        );
    }

    renderHeader = () => (
        <View style={[styles.panelHeader, {backgroundColor: this.colors.surface}]}>
            <View style={styles.panelHandle} />
            <Text style={[styles.panelHeaderTitle, {color: this.colors.onSurface}]}>Select service</Text>
        </View>
    );

    render() {
        let maxHeight = Math.min(this.fullHeight, (this.state.availableServices.length + 1) * 56);
        let fortyPercent = this.fullHeight * .4;
        let snapPoints;
        if (fortyPercent >= maxHeight) {
            snapPoints = [maxHeight, maxHeight, 0, -10000];
        } else {
            snapPoints = [maxHeight, fortyPercent, 0, -10000];
        }
        return (
            <BottomSheet
                ref={this.bottomSheetRef}
                snapPoints= {snapPoints}
                initialSnap={3}
                renderContent={this.renderContent}
                renderHeader={this.renderHeader}
            />
        );
    }
}


const styles = StyleSheet.create({
    panel: {
    },
    panelHeaderTitle: {
        fontSize:16,
        marginBottom: 8,
        marginTop: 8,
    },
    panelHeader: {
        backgroundColor: 'black',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        minHeight:30,
    },
    panelHandle: {
        width: 40,
        height: 6,
        borderRadius: 4,
        backgroundColor: '#FFFFFF40',
        marginTop: 12,
    },
});

export default withTheme(AddServiceSheet)

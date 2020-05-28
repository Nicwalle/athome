import React from 'react';
import {withTheme, IconButton, TextInput, Text, TouchableRipple} from 'react-native-paper';
import {StyleSheet, View, ScrollView} from 'react-native';
import {} from './utils/FireStore';
import TitleViewWithBackButton from '../app/TitleViewWithBackButton';
import MockUnitWidget from '../../components/MockUnitWidget';
import ToggleWidget from '../../components/ToggleWidget';
import IncrementInput from '../../components/IncrementInput';
import GradientSelectorButton from '../../components/GradientSelectorButton';
import GradientSelectorBottomSheet from '../../components/GradientSelectorBottomSheet';
console.log(GradientSelectorBottomSheet);
class CreateHueToggleWidget extends React.Component{

    constructor(props) {
        super(props);
        this.colors = props.theme.colors;
        this.gradients = props.theme.gradients;
        this.state = {
            widget: {
                name: 'My button',
                color: 'orange',
                icon: 'power',
                isOn: true,
                width: 1
            },
            showGradientSelectorSheet: false,
            showIconSelectorSheet: false
        };
        this.gradientSelectorBottomSheet = React.createRef();
    }

    updateWidget = (newState) => this.setState({
        widget: {
            ...this.state.widget,
            ...newState
        }
    });

    render () {
        return (
            <>
                <TitleViewWithBackButton title={'Create Lights Toggle'}/>
                <View style={{alignItems: 'center', marginHorizontal:8, marginVertical:24}}>
                    <Text style={{marginBottom:8}}>Preview in the grid (clickable)</Text>
                    <View style={{flexDirection: 'row'}}>
                        {this.state.widget.width<3 ? <MockUnitWidget/> : <></>}
                        <ToggleWidget {...this.state.widget}/>
                        {this.state.widget.width<2 ? <MockUnitWidget/> : <></>}
                    </View>
                </View>
                <ScrollView style={{ marginHorizontal:16}}>
                    <TextInput
                        mode={'outlined'}
                        label='Widget name'
                        value={this.state.name}
                        onChangeText={name => this.updateWidget({name})}
                    />
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:16}}>
                        <Text style={{fontSize:18}}>Width on the grid:</Text>
                        <IncrementInput min={1} value={this.state.widget.width} max={3}
                            onPlus={() => this.updateWidget({width: this.state.widget.width+1})}
                            onMinus={() => this.updateWidget({width: this.state.widget.width-1})}
                            />
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:16}}>
                        <Text style={{fontSize:18}}>Button color:</Text>
                        <GradientSelectorButton
                            onPress={() => this.gradientSelectorBottomSheet.current.open()}
                            color={this.state.widget.color}
                        />
                    </View>
                </ScrollView>
                <GradientSelectorBottomSheet
                    onColor={newColor => this.updateWidget({color:newColor})}
                    color={this.state.widget.color}
                    ref={this.gradientSelectorBottomSheet}
                    data={Object.keys(this.gradients)}
                />
            </>
        );
    }
}

export default withTheme(CreateHueToggleWidget)

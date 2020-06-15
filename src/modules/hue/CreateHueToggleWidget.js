import React from 'react';
import {withTheme, IconButton, TextInput, Text, List} from 'react-native-paper';
import {FlatList, View, ScrollView} from 'react-native';
import {} from './utils/FireStore';
import TitleViewWithBackButton from '../../components/TitleViewWithBackButton';
import MockUnitWidget from '../../components/MockUnitWidget';
import ToggleWidget from '../../components/ToggleWidget';
import IncrementInput from '../../components/IncrementInput';
import GradientSelectorButton from '../../components/GradientSelectorButton';
import GradientSelectorBottomSheet from '../../components/GradientSelectorBottomSheet';
import HueIconSelectorBottomSheet from '../../components/HueIconSelectorBottomSheet';
import HueIconSelectorButton from '../../components/HueIconSelectorButton';
import CustomIcon from '../../components/customIcons/CustomIcon';
import CheckBox from '@react-native-community/checkbox';
import {connect} from 'react-redux';
import {HueAPI} from './api/HueAPI';
import {saveWidget} from './utils/FireStore';
import {getUser} from '../../utils/Authentication';

class CreateHueToggleWidget extends React.Component{

    constructor(props) {
        super(props);
        this.colors = props.theme.colors;
        this.gradients = props.theme.gradients;
        this.state = {
            widget: {
                service: 'philips-hue',
                type: 'toggle',
                name: 'My button',
                color: 'orange',
                icon: 'power',
                isOn: true,
                width: 1,
                groups: {}, // IDs of the groups
                lights: {},   // IDs of the bulbs
                bridgeID: undefined
            },
            groups: [],
            lights: [],
            showGradientSelectorSheet: false,
            showIconSelectorSheet: false
        };

        this.references = {
            gradientSelectorBottomSheet: React.createRef(),
            hueIconSelectorBottomSheet: React.createRef()
        };
        this.hueAPI = null;
    }

    componentDidMount(): void {
        if (Object.keys(this.props.bridges).length === 0) {
            this.props.navigation.navigate("BridgeConfigPage")
        } else if(Object.keys(this.props.bridges).length) {
            this.updateWidget({bridgeID: Object.keys(this.props.bridges)[0]}, this.initAccordion);
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (this.hueAPI === null) {
            this.updateWidget({bridgeID: Object.keys(this.props.bridges)[0]}, this.initAccordion);
        }
    }

    initAccordion = () => {
        this.hueAPI = new HueAPI(
            this.props.bridges[this.state.widget.bridgeID].bridgeAddress,
            this.props.bridges[this.state.widget.bridgeID].username
        );
        this.hueAPI.getLights()
            .then(lights => lights.map(bulb => ({...bulb, selected:false})))
            .then(lights => {
                this.setState({lights})
            });
        this.hueAPI.getGroups()
            .then(groups => groups.map(group => ({...group, selected:false})))
            .then(groups => {
                this.setState({groups})
            });
    };

    updateWidget = (newState, callback = ()=>{}) =>
        this.setState({
            widget: {
                ...this.state.widget,
                ...newState
            }
        }, callback);

    addSelectedLight = (value, id, index, lightType = 'lights') => {
        const newState = {...this.state};
        if (value) {
            newState.widget[lightType][id] = true;
        } else {
            delete newState.widget[lightType][id];
        }
        newState[lightType][index].selected = value;
        this.setState(newState);
    };

    closeAll = (current) => {
        for (let key in this.references) {
            if (this.references[key].current !== current) {
                this.references[key].current.close()
            }
        }
    };

    renderLightsList = (list, onChange, lightsType) => {
        return list.map(
            (light, index) => {
                let title = light.name;
                if (lightsType === 'groups') title += ` (${light.lights.length} lights)`;
                return <List.Item
                    key={light.id}
                    title={title}
                    left={() =>{
                        return <CheckBox
                            value={light.selected}
                            onValueChange={(value) => onChange(value, light.id, index, lightsType)}
                            style={{color:'red'}}
                            tintColors={{true: this.colors.primary, false: this.colors.onSurface}}
                        />
                    }}
                />
            });
    };

    render () {
        return (
            <>
                <TitleViewWithBackButton title={'Create Lights Toggle'} rightIcon={'check'} rightAction={()=>saveWidget(getUser().uid, this.state.widget)}/>
                <View style={{alignItems: 'center', marginHorizontal:8, marginVertical:24}}>
                    <Text style={{marginBottom:8}}>Preview in the grid (clickable)</Text>
                    <View style={{flexDirection: 'row'}}>
                        {this.state.widget.width<3 ? <MockUnitWidget/> : <></>}
                        <ToggleWidget {...this.state.widget}/>
                        {this.state.widget.width<2 ? <MockUnitWidget/> : <></>}
                    </View>
                </View>

                <ScrollView style={{ paddingHorizontal:16}}>

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
                        <Text style={{fontSize:18}}>Color:</Text>
                        <GradientSelectorButton
                            onPress={() => this.references.gradientSelectorBottomSheet.current.open()}
                            color={this.state.widget.color}
                        />
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:16}}>
                        <Text style={{fontSize:18}}>Icon:</Text>
                        <HueIconSelectorButton
                            onPress={() => this.references.hueIconSelectorBottomSheet.current.open()}
                            icon={this.state.widget.icon}
                        />
                    </View>


                    <View style={{flexDirection:'column', marginTop:16}}>
                        <Text style={{fontSize:18}}>Select light(s):</Text>
                        <Text style={{fontSize:10, color: '#a6a6a6'}}>Selecting a group automatically includes all its lights</Text>
                        <List.Section>

                            <List.Accordion
                                title="Lights"
                                left={props => <CustomIcon {...props} style={{width:32, marginRight:8}} size={32} name={'hue-bulb'}/>}>
                                {this.renderLightsList(this.state.lights, this.addSelectedLight, 'lights')}
                            </List.Accordion>

                            <List.Accordion
                                title="Groups"
                                left={props => <CustomIcon {...props} style={{width:32, marginRight:8}} size={32} name={'hue-group'}/>}>
                                {this.renderLightsList(this.state.groups, this.addSelectedLight, 'groups')}
                            </List.Accordion>

                        </List.Section>
                    </View>

                </ScrollView>
                <GradientSelectorBottomSheet
                    onItem={newColor => this.updateWidget({color:newColor})}
                    currentItem={this.state.widget.color}
                    ref={this.references.gradientSelectorBottomSheet}
                    data={Object.keys(this.gradients)}
                    closeAll={(current)=>this.closeAll(current)}
                />
                <HueIconSelectorBottomSheet
                    onItem={newIcon => this.updateWidget({icon:newIcon})}
                    currentItem={this.state.widget.icon}
                    ref={this.references.hueIconSelectorBottomSheet}
                    data={hueIcons}
                    closeAll={(current)=>this.closeAll(current)}
                />
            </>
        );
    }
}

const hueIcons = [
    'power','heroesBloom','archetypesWallLantern','archetypesDeskLamp','roomsLiving','roomsCarport','roomsCloset','roomsComputer','roomsDining','roomsDriveway','roomsFrontdoor','roomsGarage','roomsGuestroom','roomsGym','roomsHallway','roomsKidsbedroom','roomsKitchen','roomsLaundryroom','roomsLiving1','roomsLounge','roomsMancave','roomsNursery','roomsOffice','roomsOther','roomsOutdoor','roomsOutdoorSocialtime','roomsPool','roomsPorch','roomsRecreation','roomsSocialtime','roomsStaircase','roomsStorage','roomsStudio','roomsTerrace','roomsToilet','routinesComingHome','routinesDaytime','routinesGoToSleep','routinesHomeAway','routinesLeavingHome','routinesLocation','routinesNighttime','routinesSunrise','tabbarExplore','otherChristmasTree','otherFire','otherHeart','otherMusic','otherReading','otherWatchingMovie','roomsBalcony','roomsBathroom',
];

const mapStateToProps = (state) => {
    return {
        bridges: state.bridges
    };
};

export default connect(mapStateToProps)(withTheme(CreateHueToggleWidget))

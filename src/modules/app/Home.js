import React from 'react';
import {TitleView} from './TitleView';
import {RefreshControl, ScrollView} from 'react-native';
import {CurtainsModule} from '../curtains/CurtainsModule';
import {HueModule} from '../hue/HueModule';
export default class Home extends React.Component{

    constructor() {
        super();
        this.state = {
            refreshing: false
        };
    }

    curtainsModule;

    onRefresh = () => {
        this.setState({refreshing: true});
        this.curtainsModule.refresh()
            .then(() => this.setState({refreshing: false}))
            .catch((error => console.log(error)))
        ;
    };

    render () {
        return (
            <>
                <TitleView/>
                <ScrollView
                            style={{flex: 1, flexDirection:'column', margin:16}}
                            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}>
                    <CurtainsModule ref={(ref) => this.curtainsModule = ref}/>
                    <HueModule/>
                </ScrollView>
            </>
        );
    }
}

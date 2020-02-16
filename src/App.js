/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {EmptyView} from './components/EmptyView';
import {TitleView} from './components/TitleView';
import {ScrollView, RefreshControl} from 'react-native';
import BigSlider from './components/BigSlider';
import {Button, Text} from 'react-native-paper';
import CurtainsSlider from './components/CurtainsSlider';

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            refreshing: false
        };
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        this.refs.curtainsSlider.refresh()
            .then(() => this.setState({refreshing: false}))
            .catch((error => console.log(error)))
        ;
    };

    render() {
        return (
            <>
                <TitleView/>
                <ScrollView
                    style={{flex: 1, flexDirection:'column', margin:16}}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                    }
                >
                    <CurtainsSlider ref={'curtainsSlider'}/>
                </ScrollView>
            </>
        );
    }
}

export default App;

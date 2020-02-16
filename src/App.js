/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {EmptyView} from './EmptyView';
import {TitleView} from './TitleView';
import {ScrollView, RefreshControl} from 'react-native';
import BigSlider from './components/curtainsSlider/BigSlider';
import {Button, Text} from 'react-native-paper';
import CurtainsSlider from './components/curtainsSlider/CurtainsSlider';
import {CurtainsModule} from './modules/curtainsModule';

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
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
                >
                    <CurtainsModule/>
                </ScrollView>
            </>
        );
    }
}

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {TitleView} from './TitleView';
import {ScrollView, RefreshControl} from 'react-native';
import {CurtainsModule} from './modules/CurtainsModule';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            refreshing: false
        };
    }

    onRefresh = () => {
        /*
        this.setState({refreshing: true});
        this.refs.curtainsModule.refresh()
            .then(() => this.setState({refreshing: false}))
            .catch((error => console.log(error)))
        ;
         */
    };

    render() {
        return (
            <>
                <TitleView/>
                <ScrollView
                    style={{flex: 1, flexDirection:'column', margin:16}}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
                >
                    <CurtainsModule ref={'curtainsModule'}/>
                </ScrollView>
            </>
        );
    }
}

export default App;

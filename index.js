/**
 * @format
 */

import * as React from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

export default function Main() {
    const theme = {
        ...DefaultTheme
    };
    return (
        <PaperProvider theme={theme}>
            <StatusBar backgroundColor={'#efefef'} barStyle={'dark-content'} />
            <App />
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);

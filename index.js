import 'react-native-gesture-handler';

import * as React from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import App from './src/App';
import {name as appName} from './app.json';
import {DefaultTheme, DarkTheme, Provider as PaperProvider} from 'react-native-paper';



export default function Main() {
    const theme = {
        ...DarkTheme,
        dark:true
    };
    return (
        <PaperProvider theme={theme}>
            <StatusBar barStyle={'dark-content'} />
            <App theme={theme}/>
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);

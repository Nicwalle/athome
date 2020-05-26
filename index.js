import 'react-native-gesture-handler';

import * as React from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {DefaultTheme, DarkTheme, Provider as PaperProvider} from 'react-native-paper';



export default function Main() {
    const theme = {
        ...DarkTheme,
        dark:true,
        mode:'adaptive',
        colors: {
            ...DarkTheme.colors,
            background: '#202125',
            onBackground: '#EAEAEA',
            surface: '#37383C',
            surface2: '#47484d',
            primary: '#FFC107'
        }
    };

    return (
        <PaperProvider theme={theme}>
            <StatusBar barStyle={'light-content'} backgroundColor={theme.colors.background} />
            <App/>
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);

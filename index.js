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
        },
        gradients: {
            pinkToBlue: ['#43CBFF', '#9708CC'],
            purpleToBlue: ['#C544FC', '#5B56D7'],
            lightBlue: ['#53eefc', '#5BC9FA'],
            orange: ['#e2aa02', '#FF9000'],
            amber: ['#FE9401', '#FF6E00'],
            darkPink: ['#FE2676', '#FF2D59'],
            blue: ['#00B8FF', '#027BFE'],
            green: ['#8bd8aa', '#1AB639'],
            red: ['#FE3A2F', '#E70401'],
            pink: ['#f695df', '#D939CD'],
            yellowToPink: ['#FFF3B0', '#CA26FF'],
            teal: ['#79F1A4', '#108dad']
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

import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import HomePage from '../modules/app/HomePage';
import BridgeConfigPage from '../modules/hue/BridgeConfigPage';
import HueCreateWidgetListPage from '../modules/hue/HueCreateWidgetListPage';

export default class Navigation extends React.Component{
    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <NavigationContainer theme={this.props.theme}>
                <Stack.Navigator>
                    <Stack.Screen name={"HomePage"} component={HomePage} options={{
                        headerShown: false
                    }}/>
                    <Stack.Screen name={"BridgeConfigPage"} component={BridgeConfigPage} options={{
                        headerShown: false
                    }}/>
                    <Stack.Screen name={"HueCreateWidgetListPage"} component={HueCreateWidgetListPage} options={{
                        headerShown: false
                    }}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }


}

const Stack = createStackNavigator();

import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import HomePage from '../app/HomePage';
import HueConfigPage from '../hue/HueConfigPage';

export default class Navigation extends React.Component{
    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <NavigationContainer theme={this.props.theme}>
                <Stack.Navigator>
                    <Stack.Screen name={"HomePage"} component={HomePage} options={{
                        headerShown: false
                    }}/>
                    <Stack.Screen name={"HueConfigPage"} component={HueConfigPage} options={{
                        headerShown: false
                    }}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }


}

const Stack = createStackNavigator();

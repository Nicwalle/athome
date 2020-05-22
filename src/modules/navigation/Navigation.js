import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Home from '../app/Home';

export default class Navigation extends React.Component{
    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <NavigationContainer theme={this.props.theme}>
                <Stack.Navigator>
                    <Stack.Screen name={"Home"} component={Home} options={{
                        headerShown: false
                    }}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }


}

const Stack = createStackNavigator();

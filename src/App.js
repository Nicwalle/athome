import React from 'react';
import Navigation from './modules/navigation/Navigation';
import {withTheme} from 'react-native-paper';

class App extends React.Component {

    render() {
        return (
            <Navigation theme={this.props.theme}/>
        );
    }
}

export default withTheme(App);

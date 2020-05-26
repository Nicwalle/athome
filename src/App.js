import React from 'react';
import Navigation from './navigation/Navigation';
import {withTheme} from 'react-native-paper';
import {authenticateUser} from './utils/Authentication'

class App extends React.Component {

    componentDidMount() {
        authenticateUser().done();
    }

    render() {
        return (
            <Navigation theme={this.props.theme}/>
        );
    }
}

export default withTheme(App);

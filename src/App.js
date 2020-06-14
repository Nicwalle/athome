import React from 'react';
import Navigation from './navigation/Navigation';
import {withTheme} from 'react-native-paper';
import {authenticateUser} from './utils/Authentication'
import {Provider} from 'react-redux';
import HueBridgeStore from './modules/hue/store/configureStore';

class App extends React.Component {

    componentDidMount() {
        authenticateUser().done();
    }

    render() {
        return (
            <Provider store={HueBridgeStore}>
                <Navigation theme={this.props.theme}/>
            </Provider>
        );
    }
}

export default withTheme(App);

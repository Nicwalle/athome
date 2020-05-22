import React from 'react';
import Navigation from './modules/navigation/Navigation';

class App extends React.Component {

    render() {
        return (
            <Navigation theme={this.props.theme}/>
        );
    }
}

export default App;

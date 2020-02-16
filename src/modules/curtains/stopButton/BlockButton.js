import {StyleSheet, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import TouchableRipple from 'react-native-paper/src/components/TouchableRipple/index';



class BlockButton extends React.Component {

    refresh = () => this.getCurrentState();

    constructor() {
        super();
        this.state = {
            loaded:false
        };
    }



    render () {
        return (
            <>
                {!this.props.disabled
                    ?<TouchableRipple style={{ ...styles.button, backgroundColor: this.props.backgroundColor }} onPress={this.props.onPress}>
                        <Icon name={this.props.icon} size={24} color={this.props.color} />
                    </TouchableRipple>
                    :<View style={{ ...styles.button, backgroundColor: 'rgb(173,178,182)' }} onPress={()=>{}}>
                        <Icon name={this.props.icon} size={24} color={this.props.color} />
                    </View>
                }
            </>
        );
    }
}

BlockButton.defaultProps = {
    backgroundColor: '#f44336',
    icon: 'rocket',
    color: '#fff',
    onPress: () => {},
    disabled: false
};

const styles = StyleSheet.create({
    button: {
        flex:1,
        height: 50,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default BlockButton;

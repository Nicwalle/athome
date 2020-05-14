import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TouchableRipple from 'react-native-paper/src/components/TouchableRipple/index';

class BlockButton extends React.Component {

    constructor() {
        super();
    }



    render () {
        return (
            <>
                {!this.props.disabled
                    ?<TouchableOpacity style={{ ...styles.button, backgroundColor: this.props.backgroundColor }} onPress={this.props.onPress} onPressIn={this.props.onPressIn}>
                        <Icon name={this.props.icon} size={24} color={this.props.color} />
                    </TouchableOpacity>
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

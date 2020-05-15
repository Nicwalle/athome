import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'react-native-paper';
class BlockButton extends React.Component {

    constructor() {
        super();
    }



    render () {
        const colors = !this.props.gradientColors ? [this.props.backgroundColor, this.props.backgroundColor] : this.props.gradientColors;
        return (
            <>
                {!this.props.disabled
                    ?<TouchableOpacity style={{ ...styles.button }} onPress={this.props.onPress} onPressIn={this.props.onPressIn}>
                        <LinearGradient colors={colors} style={{...styles.button}} start={{x:0.0, y:0.5}} end={{x:1.0, y: 0.5}}>
                            <Icon name={this.props.icon} size={24} color={this.props.color} />
                            {this.props.text!==''?<Text style={{marginLeft: 8, color: this.props.color}}>{this.props.text}</Text>:<></>}
                        </LinearGradient>
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
    gradientColors: null,
    icon: 'rocket',
    color: '#fff',
    disabled: false,
    text: ''
};

const styles = StyleSheet.create({
    button: {
        flex:1,
        height: 50,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
});

export default BlockButton;

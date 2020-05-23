/**
 * @providesModule %BigSlider
 * @flow
 */

import React, { Component } from 'react';
import {
    Animated,
    PanResponder,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import {withTheme} from 'react-native-paper';

class BigSlider extends Component {
    static defaultProps = {
        value: 0,
        maximumValue: 4000,
        minimumValue: 0,
        onSlidingStart: () => {}
    };

    constructor(props) {
        super();
        this.state = {
            value: props.value,
            range: props.maximumValue - props.minimumValue
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                this.props.onSlidingStart();
                this.setState({ anchorValue: this.state.value })
            },
            onPanResponderMove: Animated.event([null, {}], { listener: this.handleSlide, useNativeDriver: false }),
            onPanResponderRelease: () => {
                this.props.onSlidingComplete()
            },
        })
    }

    slideTo = (value) => {
        this.setState({value})
    };

    setExtrema = (min, max) => {
        this.setState({
            minimumValue: min,
            maximumValue: max,
            range: max - min
        })
    };

    onLayout = ({ nativeEvent }) => {
        this.setState({
            width: nativeEvent.layout.width,
            height: nativeEvent.layout.height,
        })
    };

    handleSlide = (evt, gestureState) => {
        const { maximumValue, minimumValue } = this.props;
        let valueIncrement = (gestureState.dx * this.state.range) / (this.state.width * 0.75);
        let nextValue = this.state.anchorValue + valueIncrement;
        nextValue = nextValue >= maximumValue ? maximumValue : nextValue;
        nextValue = nextValue <= minimumValue ? minimumValue : nextValue;

        this.props.onValueChange(nextValue);
        this.setState({ value: nextValue })
    };

    render () {
        const value = this.state.value;
        let unitValue = (value - this.props.minimumValue) / this.state.range + 0.1 * (this.state.range - value)/this.state.range;
        return (
            <View
                onLayout={this.onLayout}
                style={[styles.container, this.props.style, {backgroundColor: this.props.theme.colors.surface2}]}
                {...this.panResponder.panHandlers}>
                <View style={[styles.track, { flex: unitValue }, this.props.trackStyle]}>
                    {unitValue > 0.4 && this.props.leftImage
                        ?
                        <Image
                            source={this.props.leftImage}
                            style={{ ...styles.leftImage, opacity: (unitValue - 0.4) * 5,  resizeMode: 'contain' }}
                        />
                        :<View style={{width: ((unitValue-0.1)/0.4)*130}}/>
                    }
                    {this.props.renderLabel
                        ? this.props.renderLabel()
                        : <View style={styles.trackLabel}>
                            <Text style={styles.trackLabelText}>
                                {this.props.label || `${formatNumber(this.props.value)}%`}
                            </Text>
                        </View>
                    }
                    <View style={styles.thumb} />
                </View>
                <View style={[styles.pendingTrack, { flex: 1 - unitValue }]}>
                    {unitValue < 0.6 && this.props.rightImage
                        ?<Image
                            source={this.props.rightImage}
                            style={{ ...styles.rightImage, opacity: (0.6 - unitValue) * 5, resizeMode: 'contain'}}
                        />
                        :<View/>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        overflow: 'hidden',
        height: 80
    },
    pendingTrack: {
        flexDirection:'row-reverse'
    },
    track: {
        flex: 1,
        backgroundColor: 'rgb(1, 160, 188)',
        borderRadius: 16,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center'
    },
    trackLabel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: -12
    },
    trackLabelText: {
        color: 'white',
        fontWeight: '600',
    },
    thumb: {
        backgroundColor: 'rgba(0,0,0,.5)',
        borderRadius: 16,
        height: 36,
        width: 4,
        marginRight: 6,
        alignSelf: 'center',
    },
    rightImage: {
        margin: 20,
        aspectRatio: 1,
        width: 60,
    },
    leftImage: {
        marginVertical: 10,
        marginHorizontal: 20,
        aspectRatio: 1,
        width: 60
    }
});

function formatNumber (x) {
    return x.toFixed(1).replace(/\.?0*$/, '')
}

export default withTheme(BigSlider)

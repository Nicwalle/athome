import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ActivityIndicator, Colors, withTheme} from 'react-native-paper';

class LoadingCurtainsSlider extends React.Component {

    render () {
        return (
            <View
                onLayout={this.onLayout}
                style={[styles.container, this.props.style]}>
                <View style={[styles.track, { flex: 1 }, this.props.trackStyle, {backgroundColor: this.props.theme.colors.surface2}]}>
                    <Image
                        source={require('../../../../images/window-light.png')}
                        style={{ ...styles.leftImage }}
                    />
                    <View style={styles.trackLabel}>
                        <Text style={styles.trackLabelText}>Waiting for curtains...</Text>
                    </View>
                    <ActivityIndicator animating={true} color={Colors.white} style={styles.loader} />
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
    },
    track: {
        flex: 1,
        backgroundColor: 'rgb(173,178,182)',
        borderRadius: 16,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center'
    },
    trackLabel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 0
    },
    trackLabelText: {
        color: 'white',
        fontWeight: '600',
        fontFamily: 'Roboto'
    },
    loader: {
        marginRight: 16,
        alignSelf: 'center',
    },
    leftImage: {
        marginVertical: 10,
        marginHorizontal: 20,
        aspectRatio: 1,
        width: 60
    }
});

export default withTheme(LoadingCurtainsSlider);

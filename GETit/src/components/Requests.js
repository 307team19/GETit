import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {FAB} from 'react-native-paper'


class Requests extends Component {


    render() {


        return (
            <View style={{flex: 1}}>
                <FAB
                    icon={"add"}
                    small
                    style={styles.fab}
                    onPress={() => {
                        this.props.navigation.navigate('addRequest');
                    }}
                />
            </View>

        );
    }
}

const styles = {
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
};


export default Requests;
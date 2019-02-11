import React, {Component} from 'react';
import {View, Text} from 'react-native';

class App extends Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <Text>Hello</Text>
            </View>
        );
    }
}

const styles = {
    containerStyle:{
        flex:1,
        backgroundColor:'white'
    }
}

export default App;
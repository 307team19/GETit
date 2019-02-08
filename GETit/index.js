/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React from 'react'
import {AppRegistry, View, Text} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

const App = ()=> (
    <View style={{flex:1}}>
        <Text>Testing</Text>
    </View>
);

AppRegistry.registerComponent('GETit', () => App);

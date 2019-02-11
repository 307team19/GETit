/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React from 'react'
import {AppRegistry, View, Text} from 'react-native';
import LoginPage from './src_Aman/LoginPage';
// import {name as appName} from './app.json';

/*const App = ()=> (
    <View style={{flex:1}}>
        <Text>Testing</Text>
    </View>
);
*/

AppRegistry.registerComponent('GETit', () => LoginPage);

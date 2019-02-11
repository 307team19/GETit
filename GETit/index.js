import React from 'react';
import {View, AppRegistry, Text} from "react-native";
import {name as appName} from './app.json';
import Header from './src/components_shiv/Header'

//functional component which returns some JSX for viewing
const App = () => {

	//creating headerText and setting its value + adding the AlbumList
	return (
		<View>
			<Header headerText={'GETit Sign Up Page'}/>
		</View>
	);
};

AppRegistry.registerComponent(appName, () => App);


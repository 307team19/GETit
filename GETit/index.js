import React from 'react';
import {View, AppRegistry, Text} from "react-native";
import {name as appName} from './app.json';
import Header from './src/components_shiv/Header'
import { Provider as PaperProvider } from 'react-native-paper';

//functional component which returns some JSX for viewing
const App = () => {

	//creating headerText and setting its value + adding the AlbumList
	return (

		<PaperProvider>
			<View>
				<Header headerText={'GETit Sign Up Page'}/>
			</View>
		</PaperProvider>
	);
};

AppRegistry.registerComponent(appName, () => App);


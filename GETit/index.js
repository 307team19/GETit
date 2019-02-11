import React from 'react';
import { ScrollView, AppRegistry, Text } from "react-native";
import { name as appName } from './app.json';
import Header from './src/components_shiv/Header'
import { Provider as PaperProvider } from 'react-native-paper';
import SignUpForm from './src/components_shiv/SignUpForm';
import LoginPage from './src_Aman/LoginPage'

//functional component which returns some JSX for viewing
const App = () => {

	//creating headerText and setting its value + adding the AlbumList
	return (

		<PaperProvider>
			<ScrollView style = {styles.backgroundStyle}>
				<Header headerText={'GETit Sign Up Page'}/>
				<SignUpForm/>
				<LoginPage/>
			</ScrollView>
		</PaperProvider>
	);
};

const styles = {

	backgroundStyle: {
		backgroundColor: '#ffffff',
		flex: 1
	}
};

AppRegistry.registerComponent(appName, () => App);
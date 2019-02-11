import React, {Component} from 'react';
import {ScrollView, AppRegistry, Text} from "react-native";
import {name as appName} from './app.json';
import Header from './src/components_shiv/Header'
import firebase from 'firebase';
import {Provider as PaperProvider} from 'react-native-paper';
import SignUpForm from './src/components_shiv/SignUpForm';
import LoginPage from './src_Aman/LoginPage'

//functional component which returns some JSX for viewing
const styles = {

    backgroundStyle: {
        backgroundColor: '#ffffff',
        flex: 1
    }
};


class App extends Component {

    componentWillMount(): void {
        firebase.initializeApp({
                apiKey: "AIzaSyDsvcAofBVbHl5SK93WWRdlArc72dqRLg0",
                authDomain: "getit-a4be5.firebaseapp.com",
                databaseURL: "https://getit-a4be5.firebaseio.com",
                projectId: "getit-a4be5",
                storageBucket: "getit-a4be5.appspot.com",
                messagingSenderId: "472187757547"
            }
        );
    }

    render() {
        return (
            //creating headerText and setting its value + adding the AlbumList
            <PaperProvider>
                <ScrollView style={styles.backgroundStyle}>
                    <Header headerText={'GETit Sign Up Page'}/>
                    <SignUpForm/>
                    <LoginPage/>
                </ScrollView>
            </PaperProvider>
        );
    }
}


AppRegistry.registerComponent(appName, () => App);
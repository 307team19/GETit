
import React, {Component} from 'react';
import {ScrollView, AppRegistry, Text} from "react-native";
import {name as appName} from './app.json';
import Header from './src/components_shiv/Header'
import firebase from 'firebase';
import {Provider as PaperProvider} from 'react-native-paper';
import SignUpForm from './src/components_shiv/SignUpForm';
import LoginPage from './src_Aman/LoginPage'
import {Platform, StyleSheet, View} from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator(
  {
    login: LoginPage,
    signup: SignUpForm
  },
  {
    initialRouteName: "login"
  }
  
);

const AppContainer = createAppContainer(AppNavigator)

 class App extends Component<Props> {

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


  // render() {
  //   return (
  //           <PaperProvider>
  //               <ScrollView style={styles.backgroundStyle}>
  //                   <Header headerText={'GETit Sign Up Page'}/>
  //                   <SignUpForm/>
  //                   <LoginPage/>
  //               </ScrollView>
  //           </PaperProvider>
  //       );
  // }

  render(){
    return(
<AppContainer/>
    )
     
    }
  }


 

 export default App

const styles = {

    backgroundStyle: {
        backgroundColor: '#ffffff',
        flex: 1
    }
};

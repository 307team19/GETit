import React, {Component} from 'react';
import firebase from 'firebase';
import SignUpForm from './SignUpForm';
import LoginPage from './LoginPage'
import MyAccount from './MyAccount'
import Orders from './Orders'
import Requests from './Requests'
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from "react-navigation";
import {View} from 'react-native';

const AppNavigator = createStackNavigator(
    {
        login: {
            screen: LoginPage,
        },
        signup: SignUpForm,
        tabscreen: createBottomTabNavigator({
            orders: Orders,
            myaccount: MyAccount,
            requests: Requests,
        })

    },
    {
        initialRouteName: "login",
        defaultNavigationOptions: {
            title: 'GETit',
            headerStyle: {
                backgroundColor: '#1eaaf1',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontSize: 20
            },
        },
    },

);

const AppContainer = createAppContainer(AppNavigator);

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


    render() {
        return (
            <View style={{flex: 1}}>
                <AppContainer/>
            </View>
        )

    }
}


export default App

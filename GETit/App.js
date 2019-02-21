import React, {Component} from 'react';
import firebase from 'firebase';
import SignUpForm from './src/components_shiv/SignUpForm';
import LoginPage from './src_Aman/LoginPage'
import MyAccount from './src/components_shiv/MyAccount'
import Orders from './src/components_shiv/Orders'
import Requests from './src/components_shiv/Requests'
import {createAppContainer, createMaterialTopTabNavigator, createStackNavigator} from "react-navigation";
import Addresses from "./src/components/Addresses";


// const AppNavigator = createStackNavigator(
//   {
//     login: LoginPage,
//     signup: SignUpForm,

//     tabscreen: createBottomTabNavigator({
//       orders: Orders,
//       requests: Requests,
//       myaccount: MyAccount,
//     },
//     {
//       order: ['orders','requests','myaccount'],
//       swipeEnabled: true,
//     })

//   },
//   {
//     initialRouteName: "signup"
//   }

// );

const AppNavigator = createStackNavigator(
    {
        login: LoginPage,
        signup: SignUpForm,
        addresses: Addresses,
        tabscreen: createMaterialTopTabNavigator({
                orders: Orders,
                requests: Requests,
                myaccount: MyAccount,
            },
            {
                order: ['orders', 'requests', 'myaccount'],
                swipeEnabled: true,
                tabBarPosition: 'top',
            }),


    },
    {
        initialRouteName: "signup"
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


    render() {
        return (
            <AppContainer/>
        )

    }
}


export default App

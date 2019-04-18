import React, {Component} from 'react';
import firebase from 'firebase';
import SignUpForm from './SignUpForm';
import LoginPage from './LoginPage'
import MyAccount from './MyAccount'
import Orders from './Orders'
import MyOrders from './MyOrders'
import Requests from './Requests'
import PasswordReset from './PasswordReset'
import Verify from './Verify'
import {createAppContainer, createMaterialTopTabNavigator, createStackNavigator} from "react-navigation";
import {View} from 'react-native';
import CreateUser from "./CreateUser";
import Addresses from "./Addresses";
import AddRequest from "./AddRequest"
import RequestHistory from "./RequestHistory";
import EditRequest from "./EditRequest";
import OrderDetails from "./OrderDetails"
import DropdownAlert from 'react-native-dropdownalert';
import DropDownHolder from './DropDownHandler'
import QRTest from './QRTest'
import payment from './Payment'
import Cash from './Cash'


const ordersTabNavigator = createMaterialTopTabNavigator({
        allorders: Orders,
        myorders: MyOrders,
    },
    {
        order: ['myorders', 'allorders'],
        swipeEnabled: true,
        tabBarOptions: {
            labelStyle: {
                fontSize: 12,
            },
            style: {
                backgroundColor: '#1eaaf1',
            },
        }
    }
)


const TabNavigator = createMaterialTopTabNavigator({
        orders: ordersTabNavigator,
        myaccount: MyAccount,
        requests: Requests,
    },
    {
        order: ['orders', 'requests', 'myaccount'],
        swipeEnabled: true,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            labelStyle: {
                fontSize: 12,
            },
            style: {
                backgroundColor: '#1eaaf1',
            },
        }
    }
)

TabNavigator.navigationOptions = ({navigation}) => {
    const {routeName} = navigation.state.routes[navigation.state.index];


    if (routeName === "requests") {
        return {
            headerTitle: "Currents Requests",
        };
    } else if (routeName === "orders") {
        return {
            headerTitle: "Orders",
        };
    } else {
        return {
            headerTitle: "My Account",
        };
    }


};

const AppNavigator = createStackNavigator(
    {
        login: {
            screen: LoginPage,
        },
        signup: SignUpForm,
        createUser: CreateUser,
        passreset: PasswordReset,
        orderdetails: OrderDetails,
        addresses: Addresses,
        addRequest: AddRequest,
        requestHistory: RequestHistory,
        editRequest: EditRequest,
        qrtest: QRTest,
        verify: Verify,
        tabscreen: TabNavigator,
        payment: payment,
        cash: Cash,


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
                <DropdownAlert ref={ref => DropDownHolder.setDropDown(ref)}/>
            </View>
        )

    }
}


export default App

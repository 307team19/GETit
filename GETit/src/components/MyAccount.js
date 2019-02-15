import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import { GoogleSignin } from 'react-native-google-signin';

class MyAccount extends Component {
    signOut = async () => {
    try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    } catch (error) {
    console.error(error);
     }

     const isSignedIn = await GoogleSignin.isSignedIn();
    console.log(isSignedIn);
     


    };

    render() {


        return (
            <View>
                <Text>MyAccount Screen</Text>
                <Text>MyAccount Screen</Text>
                <Text>MyAccount Screen</Text>
                <Text>MyAccount Screen</Text>
                <Text>MyAccount Screen</Text>
                <Text>MyAccount Screen</Text>
                <Text>MyAccount Screen</Text>
                <Text>MyAccount Screen</Text>
                <Text>MyAccount Screen</Text>
                <Button
                onPress = {this.signOut}
                >
                Sign Out
                </Button>
            </View>

        );
    }
}


export default MyAccount;
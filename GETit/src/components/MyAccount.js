import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import firebase from 'firebase';
import {GoogleSignin} from 'react-native-google-signin';

class MyAccount extends Component {
    signOut = async () => {

        const user = firebase.auth().currentUser;
        var provider = null;

        if (user != null) {
            console.log("here loop");

            user.providerData.forEach(function (profile) {
                console.log("Sign-in provider: " + profile.providerId);
                provider = profile.providerId;
                console.log("  Provider-specific UID: " + profile.uid);
                console.log("  Name: " + profile.displayName);
                console.log("  Email: " + profile.email);
                console.log("  Photo URL: " + profile.photoURL);
            });
        }
        console.log(provider);
        this.props.navigation.navigate("login");

        firebase.auth().signOut().then(async function () {
            console.log("inside here")
            if (provider === "password") {
                
            } else {
                try {
                    await GoogleSignin.revokeAccess();
                    await GoogleSignin.signOut();

                } catch (error) {
                    console.error(error);
                }
            }


            //TODO: this is not reaching here cz of Revoke Access

        }).catch(function (error) {

        });


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
                    onPress={this.signOut}
                >
                    Sign Out
                </Button>
            </View>

        );
    }
}


export default MyAccount;
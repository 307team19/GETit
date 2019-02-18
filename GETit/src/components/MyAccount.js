import React, {Component} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Button, Provider as PaperProvider, TextInput} from 'react-native-paper';
import firebase from 'firebase';

import {GoogleSignin} from 'react-native-google-signin';
import {CardSection} from "./common"
import paperTheme from './common/paperTheme'
import {StackActions, NavigationActions} from 'react-navigation';


// import {Image} from "react-native-paper/typings/components/Avatar";

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'login' })],
});

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
        this.props.navigation.dispatch(resetAction);

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
            <PaperProvider theme={paperTheme}>
                <ScrollView>
                    <View>
                        <CardSection>
                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={require('../img/profile_placeholder.png')}
                                    style={styles.profilePicStyle}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                        </CardSection>

                        <CardSection>
                            <TextInput
                                style={styles.textInputStyle}
                                label='Email@email.com'
                                mode='outlined'
                                // placeholder="current email"
                                disabled='false'
                                //value={this.state.email}
                            />
                            <Button
                                style={styles.buttonContainedStyle}
                                // mode="contained"
                            >
                                <Text>
                                    Edit
                                </Text>
                            </Button>
                        </CardSection>

                        <CardSection>
                            <TextInput
                                style={styles.textInputStyle}
                                label='123-456-7890'
                                mode='outlined'
                                // placeholder="current email"
                                disabled='false'
                                //value={this.state.email}
                            />
                            <Button
                                style={styles.buttonContainedStyle}
                                // mode="contained"
                            >
                                <Text>
                                    Edit
                                </Text>
                            </Button>
                        </CardSection>

                        <CardSection>
                            <TextInput
                                style={styles.textInputStyle}
                                label='Address'
                                mode='outlined'
                                // placeholder="current email"
                                disabled='false'
                                //value={this.state.email}
                            />
                            <Button
                                style={styles.buttonContainedStyle}
                                // mode="contained"
                            >
                                <Text>
                                    Edit
                                </Text>
                            </Button>
                        </CardSection>

                        <CardSection>
                            <Button
                                style={styles.buttonContainedStyle}
                                onPress={this.signOut}>
                                Sign Out
                            </Button>
                        </CardSection>
                    </View>
                </ScrollView>
            </PaperProvider>
        );
    }
}

const styles = {
    profilePicStyle: {
        height: 150,
        width: 150,
        alignItems: 'center',
        flex: 1
    },
    textInputStyle: {
        flex: 8
    },
    buttonContainedStyle: {
        justifyContent: 'center',
        flex: 1
    }
}


export default MyAccount;
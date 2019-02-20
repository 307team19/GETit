import React, {Component} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Button, Provider as PaperProvider, TextInput} from 'react-native-paper';
import firebase from 'firebase';

import {GoogleSignin} from 'react-native-google-signin';
import {CardSection} from "./common"
import paperTheme from './common/paperTheme'
import {NavigationActions, StackActions} from 'react-navigation';
import ImagePicker from 'react-native-image-picker';


// import {Image} from "react-native-paper/typings/components/Avatar";

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'login'})],
});

const options = {
    title: 'Select Avatar',
    customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

class MyAccount extends Component {


    state = {
        disabledEmail: true,
        email: 'hi@hi.com',
        buttonEmail: 'Edit',
        disabledPhNo: true,
        PhNo: '123-456-7890',
        buttonPhNo: 'Edit',
        disabledAddr: true,
        Addr: '100 State St, West Lafayette',
        buttonAddr: 'Edit',
        name: 'Purdue Pete',
        imageSource: ''
    };

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

    onEditEmailPressed() {
        if (this.state.buttonEmail.toString().localeCompare('Edit') == 0) {
            this.setState({disabledEmail: false});
            //this.setState({email: ''});
            this.setState({buttonEmail: 'Accept'});
        } else {
            this.setState({disabledEmail: true});
            this.setState({buttonEmail: 'Edit'});


        }
    }

    onEditPhNoPressed() {
        if (this.state.buttonPhNo.toString().localeCompare('Edit') == 0) {
            this.setState({disabledPhNo: false});
            //this.setState({email: ''});
            this.setState({buttonPhNo: 'Accept'});
        } else {
            this.setState({disabledPhNo: true});
            this.setState({buttonPhNo: 'Edit'});
        }
    }

    onEditAddrPressed() {
        if (this.state.buttonAddr.toString().localeCompare('Edit') == 0) {
            this.setState({disabledAddr: false});
            //this.setState({email: ''});
            this.setState({buttonAddr: 'Accept'});
        } else {
            this.setState({disabledAddr: true});
            this.setState({buttonAddr: 'Edit'});
        }
    }

    onImageButtonPressed() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = {uri: response.uri};

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    imageSource: source,
                });
            }
        });

    }

    render() {


        return (
            <PaperProvider theme={paperTheme}>
                <ScrollView>
                    <View>
                        <CardSection>
                            <TouchableOpacity
                                style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                                onPress={this.onImageButtonPressed.bind(this)}
                            >
                                <Image
                                    source={this.state.imageSource || require('../img/profile_placeholder.png')}
                                    style={styles.profilePicStyle}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                        </CardSection>

                        <CardSection>
                            <Text style={styles.textStyle}>
                                Welcome {this.state.name}!
                            </Text>
                        </CardSection>

                        <CardSection>
                            <TextInput
                                style={styles.textInputStyle}
                                label='email'
                                mode='outlined'
                                // placeholder="current email"
                                disabled={this.state.disabledEmail}
                                value={this.state.email}
                                onChangeText={textString => this.setState({email: textString})}
                            />
                            <Button
                                style={styles.buttonContainedStyle}
                                // onPress={disabled => this.setState({disabled: false})}
                                onPress={this.onEditEmailPressed.bind(this)}
                                // mode="contained"
                            >
                                <Text>
                                    {this.state.buttonEmail}
                                </Text>
                            </Button>
                        </CardSection>

                        <CardSection>
                            <TextInput
                                style={styles.textInputStyle}
                                label='123-456-7890'
                                mode='outlined'
                                // placeholder="current email"
                                disabled={this.state.disabledPhNo}
                                value={this.state.PhNo}
                                onChangeText={textString => this.setState({PhNo: textString})}
                            />
                            <Button
                                style={styles.buttonContainedStyle}
                                onPress={this.onEditPhNoPressed.bind(this)}
                                // mode="contained"
                            >
                                <Text>
                                    {this.state.buttonPhNo}
                                </Text>
                            </Button>
                        </CardSection>

                        <CardSection>
                            <TextInput
                                style={styles.textInputStyle}
                                label='Address'
                                mode='outlined'
                                // placeholder="current email"
                                disabled={this.state.disabledAddr}
                                value={this.state.Addr}
                                onChangeText={textString => this.setState({Addr: textString})}
                                //value={this.state.email}
                            />
                            <Button
                                style={styles.buttonContainedStyle}
                                onPress={this.onEditAddrPressed.bind(this)}
                                // mode="contained"
                            >
                                <Text>
                                    {this.state.buttonAddr}
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
    },
    textStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1
    }
}


export default MyAccount;
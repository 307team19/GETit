import React, {Component} from 'react';
import {Button, Provider as PaperProvider, TextInput} from 'react-native-paper';
import {Alert, Image, Platform, ScrollView, Switch, Text, TouchableOpacity, View} from 'react-native';
import firebase from 'firebase';
import RNFetchBlob from 'rn-fetch-blob'
import {GoogleSignin} from 'react-native-google-signin';
import paperTheme from './common/paperTheme'
import {NavigationActions, NavigationEvents, StackActions} from 'react-navigation';
import ImagePicker from 'react-native-image-picker';


// import {Image} from "react-native-paper/typings/components/Avatar";


const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'login'})],
});

const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

class MyAccount extends Component {
    static navigationOptions = {
        tabBarLabel: 'My Account'
    };

    state = {
        disabledEmail: true,
        email: '',
        buttonEdit: 'Edit',
        disabledPhNo: true,
        disabledVenmo: true,
        phoneNumber: '',
        disabledAddr: true,
        address: '',
        firstName: '',
        lastName: '',
        imageSource: '',
        user: '',
        uid: '',
        addresses: [],
        photoURL: '',
        venmoUsername: '',
        notification: true
    };

    componentWillMount() {
        this.setState({uid: firebase.auth().currentUser.uid});
        const u = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + u + '/').once('value')
            .then(response => {
                this.setState({user: response.val()});
                console.log("user is " + this.state.user);
                this.setState({
                    email: this.state.user.email,
                    phoneNumber: this.state.user.phoneNumber,
                    firstName: this.state.user.firstName,
                    lastName: this.state.user.lastName,
                    addresses: this.state.user.addresses,
                    photoURL: this.state.user.photoURL,
                    address: this.state.user.address,
                    venmoUsername: this.state.user.venmoUsername,
                    notification: this.state.user.notification
                });

            });
        console.log("notif" + this.state.notification);

    }


    signOut = async () => {

        firebase.database().ref('/requests/').off('child_changed');
        firebase.database().ref('/').off('child_changed');
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

        });


    };

    onEditPressed() {
        const {email, phoneNumber, firstName, lastName, addresses, photoURL, address, venmoUsername, notification} = this.state;
        if (venmoUsername === "" || phoneNumber === "") {
            Alert.alert(
                'Oops!',
                'Check the phone number and venmo username',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },

                ],
                {cancelable: false},
            );
            return;
        }
        if (this.state.buttonEdit.toString().localeCompare('Edit') === 0) {
            // this.setState({disabledEmail: false});
            this.setState({
                disabledPhNo: false,
                buttonEdit: 'Accept',
                disabledVenmo: false,

            });
        } else {
            this.setState({
                disabledPhNo: true,
                buttonEdit: 'Edit',
                disabledVenmo: true,

            });

            /*TODO FIX THIS ASAP*/
            var userRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/");
            userRef.update({
                phoneNumber: phoneNumber,
                venmoUsername: venmoUsername,
            }).then((data) => {
                console.log('Synchronization succeeded');
            }).catch((error) => {
                console.log(error)
            })

        }
    }

    onImageButtonPressed() {
        ImagePicker.showImagePicker(options, (response) => {


            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {


                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    photoURL: response.uri,
                });

                //code for uploading to firebase storage.

                const Blob = RNFetchBlob.polyfill.Blob;
                const fs = RNFetchBlob.fs;
                window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
                window.Blob = Blob;


                const uploadUri = Platform.OS === 'ios' ? (this.state.photoURL).replace('file://', '') : this.state.photoURL;
                let uploadBlob = null;
                const imageRef = firebase.storage().ref('posts').child(`${this.state.photoURL}`);
                fs.readFile(uploadUri, 'base64')
                    .then((data) => {
                        return Blob.build(data, {type: `image/jpg;BASE64`})
                    })
                    .then((blob) => {
                        uploadBlob = blob;
                        return imageRef.put(blob, {contentType: 'image/jpg'})
                    })
                    .then(() => {
                        uploadBlob.close();
                        return imageRef.getDownloadURL()
                    })
                    .then((url) => {
                        console.log("down");
                        console.log("users/" + firebase.auth().currentUser.uid + "/")
                        var userRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/");
                        userRef.update({
                            photoURL: url,
                        }).then((data) => {
                            console.log('Synchronization succeeded');
                        }).catch((error) => {
                            console.log(error)
                        });
                        console.log(url);
                        this.setState({
                            photoURL: url,
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    })


            }
        });

    }

    onNotificationToggle() {

        console.log("Notification Toggle ");
        if (this.state.notification) {
            firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/").
            update({
                notification: false,
            }).then((data) => {
                console.log('Synchronization succeeded');
            }).catch((error) => {
                console.log(error)
            });
            this.setState({
                notification: false
            })
        } else {
            firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/").
            update({
                notification: true,
            }).then((data) => {
                console.log('Synchronization succeeded');
            }).catch((error) => {
                console.log(error)
            });
            this.setState({
                notification: true
            })
        }
    };

    render() {
        return (
            <PaperProvider theme={paperTheme}>
                <NavigationEvents onDidFocus={() => {
                    const user = firebase.auth().currentUser.uid;
                    firebase.database().ref('/users/' + user + '/').once('value')
                        .then(response => {
                            this.setState({user: response.val()});
                            this.setState({address: response.val().address});
                            this.setState({addresses: response.val().addresses});

                        });
                }}
                />
                <ScrollView testID="myAccountPage">
                    <View>
                        <TouchableOpacity
                            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                            onPress={this.onImageButtonPressed.bind(this)}>
                            <Image
                                source={{uri: this.state.photoURL}}
                                style={styles.profilePicStyle}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>

                        <Text style={styles.textStyle}>
                            Welcome {this.state.firstName}
                        </Text>

                        <TextInput
                            style={styles.textInputStyle}
                            label='Email'
                            mode='outlined'
                            disabled={this.state.disabledEmail}
                            value={this.state.email}
                            onChangeText={textString => this.setState({email: textString})}
                        />
                        <TextInput
                            style={styles.textInputStyle}
                            label='Phone Number'
                            mode='outlined'
                            disabled={this.state.disabledPhNo}
                            value={this.state.phoneNumber}
                            keyboardType='numeric'
                            onChangeText={textString => this.setState({phoneNumber: textString.replace(/[^0-9]/g, '')})}
                        />
                        <TextInput
                            style={styles.textInputStyle}
                            label='Venmo Username'
                            mode='outlined'
                            disabled={this.state.disabledVenmo}
                            value={this.state.venmoUsername}
                            onChangeText={textString => this.setState({venmoUsername: textString})}
                        />

                        <TouchableOpacity
                            style={{flex: 1, width: null}}
                            onPress={() => {
                                this.props.navigation.navigate('addresses');
                            }}>
                            <TextInput
                                style={styles.textInputStyle}
                                label='Address'
                                pointerEvents="none"
                                mode='outlined'
                                onPress={() => {
                                    this.props.navigation.navigate('addresses');
                                }}
                                disabled={true}
                                value={this.state.address}
                                onChangeText={textString => this.setState({address: textString})}
                            />
                        </TouchableOpacity>

                        <Text style={styles.textStyleNormal}> Notifications Toggle </Text>

                        <Switch
                            style={styles.switchStyle}
                            onValueChange={this.onNotificationToggle.bind(this)}
                            value={this.state.notification}>
                        </Switch>

                        <Button
                            style={styles.buttonContainedStyle}
                            onPress={() => {
                                console.log("here text");
                                this.props.navigation.navigate('requestHistory');
                            }}
                        >
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 20,
                                margin: 3,
                                fontWeight: 'bold',
                                color: 'white'
                            }}>
                                Request History
                            </Text>
                        </Button>
                        <Button
                            style={styles.buttonContainedStyle}
                            onPress={this.onEditPressed.bind(this)}
                        >
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 20,
                                margin: 3,
                                fontWeight: 'bold',
                                color: 'white'
                            }}>
                                {this.state.buttonEdit}
                            </Text>
                        </Button>
                        <Button
                            testID="signOutButton"
                            style={{...styles.buttonContainedStyle, borderColor: '#f20010', backgroundColor: '#f20010'}}
                            onPress={this.signOut}>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 20,
                                margin: 3,
                                fontWeight: 'bold',
                                color: 'white'
                            }}
                            >Sign Out</Text>
                            
                        </Button>
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
        flex: 1,
    },
    textInputStyle: {
        margin: 10,
        flex: 8
    },
    buttonContainedStyle: {
        margin: 10,
        justifyContent: 'center',
        flex: 1,
        borderColor: '#1eaaf1',
        marginBottom: 3,
        backgroundColor: '#1eaaf1'
    },
    textStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 37,
        flex: 1
    },
    textStyleNormal: {
        textAlign: 'center',
        flex: 1
    },
    switchStyle: {
        alignSelf: 'center',
        flex: 1
    },
    surface: {
        padding: 8,
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        elevation: 4,
    }
};


export default MyAccount;

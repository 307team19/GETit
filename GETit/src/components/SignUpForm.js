import React, {Component} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {Button, Provider as PaperProvider, Text, TextInput} from 'react-native-paper';
import firebase from 'firebase';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import paperTheme from './common/paperTheme'
import {NavigationActions, NavigationEvents, StackActions} from 'react-navigation';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'tabscreen'})],
});


class SignUpForm extends Component {

    componentWillMount() {


        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '472187757547-eodjh1hl1mq000s45hha2l9lbpmd3c3j.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            hostedDomain: '', // specifies a hosted domain restriction
            loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
            accountName: '', // [Android] specifies an account name on the device that should be used
            iosClientId: '472187757547-uhlv7ubeu6kepvok0o2d8gv9ihpj9puo.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        });


    }

    static navigationOptions = {
        title: 'Sign Up',
    };

    state = {
        firstName: '',
        email: '',
        password: '',
        phoneNumber: '',
        lastName: '',
        userInfo: '',
        venmoUsername: ''

    };


    async onSignUpButtonPressed() {

        if (this.state.email === "" || this.state.firstName === "" || this.state.lastName === "" ||
            this.state.phoneNumber === "" || this.state.venmoUsername === "") {
            Alert.alert(
                'Oops!',
                'Check the first name, last name, phone number and venmo username',
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

        const {email, password, phoneNumber, firstName, lastName, venmoUsername} = this.state;
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
        } catch (err) {
            Alert.alert(
                'Oops!',
                err.message,
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },

                ],
                {cancelable: false},
            );
            console.log(err)
        }

        var rootRef = firebase.database().ref();
        var userRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/");

        userRef.set({
            email,
            phoneNumber,
            firstName,
            lastName,
            venmoUsername,
            notification: true,
            photoURL: "https://firebasestorage.googleapis.com/v0/b/getit-a4be5.appspot.com/o/posts%2Ffile%3A%2FUsers%2Fsehajbirrandhawa%2FLibrary%2FDeveloper%2FCoreSimulator%2FDevices%2FF055FD0C-ABC6-423E-BB50-C01606FF7933%2Fdata%2FContainers%2FData%2FApplication%2FE69A3A82-C538-423F-A1DC-CCE106B25723%2FDocuments%2Fimages%2Fpurduepete.jpg?alt=media&token=e9ada70d-8b56-40d5-b114-1165820105da",
            addresses: {"no address": "no address"},
            address: "no address"
        }).then((data) => {
            console.log('Synchronization succeeded');
        }).catch((error) => {
            console.log(error)
        });

        this.props.navigation.dispatch(resetAction);

    }

    signIn = async () => {


        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({userInfo});
            console.log(this.state.userInfo);
            var credential = firebase.auth.GoogleAuthProvider.credential(this.state.userInfo.idToken);
            firebase.auth().signInAndRetrieveDataWithCredential(credential)
                .then(() => {

                    this.props.navigation.navigate('createUser');
                }).catch((error) => {
                console.log(error)
            })


        } catch (error) {
            console.log(error)
        }
    };

    render() {

        return (

            <PaperProvider theme={paperTheme}>
                <NavigationEvents onDidFocus={() => {
                    const user = firebase.auth().currentUser;
                    if (user != null) {
                        firebase.auth().signOut().then(async function () {

                            try {
                                await GoogleSignin.revokeAccess();
                                await GoogleSignin.signOut();
                                console.log("sign out");

                            } catch (error) {
                                console.error(error);
                            }

                        });
                    }
                }}/>
                <ScrollView>
                    <View style={styles.viewStyle}>
                        <TextInput
                            style={styles.textInputStyle}
                            label='First Name'
                            mode='outlined'
                            value={this.state.firstName}
                            onChangeText={textString => this.setState({firstName: textString})}
                        />
                        <TextInput
                            style={styles.textInputStyle}
                            label='Last Name'
                            mode='outlined'
                            value={this.state.lastName}
                            onChangeText={textString => this.setState({lastName: textString})}
                        />
                        <TextInput
                            style={styles.textInputStyle}
                            label='Email'
                            mode='outlined'
                            value={this.state.email}
                            onChangeText={textString => this.setState({email: textString})}

                        />
                        <TextInput
                            style={styles.textInputStyle}
                            label='Password'
                            mode='outlined'
                            secureTextEntry
                            value={this.state.password}
                            onChangeText={textString => this.setState({password: textString})}
                        />
                        <TextInput
                            style={styles.textInputStyle}
                            label='Phone Number'
                            mode='outlined'
                            value={this.state.phoneNumber}
                            keyboardType='numeric'
                            onChangeText={textString => this.setState({phoneNumber: textString.replace(/[^0-9]/g, '')})}

                        />
                        <TextInput
                            style={styles.textInputStyle}
                            label='Venmo Username'
                            mode='outlined'
                            value={this.state.venmoUsername}
                            onChangeText={textString => this.setState({venmoUsername: textString})}
                        />
                        <Button
                            style={styles.buttonContainedStyle}
                            mode="contained"
                            onPress={this.onSignUpButtonPressed.bind(this)}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>SIGN UP</Text>
                        </Button>
                        <GoogleSigninButton
                            style={{height: 48, justifyContent: 'center', flex: 1, margin: 10}}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this.signIn}
                            disabled={false}
                        />

                    </View>
                </ScrollView>
            </PaperProvider>
        );
    };
}

const styles = {

    viewStyle: {
        margin: 10,
        padding: 12,
        flex: 1,
    },

    textInputStyle: {
        marginBottom: 12
    },

    buttonContainedStyle: {
        height: 47,
        justifyContent: 'center',
        marginTop: 4
    }
};


export default SignUpForm;

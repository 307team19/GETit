import React, {Component} from 'react';
import {Alert, Image, ScrollView, Text, View} from 'react-native';
import {Card, CardSection} from "./common";
import firebase from 'firebase';
import {Button, Provider as PaperProvider, TextInput} from 'react-native-paper';
import paperTheme from './common/paperTheme'
import {NavigationActions, StackActions} from 'react-navigation';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'tabscreen'})],
});

class LoginPage extends Component {
    static navigationOptions = {
        title: 'GETit',
        headerBackTitle: 'Login'
    };

    constructor(props) {
        super(props);

        this._isMounted = true;
// rest of your code
    }


    state = {email: '', password: '', loggedIn: null};

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


    onLoginButtonPressed() {
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                    const user = firebase.auth().currentUser;
                    if (user != null) {
                        user.providerData.forEach(function (profile) {
                            console.log("Sign-in provider: " + profile.providerId);
                            console.log("  Provider-specific UID: " + profile.uid);
                            console.log("  Name: " + profile.displayName);
                            console.log("  Email: " + profile.email);
                            console.log("  Photo URL: " + profile.photoURL);
                        });
                    }
                    this.props.navigation.dispatch(resetAction);

                }
            )
            .catch(error => {
                Alert.alert(
                    'Oops!',
                    error.message,
                    [
                        {
                            text: 'OK',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },

                    ],
                    {cancelable: false},
                );
                console.log(error)
            });
    }

    signIn = async () => {
        console.log("g sign in attempt")

        if (this._isMounted) {
            try {
                await GoogleSignin.hasPlayServices();
                const userInfo = await GoogleSignin.signIn();
                this.setState({userInfo});
                console.log(this.state.userInfo);
                var credential = firebase.auth.GoogleAuthProvider.credential(this.state.userInfo.idToken);
                firebase.auth().signInAndRetrieveDataWithCredential(credential)
                    .then(() => {

                        this.props.navigation.dispatch(resetAction);
                    }).catch((error) => {
                    console.log(error)
                })


            } catch (error) {
                console.log(error)
            }
        }
    };


    render() {

        return (
            <PaperProvider theme={paperTheme}>
                <ScrollView>
                    <View style={styles.containerStyle}>

                        <Card>
                            <CardSection>
                                <Image
                                    style={styles.logoStyle}
                                    source={require('../img/logo.png')}
                                    resizeMode='contain'
                                />
                            </CardSection>


                            <CardSection>

                                <TextInput
                                    testID="emailID"
                                    style={styles.textInputStyle}
                                    label='Email'
                                    mode='outlined'
                                    value={this.state.email}
                                    onChangeText={textString => this.setState({email: textString})}

                                />
                            </CardSection>


                            <CardSection>

                                <TextInput
                                    testID="password"
                                    style={styles.textInputStyle}
                                    label='Password'
                                    mode='outlined'
                                    secureTextEntry
                                    value={this.state.password}
                                    onChangeText={textString => this.setState({password: textString})}
                                />
                            </CardSection>

                            <CardSection style={{flex: 1}}>
                                <Button
                                    testID="loginButton"
                                    onPress={this.onLoginButtonPressed.bind(this)}
                                    style={{...styles.buttonContainedStyle, margin: 0}}
                                    mode="contained"
                                >
                                    <Text style={styles.TextStyle}>
                                        LOG IN
                                    </Text>
                                </Button>
                            </CardSection>


                            <CardSection style={{justifyContent: 'space-around'}}>
                                <Button
                                    onPress={() => {
                                        this.props.navigation.navigate('signup')
                                    }}
                                    style={styles.buttonContainedStyle}
                                    mode="contained"
                                >
                                    <Text style={{fontSize: 11, fontWeight: 'bold', color: 'white'}}>
                                        CREATE ACCOUNT
                                    </Text>
                                </Button>
                                <Button
                                    style={styles.buttonContainedStyle}
                                    mode="contained"
                                    onPress={() => {
                                        this.props.navigation.navigate('passreset')
                                    }}
                                >
                                    <Text style={{fontSize: 11, fontWeight: 'bold', color: 'white'}}>
                                        FORGOT PASSWORD
                                    </Text>
                                </Button>

                            </CardSection>

                            <CardSection style={{justifyContent: 'space-around'}}>
                                <GoogleSigninButton
                                    style={{height: 48, justifyContent: 'center', flex: 1}}
                                    size={GoogleSigninButton.Size.Wide}
                                    color={GoogleSigninButton.Color.Dark}
                                    onPress={this.signIn}
                                    disabled={false}
                                />
                            </CardSection>

                        </Card>
                    </View>
                </ScrollView>
            </PaperProvider>
        );
    }
}

const styles = {
    containerStyle: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: 'white'
    },
    textInputStyle: {
        flex: 1,
        // margin: 2,
        // padding: 12
    },
    logoStyle: {
        height: 160,
        width: 150,
        alignItems: 'center',
        flex: 1
    },
    orStyle: {
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 10
    },
    TextStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'

    },

    buttonContainedStyle: {
        height: 47,
        justifyContent: 'center',
        margin: 3,
        flex: 1,
    }
}

export default LoginPage;

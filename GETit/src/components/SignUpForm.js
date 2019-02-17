import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import firebase from 'firebase';
import {Provider as PaperProvider} from 'react-native-paper';
import { GoogleSignin, GoogleSigninButton,  statusCodes  } from 'react-native-google-signin';
import paperTheme from './common/paperTheme'

//class component which handles data
//has render function which returns same thing as functional component
//but outside of that render function, we can do some stuff with data also

/**
 * Gets user data in the form for sign up
 */

 
class SignUpForm extends Component {

    componentWillMount(){
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
        text: '',
        email: '',
        password: '',
        userInfo: {},

    };


    onSignUpButtonPressed() {
        const {email, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch((text) => {
                console.log(text)
            });

        this.props.navigation.navigate('tabscreen')

    }

    signIn = async () => {
        
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        this.setState({ userInfo });
        console.log(this.state.userInfo)
      var credential = firebase.auth.GoogleAuthProvider.credential(this.state.userInfo.idToken);
       firebase.auth().signInAndRetrieveDataWithCredential(credential).catch(function(error) {
           console.log(error.message)
           console.log(error.email)
      });
   
    } catch (error) {
        console.log(error)
    }
    };

    render() {
        return (
            <PaperProvider theme={paperTheme}>
                <ScrollView>
                    <View style={styles.viewStyle}>
                        <TextInput
                            style={styles.textInputStyle}
                            label='Name'
                            mode='outlined'
                        />
                        <TextInput
                            style={styles.textInputStyle}
                            label='Username'
                            mode='outlined'
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
                        />
                        <Button
                            style={styles.buttonContainedStyle}
                            mode="contained"
                            onPress={this.onSignUpButtonPressed.bind(this)}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>SIGN UP</Text>
                        </Button>
                        <GoogleSigninButton
                            style={{ width: 192, height: 48 }}
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
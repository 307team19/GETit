import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import firebase from 'firebase';

//class component which handles data
//has render function which returns same thing as functional component
//but outside of that render function, we can do some stuff with data also

/**
 * Gets user data in the form for sign up
 */
class SignUpForm extends Component {
    static navigationOptions = {
        title: 'Sign Up',
    };
    state = {
        text: '',
        email: '',
        password: ''

    };


    onSignUpButtonPressed() {
        const {email, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch((text) => {
                console.log(text)
            });

        this.props.navigation.navigate('tabscreen')

    }

    render() {
        return (
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
                    Sign up
                </Button>
            </View>
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
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#1eaaf1',
        marginTop: 4
    }
};

export default SignUpForm;
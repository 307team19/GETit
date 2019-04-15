import React, {Component} from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import {Button, Provider as PaperProvider, TextInput} from 'react-native-paper';
import paperTheme from './common/paperTheme';
import firebase from 'firebase';

class PasswordReset extends Component {

    state = {
        email: ''
    };

    render() {
        return (
            <PaperProvider theme={paperTheme}>
                <ScrollView>
                    <View style={styles.viewStyle}>
                        <TextInput
                            style={styles.textInputStyle}
                            label='Email'
                            mode='outlined'
                            value={this.state.email}
                            onChangeText={textString => this.setState({email: textString})}
                        />
                        <Button
                            style={styles.buttonContainedStyle}
                            mode="contained"
                            onPress={() => {
                                firebase.auth().sendPasswordResetEmail(this.state.email).then(function () {
                                    Alert.alert(
                                        'Success',
                                        'Password email link sent to your email',
                                        [
                                            {
                                                text: 'OK',
                                                onPress: () => console.log('Cancel Pressed'),
                                                style: 'cancel',
                                            },

                                        ],
                                        {cancelable: false},
                                    );
                                    console.log("Email sent");
                                }).catch(function (error) {
                                    Alert.alert(
                                        'Oops!',
                                        'Could not send the password reset email',
                                        [
                                            {
                                                text: 'OK',
                                                onPress: () => console.log('Cancel Pressed'),
                                                style: 'cancel',
                                            },

                                        ],
                                        {cancelable: false},
                                    );
                                    console.log("Email not sent")
                                });
                            }}
                        >
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Reset Password</Text>
                        </Button>
                    </View>
                </ScrollView>
            </PaperProvider>
        );
    };
}

const styles = {

    viewStyle: {
        width: null,
        height: null,
        padding: 12,
        flex: 1
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

export default PasswordReset;

import React, {Component} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {Card, CardSection} from "./common";
import firebase from 'firebase';
import {Button, Provider as PaperProvider, TextInput} from 'react-native-paper';
import paperTheme from './common/paperTheme'
import {StackActions, NavigationActions} from 'react-navigation';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'tabscreen' })],
});

class LoginPage extends Component {
    static navigationOptions = {
        title: 'GETit',
        headerBackTitle: 'Login'
    };


    state = {email: '', password: ''};



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
                console.log(error)
            });
    }

    onLoginSucces() {

    }


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
                                    style={styles.textInputStyle}
                                    label='Email'
                                    mode='outlined'
                                    value={this.state.email}
                                    onChangeText={textString => this.setState({email: textString})}

                                />
                            </CardSection>


                            <CardSection>

                                <TextInput
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
                                    onPress={this.onLoginButtonPressed.bind(this)}
                                    style={{...styles.buttonContainedStyle, margin: 0}}
                                    mode="contained"
                                >
                                    <Text style={styles.TextStyle}>
                                        LOG IN HERE
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
                                >
                                    <Text style={{fontSize: 11, fontWeight: 'bold', color: 'white'}}>
                                        FORGOT PASSWORD
                                    </Text>
                                </Button>
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
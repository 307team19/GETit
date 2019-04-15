import firebase from "firebase";
import {Button, Provider as PaperProvider, Text, TextInput} from "react-native-paper";
import paperTheme from "./common/paperTheme";
import {Alert, ScrollView, View} from "react-native";
import React, {Component} from "react";
import {NavigationActions, StackActions} from "react-navigation";

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'tabscreen'})],
});

class CreateUser extends Component {

    static navigationOptions = () => {
        return {
            title: 'Create User'
        };
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


    componentDidMount() {

        const user = firebase.auth().currentUser;
        var pro = {};

        if (user != null) {
            user.providerData.forEach(function (profile) {
                pro = profile;
            })
        }

        const fullName = pro.displayName.split(" ");


        this.setState({
            email: pro.email,
            photoURL: pro.photoURL,
            firstName: fullName[0],
            lastName: fullName[1],
            phoneNumber: pro.phoneNumber,
            userInfo: firebase.auth().currentUser.uid,
        });


    }


    createUserButtonPressed() {
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
        var userRef = firebase.database().ref("users/" + this.state.userInfo + "/");
        userRef.set({
            email: this.state.email,
            photoURL: this.state.photoURL,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            venmoUsername: this.state.venmoUsername,
            addresses: {"no address": "no address"},
            address: "no address",
            notification: true
        }).then((data) => {
            console.log('Synchronization succeeded');
        }).catch((error) => {
            console.log(error)
        });

        this.props.navigation.dispatch(resetAction);

    }


    render() {
        return (
            <PaperProvider theme={paperTheme}>
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
                            disabled
                            value={this.state.email}
                            onChangeText={textString => this.setState({email: textString})}

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
                            onPress={this.createUserButtonPressed.bind(this)}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>CREATE USER</Text>
                        </Button>

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

export default CreateUser;

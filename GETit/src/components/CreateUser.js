import firebase from "firebase";
import {Button, Provider as PaperProvider, Text, TextInput} from "react-native-paper";
import paperTheme from "./common/paperTheme";
import {ScrollView, View} from "react-native";
import React, {Component} from "react";
import {NavigationActions, StackActions} from "react-navigation";
import {GoogleSignin} from "react-native-google-signin";

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
        userInfo: ''
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
            userInfo: firebase.auth().currentUser.uid
        });


    }


    createUserButtonPressed() {
        var userRef = firebase.database().ref("users/" + this.state.userInfo + "/");
        userRef.set({
            email: this.state.email,
            photoURL: this.state.photoURL,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            addresses: {"no address": "no address"},
            address: "no address"
        }).then((data) => {
            console.log('Synchronization succeeded');
        }).catch((error) => {
            console.log(error)
        })

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
                            value={this.state.email}
                            onChangeText={textString => this.setState({email: textString})}

                        />
                        <TextInput
                            style={styles.textInputStyle}
                            label='Phone Number'
                            mode='outlined'
                            value={this.state.phoneNumber}
                            onChangeText={textString => this.setState({phoneNumber: textString})}
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
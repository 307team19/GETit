import React, {Component} from 'react';
import paperTheme from './common/paperTheme';
import {Button, Provider as PaperProvider, TextInput} from 'react-native-paper';
import {CardSection} from "./common";
import {Alert, Text, View} from "react-native";
import firebase from "firebase";

class Addresses extends Component {

    state = {
        user: '',
        addressesObj: {},
        email: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        addresses: '',
        photoURL: '',
        address: '',
        addressInput: '',
        venmoUsername: '',
        notification: true
    };

    componentWillMount() {
        const u = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + u + '/').once('value')
            .then(response => {
                this.setState({user: response.val()});
                this.setState({
                    email: this.state.user.email,
                    phoneNumber: this.state.user.phoneNumber,
                    firstName: this.state.user.firstName,
                    lastName: this.state.user.lastName,
                    addresses: this.state.user.addresses,
                    photoURL: this.state.user.photoURL,
                    address: this.state.user.address,
                    venmoUsername: this.state.user.venmoUsername,
                    addressesObj: this.state.user.addresses,
                    notification: this.state.user.notification
                });

            });

    }

    loadAddresses() {

        const {email, phoneNumber, firstName, lastName, photoURL, addressesObj, venmoUsername, notification} = this.state;

        var adds = [];
        Object.keys(this.state.addressesObj).forEach((key, index) => {
                if (key !== "no address") {
                    adds.push(this.state.addressesObj[key]);
                }
            }
        );


        return (
            adds.map(item =>
                <Text key={item} style={{padding: 10}} onPress={() => {
                    var userRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/");
                    userRef.set({
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        phoneNumber: phoneNumber,
                        addresses: addressesObj,
                        photoURL: photoURL,
                        address: item,
                        venmoUsername,
                        notification: notification
                    }).then((data) => {
                        console.log('Synchronization succeeded');
                        this.props.navigation.navigate('myaccount');
                    });

                }}> {item}</Text>
            )
        );
    }


    render() {
        console.log(this.state.user.addressesObj);
        return (
            <PaperProvider theme={paperTheme}>
                <CardSection>
                    <TextInput
                        style={styles.textInputStyle}
                        label='Add new Address'
                        mode='outlined'
                        value={this.state.addressInput}
                        onChangeText={textString => this.setState({addressInput: textString})}
                    />
                    <Button
                        style={styles.buttonContainedStyle}
                        onPress={() => {
                            var temp = this.state.addressInput;
                            if (temp === "") {
                                Alert.alert(
                                    'Oops!',
                                    'Check the address field',
                                    [
                                        {
                                            text: 'OK',
                                            onPress: () => console.log('Cancel Pressed'),
                                            style: 'cancel',
                                        },

                                    ],
                                    {cancelable: false},
                                );
                            } else {
                                this.setState({
                                    address: this.state.addressInput,
                                    addressesObj: {...this.state.addressesObj, [temp]: temp}
                                });
                                var userRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/addresses/");
                                userRef.push(temp).then((data) => {
                                    console.log('Synchronization succeeded');
                                }).catch((error) => {
                                    console.log(error)
                                });
                                this.setState({addressInput: ''});
                            }
                        }}
                    >
                        <Text>
                            ADD
                        </Text>
                    </Button>
                </CardSection>
                <View style={{flex: 1}}>
                    {this.loadAddresses()}
                </View>
            </PaperProvider>
        );

    }
}


const styles = {
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
    },
};

export default Addresses;
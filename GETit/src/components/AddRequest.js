import React, {Component} from 'react';
import {Text, View} from 'react-native';
import paperTheme from './common/paperTheme'
import {Button, Provider as PaperProvider, Surface, TextInput} from 'react-native-paper';
import firebase from "./Addresses";

class AddRequest extends Component {

    state = {
        user: '',
        email: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        addresses: {},
        photoURL: '',
        address: '',
    };

    componentWillMount(): void {

        const u = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + u + '/').once('value')
            .then(response => {
                this.setState({user: response.val()});
                this.setState({
                    email: this.user.email,
                    photoURL: this.user.photoURL,
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    phoneNumber: this.user.phoneNumber,
                    addresses: this.user.addresses,
                    address: this.user.address
                });
            });
    }

    render() {
        return (
            <PaperProvider theme={paperTheme}>
                <Text>
                    {this.state.firstName}
                </Text>
            </PaperProvider>
        );
    }
}

export default AddRequest;
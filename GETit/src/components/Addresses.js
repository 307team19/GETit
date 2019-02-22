import React, {Component} from 'react';
import paperTheme from './common/paperTheme';
import {Button, Provider as PaperProvider, TextInput} from 'react-native-paper';
import {CardSection} from "./common";
import {Text, View} from "react-native";
import firebase from "firebase";
import {NavigationActions, StackActions, NavigationEvents} from 'react-navigation';

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
        addressInput:''
    };

    componentWillMount() {
        const u = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + u + '/').once('value')
            .then(response => {
                this.setState({user: response.val()});
                this.setState({email: this.state.user.email});
                this.setState({phoneNumber: this.state.user.phoneNumber});
                this.setState({firstName: this.state.user.firstName});
                this.setState({lastName: this.state.user.lastName});
                this.setState({addresses: this.state.user.addresses});
                this.setState({addressesObj: this.state.user.addresses});
                this.setState({photoURL: this.state.user.photoURL});
                this.setState({address: this.state.user.address});
                this.setState({addressInput: ''});
            });

    }

    loadAddresses() {

        const {email, phoneNumber, firstName, lastName, addresses, photoURL, addressesObj} = this.state;

        var adds = [];
        Object.keys(this.state.addressesObj).forEach((key, index) => (
                adds.push(this.state.addressesObj[key])
            )
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
                        address: item
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
                            this.setState({address: this.state.addressInput});
                            this.setState({addressesObj: {...this.state.addressesObj, [temp]: temp}});
                            var userRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/addresses/");
                            userRef.push(temp).then((data) => {
                                console.log('Synchronization succeeded');
                            }).catch((error) => {
                                console.log(error)
                            });
                            this.setState({addressInput: ''});

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


const
    styles = {
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
    }

export default Addresses;
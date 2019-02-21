import React, {Component} from 'react';
import paperTheme from './common/paperTheme';
import {Button, Provider as PaperProvider, TextInput} from 'react-native-paper';
import {CardSection} from "./common";
import {Text} from "react-native";
import firebase from "firebase";


class Addresses extends Component {

    state = {
        addresses: [],
        address: ''
    };

    componentWillMount(){
        const u = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + u + '/addresses/').once('value')
            .then(response => {
                this.setState({address: response.val().address});
            });
        this.setState({ addresses: [...this.state.addresses, this.state.address] });
        console.log(this.state.addresses);
    }

    loadAddresses() {
        return this.state.addresses.map(currAddress =>
            <Text key={currAddress} style={{padding: 10}}>
                {currAddress}
            </Text>
        );
    }


    render() {
        return (
            <PaperProvider theme={paperTheme}>
                <CardSection>
                    <TextInput
                        style={styles.textInputStyle}
                        label='Add new Address'
                        mode='outlined'
                        // placeholder="current email"
                        disabled={this.state.disabledPhNo}
                        value={this.state.address}
                        onChangeText={textString => this.setState({address: textString})}
                    />
                    <Button
                        style={styles.buttonContainedStyle}
                        onPress={() => {
                            this.setState({ addresses: [...this.state.addresses, this.state.address] });

                            var userRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/addresses/");
                            var address = this.state.address;
                            userRef.set({
                                address: address
                            }).then((data) => {
                                console.log('Synchronization succeeded');
                            }).catch((error) => {
                                console.log(error)
                            });
                            this.setState({address: ''});
                        }}
                    >
                        <Text>
                            ADD
                        </Text>
                    </Button>
                </CardSection>
                {this.loadAddresses()}
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
}

export default Addresses;
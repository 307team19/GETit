import React, {Component} from 'react';
import {Alert, Linking, Text, View} from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import firebase from "firebase";

class Verify extends Component {

    state = {
        focusedScreen: false,
        item: {},
        venmoUsername: '',
    };

    onSuccess(e) {
        var res = this.state.item.unikey + ".com";
        if (res == e.data) {
            Alert.alert(
                'Verified',
                'Order Verified! Choose payment option.',
                [
                    {
                        text: 'Pay through Venmo',
                        onPress: () => {
                           

                            firebase.database().ref("users/" + this.state.item.acceptedBy + "/")
                                .once('value').then(response => {

                                let link = 'venmo://paycharge?txn=pay&recipients=' + response.val().venmoUsername +
                                    '&amount=' + this.state.item.price + '&note=GETit request payment';
                                Linking.openURL(link);
                                firebase.database().ref('/requests/' + this.state.item.unikey + "/").update({
                                    completed: true
                                });
                                this.props.navigation.navigate('requests');
                            })
                        }
                    },
                    {
                        text: 'Pay with Cash',
                        onPress: () => {
                            firebase.database().ref("users/" + this.state.item.acceptedBy + "/")
                                .once('value').then(response => {
                                firebase.database().ref('/requests/' + this.state.item.unikey + "/").update({
                                    completed: true
                                });
                                this.props.navigation.navigate('cash', {requestDetails: this.state});
                            })
                        }
                    }
                ],
            );
        } else {
            Alert.alert(
                'Alert!',
                'Order was not verified :(',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            this.props.navigation.navigate('requests');
                        }
                    },

                ],
            );
        }
    }

    componentWillMount() {
        this.setState({item: this.props.navigation.state.params.item}, () => {
            console.log("item: " + this.state.item)
        });

        const u = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + u + '/').once('value')
            .then(response => {
                this.setState({venmoUsername: response.val().venmoUsername});
                console.log("venmo username is " + this.state.venmoUsername);


            });


    }

    componentDidMount() {
        console.log("item: " + this.state.item);
        const {navigation} = this.props;
        navigation.addListener('willFocus', () =>
            this.setState({focusedScreen: true})
        );
        navigation.addListener('willBlur', () =>
            this.setState({focusedScreen: false})
        );
    }

    retView = () => {
        if (this.state.focusedScreen == true) {
            return (
                <QRCodeScanner
                    onRead={this.onSuccess.bind(this)}
                />
            )

        } else {
            return (
                <Text>VERIFY</Text>
            )
        }
    };

    render() {
        return (
            <View style={{flex: 1}}>
                {this.retView()}
            </View>
        );
    }
}

const styles = {};

export default Verify;

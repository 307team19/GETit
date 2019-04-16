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
                'Alert!',
                'Order Verified! Click OK to pay through Venmo.',
                [
                    {
                        text: 'ok',
                        onPress: () => {
                            // this.props.navigation.navigate('payment');
                            let link = 'venmo://paycharge?txn=pay&recipients=' + this.state.venmoUsername +
                                '&amount=' + this.state.item.price + '&note=GETit request payment';
                            Linking.openURL(link);
                            firebase.database().ref('/requests/' + this.state.item.unikey + "/").update({
                                completed: true
                            });
                            this.props.navigation.navigate('requests');
                        }
                    },

                ],
            );
        } else {
            Alert.alert(
                'Alert!',
                'Order was not verified :(',
                [
                    {
                        text: 'ok',
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
    }

    render() {
        return (
            <View>
                {this.retView()}
            </View>
        );
    }
}

const styles = {};

export default Verify;

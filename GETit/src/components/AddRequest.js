import React, {Component} from 'react';
import {View} from 'react-native';
import paperTheme from './common/paperTheme'
import {Button, Provider as PaperProvider, Text, TextInput} from 'react-native-paper';
import firebase from "firebase";
import {Dropdown} from 'react-native-material-dropdown'
import GetLocation from 'react-native-get-location'
import Geocoder from 'react-native-geocoding';

class AddRequest extends Component {

    static navigationOptions = {
        title: 'Add Request',
    };


    state = {
        user: {},
        email: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        addresses: {},
        data: [],
        photoURL: '',
        address: '',
        item: '',
        price: '',
        description: '',
        selectedAddress: '',
        GPSLocation: '',
        instructions: '',
        link: '',
        showCurrLoc: false,
        completed: false
    };

    componentWillMount() {

        var requestItem = this.props.navigation.state.params.requestItem;

        const u = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + u + '/').once('value')
            .then(response => {
                this.setState({
                    user: response.val(),
                    email: response.val().email,
                    firstName: response.val().firstName,
                    lastName: response.val().lastName,
                    phoneNumber: response.val().phoneNumber,
                    photoURL: response.val().photoURL,
                    address: response.val().address,
                    addresses: response.val().addresses,

                });

                if (requestItem != null) {
                    this.setState(requestItem)
                }

                var adds = [];
                Object.keys(this.state.addresses).forEach((key, index) => {
                        if (key !== "no address") {
                            adds.push({
                                value: this.state.addresses[key]
                            });
                        }
                    }
                );

                adds.push({
                    value: 'Current Location'
                });


                GetLocation.getCurrentPosition({
                    enableHighAccuracy: true,
                    timeout: 15000,
                })
                    .then(location => {

                        Geocoder.init('AIzaSyCHBBlV3gi1aqRrbhTQbLlmofdYgl-jMtc');
                        Geocoder.from(location.latitude, location.longitude)
                            .then(json => {
                                var addressComponent = json.results[0].formatted_address;
                                console.log(addressComponent);
                                this.setState({GPSLocation: addressComponent})

                            })
                            .catch(error => console.warn(error.origin));
                    })
                    .catch(error => {
                        const {code, message} = error;
                        console.warn(code, message);
                    });


                this.setState({data: adds})

            });

    }

    addRequest = () => {

        if (isNaN(this.state.price)) {
            alert("Price is not a number!");
        } else if (!this.state.price || !this.state.item) {
            alert("Price and item fields cannot be empty!");
        } else {

            var refpush = firebase.database().ref("requests/").push()
            var unikey = refpush.key;
            var userRef = firebase.database().ref("requests/" + unikey + "/");

            var location;

            if (this.state.address === 'Current Location') {
                location = this.state.GPSLocation;
            } else {
                location = this.state.address;
            }
            userRef.set(
                {
                    item: this.state.item,
                    price: this.state.price,
                    description: this.state.description,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    phoneNumber: this.state.phoneNumber,
                    address: location,
                    link: this.state.link,
                    instructions: this.state.instructions,
                    unikey: unikey,
                    completed: false,
                    acceptedBy: "",
                }
            ).then((data) => {
                console.log('Synchronization succeeded');
                this.props.navigation.navigate('requests')
            }).catch((error) => {
                console.log(error)
            })
        }
    };

    shouldShowCurrLoc = () => {

        if (this.state.showCurrLoc === false) {

            return {
                margin: 0, height: 0, fontSize: 16
            }
        } else {

            return {
                margin: 10, height: 17, fontSize: 16
            }
        }

    }

    render() {

        return (
            
            <PaperProvider theme={paperTheme} testID="addRequestPage" >
                <View style={{flexDirection: 'row', margin: 10}} >
                    <TextInput
                        testID="addRequestItem"
                        style={{flex: 3, margin: 10}}
                        label='Item'
                        mode='outlined'
                        value={this.state.item}
                        onChangeText={textString => this.setState({item: textString})}
                    />
                    <TextInput
                        style={{flex: 1, margin: 10}}
                        label='Price'
                        mode='outlined'
                        testID="addRequestPrice"
                        value={this.state.price}
                        keyboardType='numeric'
                        maxLength={5}
                        onChangeText={textString => this.setState({price: textString.replace(/[^0-9.]/g, '')})}
                    />
                </View>
                <Dropdown
                    label='Addresses'
                    data={this.state.data}
                    containerStyle={{margin: 10}}
                    value={this.state.address}
                    onChangeText={text => {
                        if (text === 'Current Location') {
                            this.setState({address: this.state.GPSLocation, showCurrLoc: true})
                        } else {

                            this.setState({address: text, showCurrLoc: false})
                        }
                    }}
                />
                <View>
                    <Text style={this.shouldShowCurrLoc()} numberOfLines={2} ellipsizeMode='tail'>Current
                        location: {this.state.GPSLocation}</Text>
                </View>
                <TextInput
                    style={{margin: 10}}
                    label='Description'
                    mode='outlined'
                    value={this.state.description}
                    onChangeText={textString => this.setState({description: textString})}
                />
                <TextInput
                    style={{margin: 10}}
                    label='Special Instructions'
                    mode='outlined'
                    value={this.state.instructions}
                    onChangeText={textString => this.setState({instructions: textString})}
                />
                <TextInput
                    style={{margin: 10}}
                    label='Link'
                    mode='outlined'
                    value={this.state.link}
                    onChangeText={textString => this.setState({link: textString})}
                />
                <Button
                    onPress={this.addRequest}
                    testID="addRequestAddButton"
                    style={styles.buttonContainedStyle}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 20,
                        margin: 3,
                        fontWeight: 'bold',
                        color: 'white'
                    }}
                    >Add request</Text>
                </Button>
            </PaperProvider>
            
        );
    }
}

const styles = {
    buttonContainedStyle: {
        margin: 10,
        justifyContent: 'center',
        borderColor: '#1eaaf1',
        marginBottom: 3,
        backgroundColor: '#1eaaf1'
        
    },
};

export default AddRequest;

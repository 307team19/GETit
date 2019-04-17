import React, {Component} from 'react';
import {Text, View} from "react-native";
import paperTheme from "./common/paperTheme";
import {Button, Provider as PaperProvider, TextInput} from "react-native-paper";
import {Dropdown} from "react-native-material-dropdown";
import firebase from "firebase";
import GetLocation from 'react-native-get-location'
import Geocoder from 'react-native-geocoding';

class EditRequest extends Component {

    static navigationOptions = {
        title: 'Edit Request',
    };


    state = {
        email: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        addresses: {},
        photoURL: '',
        address: '',
        item: '',
        price: '',
        description: '',
        selectedAddress: '',
        GPSLocation: '',
        instructions: '',
        link: '',
        unikey: '',
        data: [],
        showCurrLoc: false,
    };


    componentWillMount() {


        //getting request details
        var requestItem = this.props.navigation.state.params.requestItem;
        this.setState(requestItem, () => {
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

    confirmChanges = () => {

        if (isNaN(this.state.price)) {
            alert("Price is not a number!");
        } else if (!this.state.price || !this.state.item) {
            alert("Price and item fields cannot be empty!");
        } else {
            firebase.database().ref('/requests/' + this.state.unikey + "/").update({
                address: this.state.address,
                description: this.state.description,
                instructions: this.state.instructions,
                link: this.state.link,
                price: this.state.price
            }).then(this.popToRequests);
        }
    };

    cancelRequest = () => {


        firebase.database().ref('/requests/' + this.state.unikey + "/").remove().then(
            this.popToRequests);
    };

    popToRequests = () => {
        this.props.navigation.navigate('requests');
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

    };

    render() {


        return (
            <PaperProvider theme={paperTheme}>
                <View style={{flexDirection: 'row', margin: 10}}>
                    <TextInput
                        style={{flex: 3, margin: 10}}
                        label='Item'
                        mode='outlined'
                        value={this.state.item}
                        disabled={true}
                        onChangeText={textString => this.setState({item: textString})}
                    />
                    <TextInput
                        style={{flex: 1, margin: 10}}
                        label='Price'
                        mode='outlined'
                        value={this.state.price}
                        disabled={true}
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
                 style = {{...styles.buttonContainedStyle,borderColor: '#0ed115', backgroundColor: '#0ed115'}}
                 onPress={this.confirmChanges}>
                 <Text style={{
                                textAlign: 'center',
                                fontSize: 20,
                                margin: 3,
                                fontWeight: 'bold',
                                color: 'white'
                            }}
                 >Confirm Changes</Text>
                    
                </Button>
                <Button 
                style = {{...styles.buttonContainedStyle,borderColor: '#f20010', backgroundColor: '#f20010'}}
                onPress={this.cancelRequest}>
                <Text style={{
                                textAlign: 'center',
                                fontSize: 20,
                                margin: 3,
                                fontWeight: 'bold',
                                color: 'white'
                            }}
                >Cancel Order</Text>
                    
                </Button>
            </PaperProvider>
        );
    };
}

const styles = {
 buttonContainedStyle: {
        margin: 10,
        justifyContent: 'center',
        borderColor: '#5500e9',
        marginBottom: 3,
        backgroundColor: '#5500e9'
    },
}
export default EditRequest;

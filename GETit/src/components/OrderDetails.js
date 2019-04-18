import React, {Component} from 'react';
import {Alert, Image, Linking, Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import firebase from "firebase";
import call from 'react-native-phone-call';
import Communications from 'react-native-communications';

class OrderDetails extends Component {

    state = {
        details: {},
        number: '',
        acceptorName: ''
    };

    componentWillMount() {
        console.log(this.props.navigation.state.params.details)
        this.setState({details: this.props.navigation.state.params.details})
        const u = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + u + '/').once('value')
            .then(response => {
                this.setState({
                    acceptorName: response.val().firstName + ' ' + response.val().lastName
                });
                console.log("user is " + this.state.user);


            });
    }

    mapKey = 'AIzaSyDOhIL5sHTAm6rrVac5iCpOnEZU-7RkfK0';

    retView = (item) => {
        if (item === "item") {
            return (
                <View style={{marginLeft: '1%', marginRight: '1%'}}>
                    <Text style={{textAlign: 'left', fontSize: 30, fontWeight: 'bold'}}>Item</Text>
                    <View style={styles.boxStyle}>
                        <Text numberOfLines={2} ellipsizeMode={'tail'}
                              style={{textAlign: 'left', fontSize: 20, margin: 3}}>{this.state.details.item}</Text>
                    </View>
                </View>
            )
        } else if (item === "description") {
            var desc = this.state.details.description
            if (desc === "") {
                desc = "N/A"
            }
            return (
                <View style={{marginLeft: '1%', marginRight: '1%'}}>
                    <Text style={{textAlign: 'left', fontSize: 30, fontWeight: 'bold'}}>Description</Text>
                    <View style={styles.boxStyle}>
                        <Text numberOfLines={5} ellipsizeMode={'tail'}
                              style={{textAlign: 'left', fontSize: 20, margin: 3}}>{desc}</Text>
                    </View>
                </View>
            )
        } else if (item === "instructions") {
            var instr = this.state.details.instructions
            if (instr === "") {
                instr = "N/A"
            }
            return (
                <View style={{marginLeft: '1%', marginRight: '1%'}}>
                    <Text style={{textAlign: 'left', fontSize: 30, fontWeight: 'bold'}}>Special Instructions</Text>
                    <View style={styles.boxStyle}>
                        <Text numberOfLines={5} ellipsizeMode={'tail'}
                              style={{textAlign: 'left', fontSize: 20, margin: 3}}>{instr}</Text>
                    </View>
                </View>
            )
        } else if (item === "email") {
            return (
                <View style={{marginLeft: '1%', marginRight: '1%'}}>
                    <Text style={{textAlign: 'left', fontSize: 30, fontWeight: 'bold'}}>Email</Text>
                    <View style={styles.boxStyle}>
                        <Text numberOfLines={1}
                              style={{textAlign: 'left', fontSize: 20, margin: 3}}>{this.state.details.email}</Text>
                    </View>
                </View>
            )
        } else if (item === "price") {
            return (
                <View style={{marginLeft: '1%', marginRight: '1%'}}>
                    <Text style={{textAlign: 'left', fontSize: 30, fontWeight: 'bold'}}>Price</Text>
                    <View style={{...styles.boxStyle, marginBottom: 3, borderColor: '#007aff',}}>
                        <Text numberOfLines={5} ellipsizeMode={'tail'} style={{
                            textAlign: 'center',
                            fontSize: 30,
                            margin: 3,
                            fontWeight: 'bold'
                        }}>${this.state.details.price}</Text>
                    </View>
                </View>
            )
        } else if (item === "addressField") {
            return (
                <View style={{marginLeft: '1%', marginRight: '1%'}}>
                    <Text style={{textAlign: 'left', fontSize: 30, fontWeight: 'bold'}}>Address</Text>
                    <View style={{...styles.boxStyle, marginBottom: 3, borderColor: '#007aff',}}>
                        <Text numberOfLines={1}
                              style={{textAlign: 'left', fontSize: 20, margin: 3}}>{this.state.details.address}</Text>
                    </View>
                </View>
            )
        } else if (item === "link") {
            if (this.state.details.link) {
                return (
                    <View style={{marginLeft: '1%', marginRight: '1%'}}>
                        <TouchableOpacity
                            style={{
                                ...styles.boxStyle,
                                borderColor: '#0dc146',
                                marginBottom: 3,
                                backgroundColor: '#0dc146'
                            }}
                            onPress={() => {
                                Linking.openURL(this.state.details.link).catch((error => alert("Link is not valid\n" + item.link)))
                            }}>
                            <Text numberOfLines={5} ellipsizeMode={'tail'} style={{
                                textAlign: 'center',
                                fontSize: 30,
                                margin: 3,
                                fontWeight: 'bold',
                                color: 'white'
                            }}>Open Link</Text>
                        </TouchableOpacity>
                    </View>
                )
            } else if (item === "link") {
                if (this.state.details.link) {
                    return (
                        <View style={{marginLeft: '1%', marginRight: '1%'}}>
                            <TouchableOpacity
                                style={{
                                    ...styles.boxStyle,
                                    borderColor: '#0dc146',
                                    marginBottom: 3,
                                    backgroundColor: '#0dc146'
                                }}
                                onPress={() => {
                                    Linking.openURL(this.state.details.link).catch((error => alert("Link is not valid\n" + item.link)))
                                }}>
                                <Text numberOfLines={5} ellipsizeMode={'tail'} style={{
                                    textAlign: 'center',
                                    fontSize: 30,
                                    margin: 3,
                                    fontWeight: 'bold',
                                    color: 'white'
                                }}>Open Link</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }

            }
        } else if (item === "accept" && this.state.details.acceptedBy === "") {
            return (
                <View style={{marginLeft: '1%', marginRight: '1%'}}>
                    <TouchableOpacity
                        testID="acceptButton"
                        style={{
                            ...styles.boxStyle,
                            borderColor: '#1eaaf1',
                            marginBottom: 3,
                            backgroundColor: '#1eaaf1'
                        }}
                        onPress={() => {
                            Alert.alert(
                                'Alert!',
                                'Are you sure you want to Accept the order?',
                                [
                                    {
                                        text: 'Yes',
                                        onPress: () => {
                                            firebase.database().ref('/requests/' + this.state.details.unikey + "/").update({
                                                acceptedBy: firebase.auth().currentUser.uid,
                                                acceptorName: this.state.acceptorName
                                            });
                                            this.props.navigation.navigate('tabscreen');
                                        }
                                    },
                                    {
                                        text: 'No',
                                        onPress: () => console.log('No Pressed'),
                                        style: 'cancel',
                                    },
                                ],
                            );

                        }}>
                        <Text numberOfLines={5} ellipsizeMode={'tail'} style={{
                            textAlign: 'center',
                            fontSize: 30,
                            margin: 3,
                            fontWeight: 'bold',
                            color: 'white'
                        }}>Accept Order</Text>
                    </TouchableOpacity>
                </View>
            )
        } else if (item === 'complete' && this.state.details.acceptedBy != "") {
            return (
                <View style={{marginLeft: '1%', marginRight: '1%'}}>
                    <TouchableOpacity
                        style={{
                            ...styles.boxStyle,
                            borderColor: '#1eaaf1',
                            marginBottom: 3,
                            backgroundColor: '#1eaaf1'
                        }}
                        onPress={() => {
                            Alert.alert(
                                'Alert!',
                                'Are you sure you want to complete the order?',
                                [
                                    {
                                        text: 'Yes',
                                        onPress: () => {
                                            this.props.navigation.navigate('qrtest', {orderDetails: this.state});
                                        }
                                    },
                                    {
                                        text: 'No',
                                        onPress: () => console.log('No Pressed'),
                                        style: 'cancel',
                                    },
                                ],
                            );

                        }}>
                        <Text numberOfLines={5} ellipsizeMode={'tail'} style={{
                            textAlign: 'center',
                            fontSize: 30,
                            margin: 3,
                            fontWeight: 'bold',
                            color: 'white'
                        }}>Complete Order</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else if (item ==='complete' && this.state.details.acceptedBy!=""){
            return (
                <View style={{marginLeft: '1%', marginRight: '1%'}}>
                    <TouchableOpacity
                        style={{
                            ...styles.boxStyle,
                            borderColor: '#5500e9',
                            marginBottom: 3,
                            backgroundColor: '#5500e9'
                        }}
                        onPress={() => {
                            Alert.alert(
                                'Alert!',
                                'Are you sure you want to complete the order?',
                                [
                                    {
                                        text: 'Yes',
                                        onPress: () => {
                                            this.props.navigation.navigate('qrtest', {orderDetails: this.state});
                                            // firebase.database().ref('/requests/' + this.state.details.unikey + "/").update({
                                            //     completed: true
                                            // });
                                            // this.props.navigation.navigate('tabscreen');
                                        }
                                    },
                                    {
                                        text: 'No',
                                        onPress: () => console.log('No Pressed'),
                                        style: 'cancel',
                                    },
                                ],
                            );

                        }}>
                        <Text numberOfLines={5} ellipsizeMode={'tail'} style={{
                            textAlign: 'center',
                            fontSize: 30,
                            margin: 3,
                            fontWeight: 'bold',
                            color: 'white'
                        }}>Complete Order</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    };

    openMaps = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL(`http://maps.apple.com/?address=` + this.state.details.address);
        } else {
            Linking.openURL(`https://www.google.com/maps/search/?api=1&query=` + this.state.details.address);
        }
    };

    makeCall = () => {
        const args = {
            number: this.state.details.phoneNumber,
            prompt: true
        }
        call(args).catch(console.error);
    };

    sendText = () => {
        const number = this.state.details.phoneNumber;
        Communications.text(number);
    };

    render() {
        return (
            <ScrollView testID="orderDetailsPage">
                {this.retView("item")}
                {this.retView("description")}
                {this.retView("instructions")}
                {this.retView("email")}
                {this.retView("addressField")}
                {this.retView("price")}
                {this.retView("link")}
                <View>
                    <TouchableOpacity onPress={this.openMaps}>
                        <Image
                            testID="map"
                            style={styles.imageStyle}
                            source={{
                                uri: 'https://maps.googleapis.com/maps/api/staticmap?center='
                                    + this.state.details.address + '&zoom=17&scale=2&size=500x500&maptype=roadmap&key='
                                    + this.mapKey + '&format=jpg&visual_refresh=true'
                                    + '&markers=size:mid%7Ccolor:0xff0000%7Clabel:%7C' + this.state.details.address
                            }}/>
                    </TouchableOpacity>
                </View>
                {this.retView("accept")}
                {this.retView("complete")}
                <View style={{flexDirection: 'row', flex: 1, paddingBottom: 15, paddingTop: 10}}>
                    <TouchableOpacity onPress={this.makeCall} style={styles.buttonStyle}>
                        <Image
                            style={styles.iconStyle}
                            source={require('./common/baseline_call_black_18dp.png')}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.sendText} style={styles.buttonStyle}>
                        <Image
                            style={styles.iconStyle}
                            source={require('./common/baseline_chat_black_18dp.png')}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    };

}

const styles = {
    boxStyle: {
        flex: 1,
        marginTop: 7,
        marginBottom: 12,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5,

    },
    iconStyle: {
        //paddingLeft:,
        height: 30,
        width: 30,
        flex: 1
    },
    imageStyle: {
        height: 220,
        margin: 10
    },
    buttonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: 'bold',
        flex: 0.5,
    },
    btnTextStyle: {
        //align: 'left',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 20,
        flex: 2
    }

};

export default OrderDetails;

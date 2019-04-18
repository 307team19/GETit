import React, {Component} from 'react';
import {Alert, FlatList, Linking, PushNotificationIOS, Text, TouchableOpacity, View} from 'react-native';
import {Card, FAB} from 'react-native-paper'
import firebase from "firebase";
import PushNotification from 'react-native-push-notification'
import {NavigationEvents} from 'react-navigation';
import DropDownHandler from './DropDownHandler';
import QRCodeScanner from 'react-native-qrcode-scanner';

class Requests extends Component {

    state = {
        email: '',
        requestsObj: [],
        visible: false,
    };


    componentWillMount() {

        const u = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + u + '/').once('value')
            .then(response => {
                this.setState({
                    email: response.val().email,
                    addresses: response.val().addresses,
                });
            });
        firebase.database().ref('/').once('value').then(response => {
            this.setState({requestsObj: response.val().requests})
        });

        PushNotification.configure({
            onNotification: function (notification) {
                console.log('NOTIFICATION:', notification);
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
            popInitialNotification: true,
            requestPermissions: true,
        });

        firebase.database().ref('/').on('child_changed', (snapshot) => {

            firebase.database().ref('/').once('value').then(response => {
                console.log(" email: " + this.state.email);
                this.setState({requestsObj: response.val().requests})
            })

        });

        firebase.database().ref('/requests/').on('child_changed', (snapshot) => {

         
            let notification;
            firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/")
                .once('value').then(response => {
                notification = response.val().notification;
                if (notification) {

                    const obj = snapshot.val();

                    if (obj) {
                        if (obj.acceptedBy !== "" && obj.email == this.state.email && !obj.completed) {
                            const acceptorUID = obj.acceptedBy;
                            let acceptorName = "No name";
                            firebase.database().ref('/users/' + acceptorUID + '/').once('value')
                                .then(response => {
                                    acceptorName = response.val().firstName;
                                    DropDownHandler.dropDown.alertWithType('success', 'Notification from GETit',
                                        'Your request ' + obj.item + " is accepted by " + acceptorName);
                                    PushNotification.localNotification({
                                        title: "Notification from GETit", // (optional)
                                        message: obj.item + " is accepted", // (required)
                                        foreground: true
                                    });
                                });
                        }

                    }
                }

            });


        })

    }

    shouldDisplayOpenLink = (item) => {
        if (item.link === '') {
            return {
                height: 0
            }
        } else {
            return {
                flex: 1,
                alignSelf: 'stretch',
                backgroundColor: '#fff',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#007aff',
                marginLeft: 5,
                marginRight: 5,
                marginBottom: 5,
            }
        }

    };

    shouldShowText = (item) => {
        if (item.link === '') {
            return ''
        } else {
            return 'Open Link'
        }
    };

    retView = ({item}) => {
        /*
            If order has been accepted, show accepted message else show edit button
         */
        console.log({item});
        console.log(this.state.requestsObj);
        if (item.completed == true) {
            return (
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.textStyle}>
                        This order is complete!
                    </Text>
                   
                    
                </View>
            )
        } else if (item.acceptedBy != "") {
            let message = "Order has been accepted by\n" + item.acceptorName;
            return (
                <View sle={{alignItems: 'center'}}>
                    <Text style={styles.textStyle}>
                        {message}
                    </Text>
                    
            
                </View>
            )
        } else {
            return (
                <View>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => {
                        if (item.acceptedBy !== "") {
                            Alert.alert(
                                'Alert!',
                                'The request has already been accepted. You cannot edit it now.',
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
                            item.addresses = this.state.addresses;
                            this.props.navigation.navigate('editRequest', {requestItem: item});
                        }
                    }
                    }>
                    <Text style={styles.textStyle}>Edit</Text>
                </TouchableOpacity>
                
                </View>
            )
        }
    };

    verifyView = ({item}) => {
        if(item.acceptedBy!=""){
            return (
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => {
                        this.props.navigation.navigate('verify', {item: item});
                    }}>
                    <Text style={styles.textStyle}>Verify Order</Text>
                </TouchableOpacity>
            );
        }
    };


    renderItem = ({item}) => (

        <Card style={{margin: 7, flex: 1, padding: 6, borderRadius: 10}} elevation={4}>
            <View>

                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}>
                    <View style={{flex: 0.75}}>
                        <Text style={{textAlign: 'left', fontSize: 30, fontWeight: 'bold'}}>{item.item}</Text>
                    </View>
                    <View style={{flex: 0.25, paddingTop: 8}}>
                        <Text style={{textAlign: 'center', fontSize: 20}}>${item.price}</Text>
                    </View>
                </View>


                <View style={{margin: 3, flex: 1}}>
                    <Text style={{textAlign: 'center'}}>{item.description}</Text>
                </View>

                <View style={{margin: 3, flex: 1}}>
                    <Text style={{textAlign: 'center', fontStyle: 'italic'}}>[{item.instructions}]</Text>
                </View>


                <View style={{flex: 1}}>
                    <TouchableOpacity
                        style={this.shouldDisplayOpenLink(item)}
                        onPress={() => {
                            if (item.link) {
                                console.log("LINK: " + item.link)
                                Linking.openURL(item.link).catch((error => alert("Link is not valid\n" + item.link)))
                            }
                        }}>
                        <Text style={styles.textStyle}>{this.shouldShowText(item)}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex: 1}}>
                    {this.retView({item})}
                </View>
                
                <View>
                    {this.verifyView({item})}
                </View>
            </View>
        </Card>


    );


    loadRequests = () => {

        if (this.state.requestsObj) {
            var adds = [];
            Object.keys(this.state.requestsObj).forEach((key, index) => {
                    if (this.state.requestsObj[key].email == this.state.email && this.state.requestsObj[key].completed == false) {
                        adds.push(this.state.requestsObj[key]);
                    }
                }
            );

            let keyExtractor = (item, index) => index;

            return (
                <View style={{flex: 1}}>
                    <FlatList
                        data={adds}
                        renderItem={this.renderItem}
                        keyExtractor={this.keyExtractor}
                    />
                </View>

            )

        } else {
            return (
                <View style={{flex: 1}}>
                    <Text>NO REQUESTS</Text>
                </View>

            )
        }


    };

    render() {

        return (

            <View style={{flex: 1}} testID="addRequestPage">
                <NavigationEvents onDidFocus={() => {
                    firebase.database().ref('/').once('value').then(response => {
                        this.setState({requestsObj: response.val().requests})
                    })
                }}
                />
                <Card style={styles.topCard} elevation={5}>
                    <Card.Content style={{flex: 1}}>
                        {this.loadRequests()}
                    </Card.Content>
                </Card>
                <FAB
                    icon={"add"}
                    small
                    style={styles.fab}
                    testID="addRequestbutton"
                    onPress={() => {

                        this.props.navigation.navigate('addRequest', {requestItem: null});
                    }}
                />

            </View>

        );
    }
}

const styles = {
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },

    topCard: {
        margin: 10,
        flex: 1.5,
    },

    textStyle: {
        textAlign: 'center',
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
    },

    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
    },
     centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },


};


export default Requests;

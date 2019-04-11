import React, {Component} from 'react';
import {FlatList, Linking, PushNotificationIOS, Text, TouchableOpacity, View} from 'react-native';
import {Card, FAB} from 'react-native-paper'
import firebase from "firebase";
import PushNotification from 'react-native-push-notification'
import {NavigationEvents} from 'react-navigation';
import DropdownAlert from 'react-native-dropdownalert';
import DropDownHandler from './DropDownHandler';


class Requests extends Component {

    state = {
        email: '',
        requestsObj: [],
        visible: false
    };

    

    componentWillMount() {
        
        const u = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + u + '/').once('value')
            .then(response => {
                this.setState({
                    email: response.val().email,
                    addresses: response.val().addresses,
                });
            })
        firebase.database().ref('/').once('value').then(response => {
            this.setState({requestsObj: response.val().requests})
        })

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

        firebase.database().ref('/requests/').on('child_changed', (snapshot) => {


            const obj = snapshot.val();


            if (obj) {

                if (obj.completed === true && obj.email === this.state.email) {
                    DropDownHandler.dropDown.alertWithType('success', 'Notification from GETit', obj.item + " is completed");
                    PushNotification.localNotification({
                        title: "Notification from GETit", // (optional)
                        message: obj.item + " is completed", // (required)
                        foreground: true
                    });
                }

                else if (obj.acceptedBy !== "" && obj.email === this.state.email) {
                    DropDownHandler.dropDown.alertWithType('success', 'Notification from GETit', obj.item + " is accepted");
                    PushNotification.localNotification({
                        title: "Notification from GETit", // (optional)
                        message: obj.item + " is accepted", // (required)
                        foreground: true
                    });
                }

            }


        })

    }

    shouldDisplayOpenLink = (item) =>{
     if(item.link === ''){
		 return {
			height: 0
		 }
	 }else {
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

    shouldShowText = (item) =>{
        if(item.link === ''){
		 return ''
	 }else {
		 return 'Open Link'
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
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                            item.addresses = this.state.addresses
                            this.props.navigation.navigate('editRequest', {requestItem: item});
                        }
                        }>
                        <Text style={styles.textStyle}>Edit</Text>
                    </TouchableOpacity>
                </View>
              
                    
            </View> 
        </Card>


    );


    loadRequests = () => {

        if (this.state.requestsObj) {
            var adds = [];
            Object.keys(this.state.requestsObj).forEach((key, index) => {
                    if (this.state.requestsObj[key].email === this.state.email) {
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

            <View style={{flex: 1}}>
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
    },


};


export default Requests;

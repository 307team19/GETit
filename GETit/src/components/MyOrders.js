import React, {Component} from 'react';
import {FlatList, Linking, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import firebase from "firebase";
import {NavigationEvents, StackNavigator} from "react-navigation";
import {Card} from "react-native-paper";


class Orders extends Component {


    static navigationOptions = {
        title: 'My Orders',
    };

    state = {
        requests: [],
        email: '',
        uid: ''
    };

    componentWillMount() {

        const u = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + u + '/').once('value')
            .then(response => {
                this.setState({
                    email: response.val().email,
                    uid: u
                });
            });

        firebase.database().ref('/').once('value').then(response => {
            this.setState({requests: response.val().requests})
        })

        

    }

  

    loadMyRequests = () => {
        console.log(this.state.uid);
        console.log(this.state.requests);
        if (this.state.requests) {
            var adds = [];
            Object.keys(this.state.requests).forEach((key, index) => {
                    if ((this.state.requests[key].acceptedBy === this.state.uid) && (this.state.requests[key].completed == false)) {
                        adds.push(this.state.requests[key]);
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
                    <Text>NO ORDERS</Text>
                </View>

            )
        }

    };

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

    renderItem = ({item}) => (

        <Card style={{margin: 3, flex: 1, padding: 6, borderRadius: 10}} elevation={4}>
            <View>
                <View style={{
                    // flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    padding: 0
                }}>
                    <View style={{flex: 0.75}}>
                        <Text style={{textAlign: 'left', fontSize: 30, fontWeight: 'bold'}}>{item.item}</Text>
                    </View>
                    <View style={{flex: 0.25, paddingTop: 8}}>
                        <Text style={{textAlign: 'center', fontSize: 20}}>${item.price}</Text>
                    </View>
                </View>
                <View style={{margin: 3}}>
                    <Text style={{textAlign: 'center'}}>{item.description}</Text>
                </View>
                <View style={{margin: 3}}>
                    <Text style={{textAlign: 'center', fontStyle: 'italic'}}>[{item.instructions}]</Text>
                </View>
                <View style={{flexDirection: 'column', padding: 0}}>
                    <TouchableOpacity
                        style={this.shouldDisplayOpenLink(item)}
                        onPress={() => {
                            if (item.link) {
                                console.log("LINK: " + item.link);
                                Linking.openURL(item.link).catch((error => alert("Link is not valid\n" + item.link)))
                            }
                        }}>
                        <Text style={styles.textStyle}>{this.shouldShowText(item)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                            this.props.navigation.navigate('orderdetails', {details: item});
                        }}>
                        <Text style={styles.textStyle}>Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Card>


    );

    

    render() {

        return (
            <View style={{flex: 1}} testID="myOrdersPage">
                <NavigationEvents onDidFocus={() => {
                    firebase.database().ref('/').once('value').then(response => {
                        this.setState({requests: response.val().requests})
                    })
                }}
                />
                <Card style={styles.topCard} elevation={5}>
                    <ScrollView ref="scroll">
                        
                        <View>
                            <Card.Content style={{flex: 1}}>
                                {this.loadMyRequests()}
                            </Card.Content>
                        </View>
                    </ScrollView>
                </Card>
            </View>
        );
    }
}

const styles = {
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

    textStyleTop: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 0
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


};


export default Orders;

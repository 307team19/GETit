import React, {Component} from 'react';
import {FlatList, Linking, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import firebase from 'firebase';
import {Card} from "react-native-paper";


class RequestHistory extends Component {

    static navigationOptions = {
        title: 'Request History',
    };


    state = {
        email: "",
        requests: []
    };

    onButtonPressed() {
        console.log(this.state.requests);
    }

    componentWillMount(): void {

        const u = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + u + '/').once('value')
            .then(response => {
                this.setState({
                    email: response.val().email,
                });
            });
        firebase.database().ref('/').once('value').then(response => {
            this.setState({requests: response.val().requests})
        });
        console.log(this.state.requests);


    }


    shouldDisplayOpenLink = (item) => {
        if (item.link == '') {
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
                height: 35
            }
        }

    }

    shouldShowText = (item) => {
        if (item.link == '') {
            return ''
        } else {
            return 'Open Link'
        }
    }

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
                            this.props.navigation.navigate('addRequest', {requestItem: item})
                        }}
                    >
                        <Text style={styles.textStyle}>Reorder</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Card>


    );


    loadRequests = () => {

        if (this.state.requests) {
            var adds = [];
            Object.keys(this.state.requests).forEach((key, index) => {
                    console.log(this.state.requests[key])
                    console.log(this.state.requests[key].email)
                    if (this.state.requests[key].email === this.state.email) {
                        adds.push(this.state.requests[key]);
                    }
                }
            );

            keyExtractor = (item, index) => index


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
            <ScrollView style={styles.containerStyle}>
                <Card style={styles.topCard} elevation={5}>
                    <Card.Content style={{margin: 10, flex: 1,}}>
                        {this.loadRequests()}
                    </Card.Content>
                </Card>
            </ScrollView>
        );
    }
}

const styles = {

    containerStyle: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: 'white'
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

export default RequestHistory;

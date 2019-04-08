import React, {Component} from 'react';
import {FlatList, Linking, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import firebase from "firebase";
import {NavigationEvents, StackNavigator} from "react-navigation";
import {Card, Button} from "react-native-paper";
import Collapsible from 'react-native-collapsible';

class Orders extends Component {


    static navigationOptions = {
        title: 'Orders',
    };
    
    state = {
        requests: [],
        email:'',
        collapsedAll: false,
        collapsedMy: false
    };

    componentWillMount() {

        const u = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + u + '/').once('value')
            .then(response => {
                this.setState({email: response.val().email,});
            });

        firebase.database().ref('/').once('value').then(response => {
            this.setState({requests: response.val().requests})
        })
    }

    loadRequests = () => {
        console.log(this.state.requests);
        if (this.state.requests) {
            var adds = [];
            Object.keys(this.state.requests).forEach((key, index) => {
                    if (!(this.state.requests[key].email === this.state.email)) {
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
                    <Text>NO ORDERS</Text>
                </View>

            )
        }

    };

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
                <View style={{flex: 1, flexDirection: 'column'}}>
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
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                            this.props.navigation.navigate('orderdetails',{details: item});
                        }}>
                        <Text style={styles.textStyle}>Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Card>


    );

    toggleExpandedAll = () => {
        // if(this.state.collapsedMy==false){
        //     this.setState({collapsedMy: !this.state.collapsedMy, collapsedAll: !this.state.collapsedAll})
        // }else {
        //     this.setState({collapsedAll: !this.state.collapsedAll});
        // }
        console.log("collapsedAll is "+this.state.collapsedAll);
        console.log("collapsedMy is "+this.state.collapsedMy);
        if(!this.state.collapsedAll){
            this.setState({collapsedAll: true});
        }else{
            this.setState({collapsedAll: false});
        }
        // this.setState({collapsedAll: !this.state.collapsedAll});
        console.log("collapsedAll is "+this.state.collapsedAll);
        console.log("collapsedMy is "+this.state.collapsedMy);
    };

    toggleExpandedMy = () => {
        // if(this.state.collapsedAll==false){
        //     this.setState({collapsedAll: !this.state.collapsedAll, collapsedMy: !this.state.collapsedMy})
        // }else {
        //     this.setState({collapsedMy: !this.state.collapsedMy});
        // }
        console.log("collapsedAll is "+this.state.collapsedAll);
        console.log("collapsedMy is "+this.state.collapsedMy);
        if(this.state.collapsedMy==false){
            this.setState({collapsedMy: true});
        }else{
            this.setState({collapsedMy: false});
        }
        // this.setState({collapsedMy: !this.state.collapsedMy});
        // if(this.state.collapsedMy==false){
        //     console.log("About to scroll");
        //     this.refs.scroll.scrollToEnd();
        // }
        console.log("collapsedAll is "+this.state.collapsedAll);
        console.log("collapsedMy is "+this.state.collapsedMy);
    };

    render() {

        return (
            <View style={{flex: 1}}>
                <NavigationEvents onDidFocus={() => {
                    firebase.database().ref('/').once('value').then(response => {
                        this.setState({requests: response.val().requests})
                    })
                }}
                />
                <Card style={styles.topCard} elevation={5}>
                    <ScrollView ref="scroll">
                        <Card>
                            <View style={{alignItems: 'center'}, {backgroundColor:'#007aff'}}>
                                <TouchableOpacity onPress={this.toggleExpandedAll} style={{flex:1}}>
                                    <Text style={styles.textStyleTop}>
                                        Available Orders
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Card>
                        {/*<ScrollView>*/}
                            <Collapsible collapsed={this.state.collapsedAll} align='center'>
                                <Card.Content style={{flex: 1}}>
                                    {this.loadRequests()}
                                </Card.Content>
                            </Collapsible>
                        {/*</ScrollView>*/}
                        <Card>
                            <View style={{alignItems: 'center'}, {backgroundColor:'#007aff'}}>
                                <TouchableOpacity onPress={this.toggleExpandedMy} style={{flex:1}}>
                                    <Text style={styles.textStyleTop}>
                                        My Orders
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Card>
                        {/*<ScrollView>*/}
                            <Collapsible collapsed={this.state.collapsedMy} align='center'>
                                <Card.Content style={{flex: 1}}>
                                    {this.loadRequests()}
                                </Card.Content>
                            </Collapsible>
                        {/*</ScrollView>*/}
                    </ScrollView>
                    {/*<ScrollView>*/}
                        {/*<Collapsible collapsed={this.state.collapsedMy} align='center'>*/}
                            {/*<Card.Content style={{flex: 1}}>*/}
                                {/*{this.loadRequests()}*/}
                            {/*</Card.Content>*/}
                        {/*</Collapsible>*/}
                    {/*</ScrollView>*/}
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

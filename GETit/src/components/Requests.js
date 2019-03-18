import React, {Component} from 'react';
import {FlatList, Text, View, Linking} from 'react-native';
import {Card, FAB, Button} from 'react-native-paper'
import firebase from "firebase";
import {ListItem} from 'react-native-elements'
import {NavigationEvents} from 'react-navigation';

class Requests extends Component {

    state = {
        email: '',
        requestsObj: []
    };


    componentWillMount() {
        const u = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + u + '/').once('value')
            .then(response => {
                this.setState({
                    email: response.val().email,
                });
            });
        firebase.database().ref('/').once('value').then(response => {
            this.setState({requestsObj: response.val().requests})
        })


    }

    

    renderItem = ({item}) => (
        <Card style={styles.topCard} elevation={5}>
            <Card.Content style={{margin: 10, flex: 1,}}>
                <ListItem
                    title={
                        <View style={{backgroundColor: 'yellow', flex: 1}}>
                            <Text>{item.item}</Text>
                        </View>
                    }
                    subtitle={
                        <View style={{flex: 1}}>
                            <Text>{item.description}</Text>
                            <Button onPress={()=>{
                                if(item.link){
                                    console.log("LINK: "+ item.link)
                                    Linking.openURL(item.link).catch((err) => console.error('An error occurred', err));
                                }                        
                            }}>
                                Open link
                            </Button>
                        </View>
                    }
                    rightTitle={item.price}

                />
            </Card.Content>
        </Card>


    );


    loadRequests = () => {

        if(this.state.requestsObj){
             var adds = [];
        Object.keys(this.state.requestsObj).forEach((key, index) => {
                if(this.state.requestsObj[key].email===this.state.email) {
                    adds.push(this.state.requestsObj[key]);
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

        }else {
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
                    <Card.Title title="CURRENT REQUESTS"/>
                    <Card.Content style={{margin: 10, flex: 1,}}>
                        {this.loadRequests()}
                    </Card.Content>
                </Card>
                <FAB
                    icon={"add"}
                    small
                    style={styles.fab}
                    onPress={() => {
                        this.props.navigation.navigate('addRequest');
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


};


export default Requests;
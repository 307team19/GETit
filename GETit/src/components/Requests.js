import React, {Component} from 'react';
import {FlatList, Linking, Text, View} from 'react-native';
import {Button, Card, FAB} from 'react-native-paper'
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
                    addresses: response.val().addresses,
                });
            });
        firebase.database().ref('/').once('value').then(response => {
            this.setState({requestsObj: response.val().requests})
        })


    }

    shouldDisplayOpenLink = (item) =>{
     if(item.link == ''){
		 return {
			 height: 0
		 }
	 }else {
		 return {
			 height: 35
		 }
	 }

	}

    renderItem = ({item}) => (
        // <Card style={{margin: 10,flex: 1, padding: 0}} elevation={5}>
        //     <Card.Content style={{ flex: 1}}>
        //         <ListItem
        //             title={
        //                 <View>
        //                     <Text style = {{fontSize: 30, textAlign: 'center',fontWeight: 'bold',}}>{item.item}</Text>
        //                 </View>
        //             }
        //             subtitle={
        //                 <View style={{flex: 1}}>
        //                      <View style={{flex: 1}}>
        //                         <Text>{"Description: " + item.description}</Text>
        //                     </View>
        //                     <View style={{flex: 1}}>
        //                         <Text>{"Instructions: " + item.instructions}</Text>
        //                     </View>
        //                     <Button style = {this.shouldDisplayOpenLink(item)} onPress={()=>{
        //                         if(item.link){
        //                             console.log("LINK: "+ item.link)
        //                             Linking.openURL(item.link).catch((error => alert("Link is not valid\n" + item.link)))
        //                         }
        //                     }}>
        //                         Open link
        //                     </Button>

        //                     <Button onPress={()=>
        //                         {
        //                             item.addresses = this.state.addresses
        //                             this.props.navigation.navigate('editRequest', {requestItem: item});
        //                         }
        //                     }>
        //                         Edit
        //                     </Button>
        //                 </View>
        //             }
                    
        //             rightTitle={
        //                 <View>
        //                     <Text>$ {item.price}</Text>
        //                 </View>
        //             }
        //         />
        //     </Card.Content>
        // </Card>

        <Card style={{margin: 7,flex: 1, padding: 6, borderRadius: 10}} elevation={4}>
            <View>
                <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style = {{flex: 0.75}}>
                        <Text style = {{textAlign: 'left', fontSize: 30, fontWeight: 'bold'}}>{item.item}</Text>
                    </View>
                    <View style = {{flex: 0.25, paddingTop: 8}}>
                        <Text style = {{textAlign: 'center', fontSize: 20}}>${item.price}</Text>
                    </View>
                </View>


                <View style = {{margin: 3, flex: 1}}>
                        <Text style = {{textAlign: 'center'}} >{item.description}</Text>       
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

            <View style={{flex: 1}}>
                <NavigationEvents onDidFocus={() => {
                    firebase.database().ref('/').once('value').then(response => {
                        this.setState({requestsObj: response.val().requests})
                    })
                }}
                />
                <Card style={styles.topCard} elevation={5}>
                    <Card.Title title="CURRENT REQUESTS"  titleStyle = {{textAlign: 'center'}}/>
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


};


export default Requests;
import React, {Component} from 'react';
import {Text, ScrollView, View, FlatList, Linking} from 'react-native';
import RequestComponent from './RequestComponent'
import firebase from 'firebase';
import {Button, Card} from "react-native-paper";
import {ListItem} from "react-native-elements";


class RequestHistory extends Component {

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

	reorder=(item)=>{
		
		var refpush = firebase.database().ref("requests/").push()
        var unikey = refpush.key
        var userRef = firebase.database().ref("requests/" + unikey + "/");

        //TODO this code is creepy, edit address separately

        
            userRef.set(
                {
                    item: item.item,
                    price: item.price,
                    description: item.description,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    email: item.email,
                    phoneNumber: item.phoneNumber,
                    address: item.address,
                    link: item.link,
                    instructions: item.instructions,
                    unikey: unikey,
                }
            ).then((data) => {
                console.log('Synchronization succeeded');
                //this.props.navigation.goBack();

            }).catch((error) => {
                console.log(error)
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
		<Card style={styles.topCard} elevation={5}>
			<Card.Content style={{margin: 10, flex: 1}}>
				<ListItem
					title={
						<View style={{backgroundColor: 'yellow'}}>
							<Text>{item.item}</Text>
						</View>
					}
					subtitle={
						 <View style={{flex: 1}}>
                            <View style={{backgroundColor: 'orange', flex: 1}}>
                                <Text>{item.description}</Text>
                            </View>
                            <View style={{backgroundColor: 'green', flex: 1}}>
                                <Text>{item.instructions}</Text>
                            </View>
                            <Button style = {this.shouldDisplayOpenLink(item)} onPress={()=>{
                                if(item.link){
                                    console.log("LINK: "+ item.link)
                                    Linking.openURL(item.link).catch((err) => console.error('An error occurred', err));
                                }                        
                            }}>
                                Open link
                            </Button>
							<Button onPress={()=>{
								this.props.navigation.navigate('addRequest', {requestItem: item})
							}}>
							   Reorder
							</Button>
                        </View>
					}
					rightTitle={item.price}

				/>
			</Card.Content>
		</Card>


	);


	loadRequests = () => {

		var adds = [];
		Object.keys(this.state.requests).forEach((key, index) => {
				console.log(this.state.requests[key])
				console.log(this.state.requests[key].email)
				if(this.state.requests[key].email===this.state.email) {
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


	};

	render() {
		return (
			<ScrollView style={styles.containerStyle}>
				<Card style={styles.topCard} elevation={5}>
					<Card.Title title="REQUEST HISTORY"/>
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
};

export default RequestHistory;
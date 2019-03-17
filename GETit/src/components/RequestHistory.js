import React, {Component} from 'react';
import {Text, ScrollView, View, FlatList} from 'react-native';
import RequestComponent from './RequestComponent'
import firebase from 'firebase';
import {Button, Card} from "react-native-paper";
import {ListItem} from "react-native-elements";


class RequestHistory extends Component {

	// state = {requests: [
	// 		{
	// 			item: 'Yo',
	// 			price: '123.45',
	// 			descr: 'Description 1',
	// 			addr: 'Address 1'
	// 		},
	// 		{
	// 			item: 'Lo',
	// 			price:'67.98',
	// 			descr: 'Description 2',
	// 			addr: 'Address 2'
	// 		}
	// 	]};
	//
	// renderRequestHistory() {
	//
	// 	renderedList = this.state.requests.map(temp => <RequestComponent key = {temp.item} request = {temp}/>);
	//
	// 	return renderedList;
	// }

	state = {
		email: "",
		requests: []
	};

	onButtonPressed() {
		console.log(this.state.requests);
		// console.log(this.state.requests[0].email);
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

	renderItem = ({item}) => (
		<Card style={styles.topCard} elevation={5}>
			<Card.Content style={{margin: 10, flex: 1,}}>
				<ListItem
					title={
						<View style={{backgroundColor: 'yellow'}}>
							<Text>{item.item}</Text>
						</View>
					}
					subtitle={item.description}
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
				{/*<Text>{this.state.email}</Text>*/}
				{/*/!*{this.renderRequestHistory()}*!/*/}
				{/*<Button*/}
					{/*style={styles.buttonContainedStyle}*/}
					{/*onPress={this.onButtonPressed.bind(this)}*/}
				{/*>*/}
					{/*<Text>*/}
						{/*Console log*/}
					{/*</Text>*/}
				{/*</Button>*/}

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
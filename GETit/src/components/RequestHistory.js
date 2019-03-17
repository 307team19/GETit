import React, {Component} from 'react';
import {Text, ScrollView} from 'react-native';
import RequestComponent from './RequestComponent'
import firebase from 'firebase';
import {Button} from "react-native-paper";


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

	render() {
		return (
			<ScrollView style={styles.containerStyle}>
				<Text>{this.state.email}</Text>
				{/*{this.renderRequestHistory()}*/}
				<Button
					style={styles.buttonContainedStyle}
					onPress={this.onButtonPressed.bind(this)}
				>
					<Text>
						Console log
					</Text>
				</Button>

			</ScrollView>
		);
	}
}

const styles = {
	containerStyle: {
		paddingTop: 20,
		flex: 1,
		backgroundColor: 'white'
	}
};

export default RequestHistory;
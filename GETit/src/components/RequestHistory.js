import React, {Component} from 'react';
import {Text, ScrollView} from 'react-native';
import RequestComponent from './RequestComponent'


class RequestHistory extends Component {

	state = {requests: [
			{
				item: 'Yo',
				price: '123.45',
				descr: 'Description 1',
				addr: 'Address 1'
			},
			{
				item: 'Lo',
				price:'67.98',
				descr: 'Description 2',
				addr: 'Address 2'
			}
		]};

	renderRequestHistory() {

		renderedList = this.state.requests.map(temp => <RequestComponent key = {temp.item} request = {temp}/>);

		return renderedList;
	}

	render() {
		return (
			<ScrollView style={styles.containerStyle}>
				<Text>Requests History</Text>
				{this.renderRequestHistory()}
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
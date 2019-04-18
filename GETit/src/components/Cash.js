import React, {Component} from 'react';
import paperTheme from './common/paperTheme';
import {Provider as PaperProvider} from 'react-native-paper';
import {Text, View} from "react-native";
import firebase from "./QRTest";

class Cash extends Component {

	requestDetails = {};

	componentWillMount() {
		this.requestDetails = this.props.navigation.state.params.requestDetails;
		console.log("Cash");
		console.log(this.requestDetails.item.price);
		console.log("Acceptor name");
		console.log(this.requestDetails.item.acceptorName);
	}

	render() {
		return (
			<PaperProvider theme={paperTheme}>
				<View>
					<Text>
						Paid
					</Text>
					<Text>
						{this.requestDetails.item.price}
					</Text>
					<Text>
						to
					</Text>
					<Text>
						{this.requestDetails.item.acceptorName}
					</Text>
				</View>
			</PaperProvider>
		);

	}
}

const styles = {
	textInputStyle: {
		flex: 8
	},
	buttonContainedStyle: {
		justifyContent: 'center',
		flex: 1
	},
	paidStyle: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 200,
		flex: 1
	},
	cashStyle: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 400,
		color:'#1eaaf1',
		flex: 1
	},
};

export default Cash;

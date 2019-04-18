import React, {Component} from 'react';
import paperTheme from './common/paperTheme';
import {Provider as PaperProvider} from 'react-native-paper';
import {Text, View} from "react-native";
import firebase from "./QRTest";

class Cash extends Component {

	componentWillMount() {
		let requestDetails = this.props.navigation.state.params.requestDetails;
		console.log("Cash");
		console.log(requestDetails.item.price);
		console.log("Acceptor name");
		console.log(requestDetails.item.acceptorName);
	}

	render() {
		return (
			<PaperProvider theme={paperTheme}>
				<View>
					<Text>
						Paid
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
	textStyle: {
		textAlign: 'center',
		fontWeight: 'bold',
		flex: 1
	},
};

export default Cash;

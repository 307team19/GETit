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
			<View style = {{flex: 1}}>
				<Text style={styles.textStyleNormal}>
					Paid
				</Text>
				<Text style={styles.textStyleCash}>
					{this.requestDetails.item.price}
				</Text>
				<Text style={styles.textStyleNormal}>
					to
				</Text>
				<Text style={styles.textStyleName}>
					{this.requestDetails.item.acceptorName}
				</Text>
			</View>
		);

	}
}

const styles = {
	textStyleNormal: {
		textAlign: 'center',
		flex: 1,
		fontSize: 40,
		paddingBottom: 2,
	},
	textStyleCash: {
		textAlign: 'center',
		flex: 1,
		fontSize: 120,
		color: '#1eaaf1',
		fontWeight: 'bold',
		paddingBottom: 2,
	},
	textStyleName: {
		textAlign: 'center',
		flex: 1,
		fontSize: 60,
		color: '#1eaaf1',
		paddingBottom: 2,
	},
};

export default Cash;

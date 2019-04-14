import React, {Component} from 'react';
import {Text, View} from "react-native";

class QRTest extends Component {

	render() {
		return (
			<View>
				<Text>QR Test</Text>
			</View>
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

export default QRTest;

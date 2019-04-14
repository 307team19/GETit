import React, {Component} from 'react';
import { Image, Text, View } from "react-native";

class QRTest extends Component {

	url = "http://www.barcodes4.me/barcode/qr/qr.png?size=10&value=";
	code = "shiv.com";

	render() {
		return (
			<View>
				<Text>QR Test</Text>
				<Image
					style = {styles.imageStyle}
					source={{
						uri: this.url + this.code
					}}/>
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
	imageStyle: {
		height: 350,
		margin: 10
	},
};

export default QRTest;

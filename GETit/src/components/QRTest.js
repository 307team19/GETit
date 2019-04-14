import React, {Component} from 'react';
import { Image, Text, View } from "react-native";

class QRTest extends Component {

	url = "http://www.barcodes4.me/barcode/qr/qr.png?size=10&value=";
	code = "";

	componentWillMount() {
		let orderDetail = this.props.navigation.state.params.orderDetails;

		console.log("Order Details: ");
		console.log(orderDetail.details.unikey);
		console.log(orderDetail.details.acceptedBy);

		this.code = orderDetail.details.unikey + orderDetail.details.acceptedBy + ".com";

		console.log("Code: " + this.code);

	}

	render() {
		return (
			<View>
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

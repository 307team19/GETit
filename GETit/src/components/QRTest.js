import React, {Component} from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import firebase from "firebase";

class QRTest extends Component {

	url = "http://www.barcodes4.me/barcode/qr/qr.png?size=10&value=";
	code = "";

	componentWillMount() {
		let orderDetail = this.props.navigation.state.params.orderDetails;
		this.code = orderDetail.details.unikey + ".com";
		console.log("Code: " + this.code);

		  firebase.database().ref('/requests/'+orderDetail.details.unikey).on('child_changed', (snapshot) => {

            this.props.navigation.navigate('orders');

        });

	}

	render() {
		return (
			<View>
				<Image
					style = {styles.imageStyle}
					source={{
						uri: this.url + this.code
					}}/>
				<TouchableOpacity
					style={{
						...styles.boxStyle,
						borderColor: '#5500e9',
						margin: 10,
						backgroundColor: '#5500e9'
					}}
					onPress={() => {
						this.props.navigation.navigate('tabscreen');
					}}>
					<Text numberOfLines={5} ellipsizeMode={'tail'} style={{
						textAlign: 'center',
						fontSize: 30,
						margin: 3,
						fontWeight: 'bold',
						color: 'white'
					}}>Finish</Text>
				</TouchableOpacity>
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

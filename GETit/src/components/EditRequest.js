import React, {Component} from 'react';
import {View} from "react-native";
import paperTheme from "./common/paperTheme";
import { Button, Provider as PaperProvider, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-material-dropdown";
import firebase from "firebase";

class EditRequest extends Component {

	state = {
		email: '',
		phoneNumber: '',
		firstName: '',
		lastName: '',
		addresses: {},
		photoURL: '',
		address: '',
		item: '',
		price: '',
		description: '',
		selectedAddress: '',
		GPSLocation: '',
		instructions: '',
		link: '',
	};

	//TODO: request item passed in props as item, change to request ID ASAP

	componentWillMount() {
		console.log("in edit requests");

		//getting request details
		var requestItem = this.props.navigation.state.params.requestItem;
		this.setState(requestItem);
		console.log(this.state);
	}

	confirmChanges = () => {
		console.log("confirm changes");

		firebase.database().ref('/requests/'+ this.state.item + "/").update({
			address: this.state.address,
			description: this.state.description,
			instructions: this.state.instructions,
			link: this.state.link,
			price: this.state.price
		})

		//TODO: REDO ENTIRE FIREBASE IMPLEMENTATION HERE WITH REQUEST ID
	};

	render()
	{
		var adds = [];
		//TODO: GET ADDRESSES AND PUT IN ARRAY

		adds.push({
			value: 'Current Location'
		});

		return (
			<PaperProvider theme={paperTheme}>
				<View style={{flexDirection: 'row', margin: 10}}>
					<TextInput
						style={{flex: 3, margin: 10}}
						label='Item'
						mode='outlined'
						value={this.state.item}
						onChangeText={textString => this.setState({item: textString})}
					/>
					<TextInput
						style={{flex: 1, margin: 10}}
						label='Price'
						mode='outlined'
						value={this.state.price}
						onChangeText={textString => this.setState({price: textString})}
					/>
				</View>
				<Dropdown
					label='Addresses'
					data={adds}
					containerStyle={{margin: 10}}
					value={this.state.address}
					onChangeText={text => this.setState({address: text})}
				/>
				<TextInput
					style={{margin: 10}}
					label='Description'
					mode='outlined'
					value={this.state.description}
					onChangeText={textString => this.setState({description: textString})}
				/>
				<TextInput
					style={{margin: 10}}
					label='Special Instructions'
					mode='outlined'
					value={this.state.instructions}
					onChangeText={textString => this.setState({instructions: textString})}
				/>
				<TextInput
					style={{margin: 10}}
					label='Link'
					mode='outlined'
					value={this.state.link}
					onChangeText={textString => this.setState({link: textString})}
				/>
				<Button onPress={this.confirmChanges}>
					Confirm Changes
				</Button>
			</PaperProvider>
		);
	};
};

export default EditRequest;
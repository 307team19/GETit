import React, {Component} from 'react';
import {View} from "react-native";
import paperTheme from "./common/paperTheme";
import { Button, Provider as PaperProvider, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-material-dropdown";
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';

class EditRequest extends Component {

	requestItem: *;

	//request item passed in props as item

	componentWillMount() {
		console.log("in edit requests");
		this.requestItem = this.props.navigation.state.params.requestItem;
		console.log(this.requestItem);
	}

	render()
	{
		var adds = [];

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
						value='Item'
						onChangeText={textString => this.setState({item: textString})}
					/>
					<TextInput
						style={{flex: 1, margin: 10}}
						label='Price'
						mode='outlined'
						value='Price'
						onChangeText={textString => this.setState({price: textString})}
					/>
				</View>
				<Dropdown
					label='Addresses'
					data={adds}
					containerStyle={{margin: 10}}
					value='Address'
					onChangeText={text => this.setState({address: text})}
				/>
				<TextInput
					style={{margin: 10}}
					label='Description'
					mode='outlined'
					value='Description'
					onChangeText={textString => this.setState({description: textString})}
				/>
				<TextInput
					style={{margin: 10}}
					label='Special Instructions'
					mode='outlined'
					value='Instructions'
					onChangeText={textString => this.setState({instructions: textString})}
				/>
				<TextInput
					style={{margin: 10}}
					label='Link'
					mode='outlined'
					value='https://google.com'
					onChangeText={textString => this.setState({link: textString})}
				/>
				<Button>
					Edit Request
				</Button>
			</PaperProvider>
		);
	};
};

export default EditRequest;
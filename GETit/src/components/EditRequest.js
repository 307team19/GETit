import React, {Component} from 'react';
import ReactNative, {Text, View} from "react-native";
import RequestHistory from "./RequestHistory";

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
		return (
			<View>
				<Text>Edit Request Screen</Text>
			</View>
		);
	};
};

export default EditRequest;
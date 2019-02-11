import React, {Component} from 'react';
import { View, Text} from 'react-native';
import { TextInput } from 'react-native-paper';

//class component which handles data
//has render function which returns same thing as functional component
//but outside of that render function, we can do some stuff with data also

/**
 * Gets user data in the form for sign up
 */
class SignUpForm extends Component {

	state = {
		text: ''
	};

	//render() method is automatically called whenever we call setState or during initialization
	render() {
		return (
			<View style = {styles.viewStyle}>
				<TextInput
					style = {styles.textInputStyle}
					label='Name'
					mode='outlined'
				/>
				<TextInput
					style = {styles.textInputStyle}
					label='Username'
					mode='outlined'
				/>
				<TextInput
					style = {styles.textInputStyle}
					label='Email'
					mode='outlined'
				/>
				<TextInput
					style = {styles.textInputStyle}
					label='Password'
					mode='outlined'
				/>
				<TextInput
					style = {styles.textInputStyle}
					label='Phone Number'
					mode='outlined'
				/>
			</View>
		);
	};
}

const styles = {

	viewStyle: {
		margin: 10,
		padding: 12,
		flex: 1,
	},

	textInputStyle: {
		marginBottom: 12
	}
};

export default SignUpForm;
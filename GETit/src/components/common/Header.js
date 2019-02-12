import React from 'react';
import {Text, View} from 'react-native';

//functional component which returns some JSX for viewing

/**
 * Gets headerText and returns a view with header
 * @param headerText, text of the header
 * @returns view of header
 */
const Header = (props) => {   //getting props from the function

	//getting the different designs from the main variable
	//we'll use these in html to set designs
	const {textStyle, viewStyle} = styles;

	return (
		<View style={viewStyle}>
			<Text style={textStyle}>{props.headerText}</Text>
		</View>
	);
};

//designs for different components
const styles = {

	//text design
	textStyle: {

		fontSize: 20
	},

	//view design
	viewStyle: {

		backgroundColor: '#f8f8f8',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 23,
		paddingBottom: 7,

		//ios shadow
		shadowOffset: {width: 0, height: 2},
		shadowColor: '#000',
		shadowOpacity: 0.3,
		shadowRadius: 8,

		//android shadow
		elevation: 3,
	}
};

export default Header;
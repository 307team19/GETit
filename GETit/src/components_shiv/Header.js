import React from 'react';
import {Text, View} from 'react-native';

//functional component which returns some JSX for viewing

/**
 * Gets headerText and returns a view with header
 * @param headerText, text of the header
 * @returns view of header
const Header = (props) => {   //getting props from the function

	//getting the different designs from the main variable
	//we'll use these in html to set designs
	const {viewStyle} = styles;

	return (
		<View style={viewStyle}>
			<Text>{props.headerText}</Text>
		</View>
	);
};

//designs for different components
const styles = {

	//view design
	viewStyle: {

		backgroundColor: '#f8f8f8'
	}
};

export default Header;
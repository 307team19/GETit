import React from 'react';
import { Text, View } from 'react-native';

const RequestComponent = (props) => {   //getting props from the function

	const request = props.request;

	return (
		<View>
			<Text style={styles.textD}>{request.item}</Text>
			<Text style={styles.textD}>{request.price}</Text>
			<Text style={styles.textD}>{request.descr}</Text>
			<Text style={styles.textD}>{request.addr}</Text>
		</View>
	);
};

const styles = {
	textD: {
		fontcolor: '#000',
		fontSize: 13,
		paddingTop: 3,
		paddingLeft: 5
	},
};

export default RequestComponent;
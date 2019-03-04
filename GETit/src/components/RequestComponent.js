import React from 'react';
import { Text, View } from 'react-native';
import { Card } from './common/Card'
import { CardSection } from './common/CardSection'

const RequestComponent = (props) => {   //getting props from the function

	const request = props.request;

	//TODO: Temporary design which sucks, need to change but it works
	return (
		<Card>
			<View>
				<CardSection>
					<Text style={styles.textD}>ITEM: </Text>
					<Text style={styles.textD}>{request.item}</Text>
					<Text style={styles.textD}>PRICE: </Text>
					<Text style={styles.textD}>{request.price}</Text>
					<Text style={styles.textD}>$</Text>
				</CardSection>
				<Text style={styles.textD}>DESCRIPTION: </Text>
				<Text style={styles.textD}>{request.descr}</Text>
				<View style = {{height: 10}}/>
				<Text style={styles.textD}>ADDRESS: </Text>
				<Text style={styles.textD}>{request.addr}</Text>
				<View style = {{height: 10}}/>
			</View>
		</Card>
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
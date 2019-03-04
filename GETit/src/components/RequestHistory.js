import React, {Component} from 'react';
import {Text, View} from 'react-native';


class RequestHistory extends Component {

	render() {
		return (
			<View style={styles.containerStyle}>
				<Text>Requests History</Text>
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		paddingTop: 20,
		flex: 1,
		backgroundColor: 'white'
	}
};

export default RequestHistory;
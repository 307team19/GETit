import React, {Component} from 'react';
import paperTheme from './common/paperTheme';
import {Provider as PaperProvider} from 'react-native-paper';
import {Text, View} from "react-native";

class Cash extends Component {

	render() {
		return (
			<PaperProvider theme={paperTheme}>
				<View>
					<Text>
						Cash Money
					</Text>
				</View>
			</PaperProvider>
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
};

export default Cash;

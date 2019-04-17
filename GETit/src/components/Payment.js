import React, {Component} from 'react';
import { Alert, Image, Text, View } from "react-native";

class Payment extends Component {

    state={
        item: {},
    }

	componentWillMount() {
        this.setState({item: this.props.navigation.state.params.item},()=>{
            console.log("item: " + this.state.item)
        })
        
	}



	render() {
		return (
			<View>
				<Text>PAYMENTS!</Text>
			</View>
		);
	}
}

const styles = {

};

export default Payment;

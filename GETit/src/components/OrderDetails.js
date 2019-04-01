import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import firebase from 'firebase';

class OrderDetails extends Component {

    state = {
		details: {},
	};

    componentWillMount(){
       this.setState({details: this.props.navigation.state.params.details})
    }

	

	render() {
		return (
			<ScrollView>
                <View style={{marginLeft: '1%', marginRight: '1%' }}>
                   <Text style={{textAlign: 'left', fontSize: 30, fontWeight: 'bold'}}>Item</Text>
                   <View style = {styles.boxStyle}>
                        <Text style = {{textAlign: 'left', fontSize: 25}}>{this.state.details.item}</Text>
                   </View>
                </View>
            </ScrollView>
		);
	};
}

const styles = {
   boxStyle: {
        flex: 1,
        marginTop: 7,
        marginBottom: 12,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        height: 35,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center',
    },
};

export default OrderDetails;
import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import firebase from 'firebase';

class OrderDetails extends Component {

    state = {
		details: {},
	};

    componentWillMount(){
       console.log(this.props.navigation.state.params.details) 
       this.setState({details: this.props.navigation.state.params.details})

    }

    retView = (item) =>{
        if(item == "item"){
          return(
          <View style={{marginLeft: '1%', marginRight: '1%' }}>
                   <Text style={{textAlign: 'left', fontSize: 30, fontWeight: 'bold'}}>Item</Text>
                   <View style = {styles.boxStyle}>
                        <Text numberOfLines={2} ellipsizeMode ={'tail'} style = {{textAlign: 'left', fontSize: 20, margin: 3}}>{this.state.details.item}</Text>
                   </View>
         </View>
          )
        }else if(item == "description"){
            return(
                <View style={{marginLeft: '1%', marginRight: '1%' }}>
                   <Text style={{textAlign: 'left', fontSize: 30, fontWeight: 'bold'}}>Description</Text>
                   <View style = {styles.boxStyle}>
                        <Text numberOfLines={5} ellipsizeMode ={'tail'} style = {{ textAlign: 'left', fontSize: 20, margin: 3}}>{this.state.details.description}</Text>
                   </View>     
                </View>
            )
        }else if(item == "instructions"){
            return(
                <View style={{marginLeft: '1%', marginRight: '1%' }}>
                   <Text style={{textAlign: 'left', fontSize: 30, fontWeight: 'bold'}}>Special Instructions</Text>
                   <View style = {styles.boxStyle}>
                        <Text numberOfLines={5} ellipsizeMode ={'tail'} style = {{ textAlign: 'left', fontSize: 20, margin: 3}}>{this.state.details.instructions}</Text>
                   </View>     
                </View>
            )
        }
      
    }

	

	render() {
		return (
			<ScrollView>
                {this.retView("item")}
                {this.retView("description")}
                {this.retView("instructions")}
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
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5,
       
    },
};

export default OrderDetails;
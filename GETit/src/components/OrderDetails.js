import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Linking} from 'react-native';
import {Button} from 'react-native-paper';
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
            var desc = this.state.details.description
            if(desc == ""){
                desc = "N/A"
            }
            return(
                <View style={{marginLeft: '1%', marginRight: '1%' }}>
                   <Text style={{textAlign: 'left', fontSize: 30, fontWeight: 'bold'}}>Description</Text>
                   <View style = {styles.boxStyle}>
                        <Text numberOfLines={5} ellipsizeMode ={'tail'} style = {{ textAlign: 'left', fontSize: 20, margin: 3}}>{desc}</Text>
                   </View>     
                </View>
            )
        }else if(item == "instructions"){
            var instr = this.state.details.instructions
            if(instr == ""){
                instr = "N/A"
            }
            return(
                <View style={{marginLeft: '1%', marginRight: '1%' }}>
                   <Text style={{textAlign: 'left', fontSize: 30, fontWeight: 'bold'}}>Special Instructions</Text>
                   <View style = {styles.boxStyle}>
                        <Text numberOfLines={5} ellipsizeMode ={'tail'} style = {{ textAlign: 'left', fontSize: 20, margin: 3}}>{instr}</Text>
                   </View>     
                </View>
            )
        }else if(item == "email"){
            return(
                <View style={{marginLeft: '1%', marginRight: '1%' }}>
                   <Text style={{textAlign: 'left', fontSize: 30, fontWeight: 'bold'}}>Email</Text>
                   <View style = {styles.boxStyle}>
                        <Text numberOfLines={1} style = {{ textAlign: 'left', fontSize: 20, margin: 3}}>{this.state.details.email}</Text>
                   </View>     
                </View>
            )
        }else if(item == "price"){
            return(
                <View style={{marginLeft: '1%', marginRight: '1%' }}>
                   <Text style={{textAlign: 'left', fontSize: 30, fontWeight: 'bold'}}>Price</Text>
                   <View style = {{...styles.boxStyle, marginBottom: 3, borderColor: '#007aff',}}>
                        <Text numberOfLines={5} ellipsizeMode ={'tail'} style = {{ textAlign: 'center', fontSize: 30, margin: 3, fontWeight: 'bold'}}>${this.state.details.price}</Text>
                   </View>     
                </View>
            )
        }else if(item == "link"){
            if(this.state.details.link){
               return(
                <View style={{marginLeft: '1%', marginRight: '1%' }}>
                   <TouchableOpacity 
                   style = {{...styles.boxStyle, borderColor: '#0dc146', backgroundColor: '#0dc146'}}
                   onPress = {()=>{
                       Linking.openURL(this.state.details.link).catch((error => alert("Link is not valid\n" + item.link)))
                   }}>
                        <Text numberOfLines={5} ellipsizeMode ={'tail'} style = {{ textAlign: 'center', fontSize: 30, margin: 3, fontWeight: 'bold', color: 'white'}}>Open Link</Text>
                   </TouchableOpacity>     
                </View>
            )
            }
            
        }
      
    }


	render() {
		return (
			<ScrollView>
                {this.retView("item")}
                {this.retView("description")}
                {this.retView("instructions")}
                {this.retView("email")}
                {this.retView("price")}
                {this.retView("link")}
                <Button
                    style={styles.buttonContainedStyle}
                    mode="contained">
                    Accept Order
                </Button>
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
    buttonContainedStyle: {
        height: 47,
        justifyContent: 'center',
        margin: 3,
        flex: 1,
    }
};

export default OrderDetails;
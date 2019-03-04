import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import {FAB, Card} from 'react-native-paper'
import firebase from "firebase";
import { ListItem } from 'react-native-elements'
import { NavigationEvents} from 'react-navigation';

class Requests extends Component {

    state = {
        requestsObj: []
    }


    componentWillMount(){
        firebase.database().ref('/').once('value').then(response => {
                this.setState({requestsObj: response.val().requests})
        })
        
         
    }

    renderItem = ( {item} ) => (
        
         <ListItem
            title={
                <View style = {{backgroundColor: 'yellow'}}>
                 <Text>{item.item}</Text>
                </View>
            }
            subtitle={item.description}
            rightTitle={item.price}
            
          />
        
    )

    
    
 
        
      

    loadRequests = () =>{
        
        var adds = [];
        Object.keys(this.state.requestsObj).forEach((key, index) => {
                    adds.push(this.state.requestsObj[key]);
            }
        );

        keyExtractor = (item, index) => index


        return (
            <FlatList
              data = {adds}
              renderItem = {this.renderItem}
              keyExtractor={this.keyExtractor}
             />
            )
    
    }

    render() {

        return (

            <View style={{flex: 1}}>
              <NavigationEvents onDidFocus={() => {
                    firebase.database().ref('/').once('value').then(response => {
                    this.setState({requestsObj: response.val().requests})
              })
                }}
                />
                <Card style = {styles.topCard}>
                    <Card.Title title="CURRENT REQUESTS"  />
                    <Card.Content style = {{margin: 10, flex: 1,}}>
                         {this.loadRequests()}
                    </Card.Content>
                </Card>
                <FAB
                    icon={"add"}
                    small
                    style={styles.fab}
                    onPress={() => {
                        this.props.navigation.navigate('addRequest');
                    }}
                />
            </View>

        );
    }
}

const styles = {
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },

    topCard: {
        margin: 10,
        flex: 1.5,
    },


};


export default Requests;
import React, {Component} from 'react';
import { Alert, Image, Text, View } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';

class verify extends Component {

    state={
        focusedScreen: false,
        item: {},
    }

     onSuccess(e) {
         var res = this.state.item.unikey + ".com"
         if(res == e.data){
                Alert.alert(
                                'Alert!',
                                'Order Verified!',
                                [
                                    {
                                        text: 'ok',
                                        onPress: () => {
                                         this.props.navigation.navigate('requests');
                                        }
                                    },
                                    
                                ],
                    );
         }else{
                Alert.alert(
                                    'Alert!',
                                    'Order was not verified :(',
                                    [
                                        {
                                            text: 'ok',
                                            onPress: () => {
                                            this.props.navigation.navigate('requests');
                                            }
                                        },
                                        
                                    ],
                );
         }
  }
	

	componentWillMount() {
        this.setState({item: this.props.navigation.state.params.item},()=>{
            console.log("item: " + this.state.item)
        })
        

	}

    componentDidMount(){
        console.log("item: " + this.state.item)
        const { navigation } = this.props;
        navigation.addListener('willFocus', () =>
            this.setState({ focusedScreen: true })
        );
        navigation.addListener('willBlur', () =>
            this.setState({ focusedScreen: false })
        );
    }

    retView=()=>{
        if(this.state.focusedScreen == true){
            return (
                <QRCodeScanner
                        onRead={this.onSuccess.bind(this)}
                />
            )

        }else{
            return (
                <Text>VERIFY</Text>
            )
        }
    }

	render() {
		return (
			<View>
				{this.retView()}
			</View>
		);
	}
}

const styles = {

};

export default verify;

import React, {Component} from 'react';
import { Alert, Image, Text, View } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';

class verify extends Component {

    state={
        focusedScreen: false,
        item: {},
    }

     onSuccess(e) {
   

      console.log("E.DATA: "+e.data)
  }
	

	componentWillMount() {
        this.setState({item: this.props.navigation.state.params.item})

	}

    componentDidMount(){
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

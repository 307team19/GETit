import React, {Component} from 'react';
import {View, Image} from 'react-native';
// import {CardSection} from "./Components_Aman";
import {Card, CardSection, Input} from "./Components_Aman";

class LoginPage extends Component {

    state = { email: '', password: ''};

    render() {
        return (
            <View style={styles.containerStyle}>
                <Card>
                    <CardSection>
                        <Image
                            style={styles.logoStyle}
                            source={require('./img/logo.png')}
                            resizeMode='contain'
                        />
                    </CardSection>


                    <CardSection>
                        <Input
                            label="Email ID:"
                            value={this.state.email}
                            onChangeText={email => this.setState({email})}
                            placeholder="john@purdue.edu"
                        />
                    </CardSection>


                    <CardSection>
                    </CardSection>


                    <CardSection>
                    </CardSection>


                    <CardSection>
                    </CardSection>


                    <CardSection>
                    </CardSection>
                </Card>
            </View>
        );
    }
}

const styles = {
    containerStyle:{
        paddingTop:20,
        flex:1,
        backgroundColor:'white'
    },
    logoStyle:{
        height:160,
        width: 150,
        alignItems:'center',
        flex:1
    }
}

export default LoginPage;
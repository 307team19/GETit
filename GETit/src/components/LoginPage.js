import React, {Component} from 'react';
import {Image, View, ScrollView, Text} from 'react-native';
import { Card, CardSection, Input} from "./common";
import {Provider as PaperProvider, TextInput,Button} from 'react-native-paper';
import paperTheme from './common/paperTheme'

class LoginPage extends Component {
    static navigationOptions = {
        title: 'GETit',
        headerBackTitle: 'Login'
    };


    state = {email: '', password: ''};


    render() {

        return (
            <PaperProvider theme={paperTheme}>
                <ScrollView>
                    <View style={styles.containerStyle}>
                       
                        <Card>
                            <CardSection>
                                <Image
                                    style={styles.logoStyle}
                                    source={require('../img/logo.png')}
                                    resizeMode='contain'
                                />
                            </CardSection>


                            <CardSection>
                                
                                <TextInput
                                    style={styles.textInputStyle}
                                    label='Email'
                                    mode='outlined'
                                    value={this.state.email}
                                    onChangeText={textString => this.setState({email: textString})}

                                />
                            </CardSection>


                            <CardSection>
                                
                                <TextInput
                                    style={styles.textInputStyle}
                                    label='Password'
                                    mode='outlined'
                                    secureTextEntry
                                    value={this.state.password}
                                    onChangeText={textString => this.setState({password: textString})}
                                />
                            </CardSection>

                            <CardSection style = {{flex: 1}}>
                                <Button 
                                propPress={() => {
                                    this.props.navigation.navigate('tabscreen')
                                }}
                                style={{...styles.buttonContainedStyle, margin: 0}}
                                mode="contained"
                                >
                                    <Text style={styles.TextStyle}>
                                        LOG IN
                                    </Text>
                                </Button>
                            </CardSection>


                            <CardSection style = {{ justifyContent: 'space-around' }}>
                                <Button 
                                propPress={() => {
                                    this.props.navigation.navigate('signup')
                                }}
                                style={styles.buttonContainedStyle}
                                mode="contained"
                                >
                                    <Text style={{fontSize: 11, fontWeight: 'bold', color: 'white'}}>
                                        CREATE ACCOUNT
                                    </Text>
                                </Button>
                                <Button
                                style={styles.buttonContainedStyle}
                                mode="contained"
                                >
                                    <Text style={{fontSize: 11, fontWeight: 'bold', color: 'white'}}>
                                        FORGOT PASSWORD
                                    </Text>
                                </Button>
                            </CardSection>

                            
                        </Card>
                    </View>
                </ScrollView>
            </PaperProvider>
        );
    }
}

const styles = {
    containerStyle: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: 'white'
    },
    textInputStyle: {
        flex: 1,
        // margin: 2,
        // padding: 12
    },
    logoStyle: {
        height: 160,
        width: 150,
        alignItems: 'center',
        flex: 1
    },
    orStyle: {
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 10
    },
    TextStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'

    },

    buttonContainedStyle: {
        height: 47,
        justifyContent: 'center',
        margin: 3,
        flex: 1,
    }
}

export default LoginPage;
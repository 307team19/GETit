import React, {Component} from 'react';
import {Image, View, ScrollView, Text} from 'react-native';
import {Button, Card, CardSection, Input} from "./common";
import {Provider as PaperProvider, TextInput} from 'react-native-paper';
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
                        {/*<Header headerText={"GETit"} />*/}
                        <Card>
                            <CardSection>
                                <Image
                                    style={styles.logoStyle}
                                    source={require('../img/logo.png')}
                                    resizeMode='contain'
                                />
                            </CardSection>


                            <CardSection>
                                {/*<Input*/}
                                    {/*label="Email ID:"*/}
                                    {/*value={this.state.email}*/}
                                    {/*onChangeText={email => this.setState({email})}*/}
                                    {/*placeholder="john@purdue.edu"*/}
                                {/*/>*/}
                                <TextInput
                                    style={styles.textInputStyle}
                                    label='Email'
                                    mode='outlined'
                                    value={this.state.email}
                                    onChangeText={textString => this.setState({email: textString})}

                                />
                            </CardSection>


                            <CardSection>
                                {/*<Input*/}
                                    {/*label="Password:"*/}
                                    {/*value={this.state.password}*/}
                                    {/*onChangeText={password => this.setState({password})}*/}
                                    {/*placeholder="******"*/}
                                    {/*secureTextEntry={true}*/}
                                {/*/>*/}
                                <TextInput
                                    style={styles.textInputStyle}
                                    label='Password'
                                    mode='outlined'
                                    secureTextEntry
                                    value={this.state.password}
                                    onChangeText={textString => this.setState({password: textString})}
                                />
                            </CardSection>

                            <CardSection>
                                <Button propPress={() => {
                                    this.props.navigation.navigate('tabscreen')
                                }}>
                                    <Text style={styles.TextStyle}>
                                        Log in
                                    </Text>
                                </Button>
                            </CardSection>


                            <CardSection>
                                <Button propPress={() => {
                                    this.props.navigation.navigate('signup')
                                }}>
                                    <Text style={styles.TextStyle}>
                                        Create an account
                                    </Text>
                                </Button>
                                <Button>
                                    <Text style={styles.TextStyle}>
                                        Forgot password
                                    </Text>
                                </Button>
                            </CardSection>

                            {/*<CardSection>*/}
                                {/*<Button>*/}
                                    {/*Forgot your password*/}
                                {/*</Button>*/}
                            {/*</CardSection>*/}
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
        fontWeight: 'bold',

    }
}

export default LoginPage;
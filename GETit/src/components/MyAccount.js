import React, {Component} from 'react';
import {Button, Provider as PaperProvider, Surface, TextInput} from 'react-native-paper';
import {Image, ScrollView, Text, TouchableOpacity, View, Platform} from 'react-native';
import firebase from 'firebase';
import RNFetchBlob from 'rn-fetch-blob'
import {GoogleSignin} from 'react-native-google-signin';
import {CardSection} from "./common"
import paperTheme from './common/paperTheme'
import {NavigationActions, NavigationEvents, StackActions} from 'react-navigation';
import ImagePicker from 'react-native-image-picker';


// import {Image} from "react-native-paper/typings/components/Avatar";

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'login'})],
});

const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

class MyAccount extends Component {

    componentWillMount(){
        const currUserUID = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/'+currUserUID+'/').once('value')
        .then((response)=>{

            console.log("did mount" +response.val().photoURL)
            this.setState({
                email: response.val().email,
                firstName: response.val().firstName,
                lastName: response.val().lastName,
                phoneNumber: response.val().phoneNumber,
                imageSource: response.val().photoURL
            })
            
        })
    }


    state = {
        disabledEmail: true,
        email: '',
        buttonEdit: 'Edit',
        disabledPhNo: true,
        phoneNumber: '',
        disabledAddr: true,
        address: '',
        firstName: '',
        lastName: '',
        imageSource: '',
        user: '',
        uid: '',
        addresses: [],
        photoURL: ''
    };

    signOut = async () => {

        const user = firebase.auth().currentUser;
        var provider = null;

        if (user != null) {
            console.log("here loop");

            user.providerData.forEach(function (profile) {
                console.log("Sign-in provider: " + profile.providerId);
                provider = profile.providerId;
                console.log("  Provider-specific UID: " + profile.uid);
                console.log("  Name: " + profile.displayName);
                console.log("  Email: " + profile.email);
                console.log("  Photo URL: " + profile.photoURL);
            });
        }
        console.log(provider);
        this.props.navigation.dispatch(resetAction);

        firebase.auth().signOut().then(async function () {
            console.log("inside here")
            if (provider === "password") {

            } else {
                try {
                    await GoogleSignin.revokeAccess();
                    await GoogleSignin.signOut();

                } catch (error) {
                    console.error(error);
                }
            }


            //TODO: this is not reaching here cz of Revoke Access

        });


    };

    onEditPressed() {
        const {email, phoneNumber, firstName, lastName, addresses, photoURL, address} = this.state;
        if (this.state.buttonEdit.toString().localeCompare('Edit') === 0) {
            // this.setState({disabledEmail: false});
            this.setState({disabledPhNo: false});
            // this.setState({disabledAddr: false});
            this.setState({buttonEdit: 'Accept'});
        } else {
            // this.setState({disabledEmail: true});
            // this.setState({buttonEmail: 'Edit'});
            this.setState({disabledPhNo: true});
            // this.setState({disabledAddr: true});
            this.setState({buttonEdit: 'Edit'});


            /*TODO FIX THIS ASAP*/
            var userRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/");
            userRef.set({
                email: email,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                addresses: addresses,
                photoURL: photoURL,
                address: address
            }).then((data) => {
                console.log('Synchronization succeeded');
            }).catch((error) => {
                console.log(error)
            })

        }
    }

    onImageButtonPressed() {
        ImagePicker.showImagePicker(options, (response) => {
            

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
               

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    imageSource: response.uri,
                });

                

                //code for uploading to firebase storage.

                const Blob = RNFetchBlob.polyfill.Blob
                const fs = RNFetchBlob.fs
                window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
                window.Blob = Blob

                    
                        const uploadUri = Platform.OS === 'ios' ? (this.state.imageSource).replace('file://', '') : this.state.imageSource
                        let uploadBlob = null
                        const imageRef = firebase.storage().ref('posts').child(`${this.state.imageSource}`)
                        fs.readFile(uploadUri, 'base64')
                        .then((data) => {
                            return Blob.build(data, { type: `image/jpg;BASE64` })
                        })
                        .then((blob) => {
                            uploadBlob = blob
                            return imageRef.put(blob, { contentType: 'image/jpg' })
                        })
                        .then(() => {
                            uploadBlob.close()
                            return imageRef.getDownloadURL()
                        })
                        .then((url) => {
                                console.log("down")
                                console.log("users/" + firebase.auth().currentUser.uid + "/")
                                var userRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/");
                                userRef.set({
                                    email: this.state.email,
                                    firstName: this.state.firstName,
                                    lastName: this.state.lastName,
                                    phoneNumber: this.state.phoneNumber,
                                    photoURL: url,
                                }).then((data) => {
                                    console.log('Synchronization succeeded');
                                }).catch((error) => {
                                    console.log(error)
                                })
                                console.log(url)
                                this.setState({
                                    imageSource: url,
                                });
                        })
                        .catch((error) => {
                            console.log(error)
                        })

            
                

            }
        });

    }

    componentWillMount() {
        this.setState({uid: firebase.auth().currentUser.uid});
        // console.log(this.state.uid);
        // console.log(this.state);
        const u = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + u + '/').once('value')
            .then(response => {
                this.setState({user: response.val()});
                this.setState({email: this.state.user.email});
                this.setState({phoneNumber: this.state.user.phoneNumber});
                this.setState({firstName: this.state.user.firstName});
                this.setState({lastName: this.state.user.lastName});
                this.setState({addresses: this.state.user.addresses});
                this.setState({photoURL: this.state.user.photoURL});
                this.setState({address: this.state.user.address});
            });

    }

    render() {

        // console.log(this.state);
        // console.log(this.state.user.addresses);

        return (
            <PaperProvider theme={paperTheme}>
                <NavigationEvents onDidFocus={() => {
                    const user = firebase.auth().currentUser.uid;
                    firebase.database().ref('/users/' + user + '/').once('value')
                        .then(response => {
                            this.setState({user: response.val()});
                            this.setState({address: response.val().address});

                        });
                }}/>
                <ScrollView>
                    <View>
                        <CardSection>
                            <TouchableOpacity
                                style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                                onPress={this.onImageButtonPressed.bind(this)}
                            >
                                <Image
                                    source={{uri: this.state.imageSource}} 
                                    style={styles.profilePicStyle}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                        </CardSection>

                        <CardSection>
                            <Text style={styles.textStyle}>
                                Welcome {this.state.firstName}
                            </Text>
                        </CardSection>

                        <CardSection>
                            <TextInput
                                style={styles.textInputStyle}
                                label='email'
                                mode='outlined'
                                // placeholder="current email"
                                disabled={this.state.disabledEmail}
                                value={this.state.email}
                                onChangeText={textString => this.setState({email: textString})}
                            />
                        </CardSection>

                        <CardSection>
                            <TextInput
                                style={styles.textInputStyle}
                                label='phone number'
                                mode='outlined'
                                // placeholder="current email"
                                disabled={this.state.disabledPhNo}
                                value={this.state.phoneNumber}
                                onChangeText={textString => this.setState({phoneNumber: textString})}
                            />
                        </CardSection>

                        <CardSection>
                            {/*<TextInput*/}
                            {/*style={styles.textInputStyle}*/}
                            {/*onPress={() => console.log("here")}*/}
                            {/*label='Address'*/}
                            {/*mode='outlined'*/}
                            {/*// placeholder="current email"*/}
                            {/*disabled={this.state.disabledAddr}*/}
                            {/*value={this.state.Addr}*/}
                            {/*onChangeText={textString => this.setState({Addr: textString})}*/}

                            {/*//value={this.state.email}*/}
                            {/*>*/}
                            <Surface style={styles.surface}>
                                <Text onPress={() => {
                                    console.log("here text");
                                    this.props.navigation.navigate('addresses');

                                }}>
                                    Address:
                                </Text>
                                <Text>
                                    {this.state.address}
                                </Text>
                            </Surface>
                            {/*</TextInput>*/}
                        </CardSection>

                        <CardSection>
                            <Button
                                style={styles.buttonContainedStyle}
                                onPress={this.onEditPressed.bind(this)}
                                // mode="contained"
                            >
                                <Text>
                                    {this.state.buttonEdit}
                                </Text>
                            </Button>
                        </CardSection>

                        <CardSection>
                            <Button
                                style={styles.buttonContainedStyle}
                                onPress={this.signOut}>
                                Sign Out
                            </Button>
                        </CardSection>
                    </View>
                </ScrollView>
            </PaperProvider>
        );
    }
}

const
    styles = {
        profilePicStyle: {
            height: 150,
            width: 150,
            alignItems: 'center',
            flex: 1
        },
        textInputStyle: {
            flex: 8
        },
        buttonContainedStyle: {
            justifyContent: 'center',
            flex: 1
        },
        textStyle: {
            textAlign: 'center',
            fontWeight: 'bold',
            flex: 1
        },
        surface: {
            padding: 8,
            flex: 1,
            justifyContent: 'flex-start',
            flexDirection: 'row',
            elevation: 4,
        }
    }


export default MyAccount;
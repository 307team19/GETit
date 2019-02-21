import React, { Component } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button, Provider as PaperProvider, Surface, TextInput } from 'react-native-paper';
import firebase from 'firebase';

import { GoogleSignin } from 'react-native-google-signin';
import { CardSection } from "./common"
import paperTheme from './common/paperTheme'
import { NavigationActions, StackActions, NavigationEvents } from 'react-navigation';
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


	state = {
		disabledEmail: true,
		email: '',
		buttonEdit: 'Edit',
		disabledPhNo: true,
		phoneNumber: '',
		// buttonPhNo: 'Edit',
		disabledAddr: true,
		Addr: '',
		// buttonAddr: 'Edit',
		firstName: '',
		lastName: '',
		imageSource: '',
		user: '',
		uid: ''
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
		const {email, phoneNumber, firstName, lastName} = this.state;
		if (this.state.buttonEdit.toString().localeCompare('Edit') == 0) {
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
				phoneNumber: phoneNumber
			}).then((data) => {
				console.log('Synchronization succeeded');
			}).catch((error) => {
				console.log(error)
			})

		}
	}

	// onEditPhNoPressed() {
	//     if (this.state.buttonPhNo.toString().localeCompare('Edit') == 0) {
	//         this.setState({disabledPhNo: false});
	//         //this.setState({email: ''});
	//         this.setState({buttonPhNo: 'Accept'});
	//     } else {
	//         this.setState({disabledPhNo: true});
	//         this.setState({buttonPhNo: 'Edit'});
	//     }
	// }
	//
	// onEditAddrPressed() {
	//     if (this.state.buttonAddr.toString().localeCompare('Edit') == 0) {
	//         this.setState({disabledAddr: false});
	//         //this.setState({email: ''});
	//         this.setState({buttonAddr: 'Accept'});
	//     } else {
	//         this.setState({disabledAddr: true});
	//         this.setState({buttonAddr: 'Edit'});
	//     }
	// }

	onImageButtonPressed() {
		ImagePicker.showImagePicker(options, (response) => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				const source = {uri: response.uri};

				// You can also display the image using data:
				// const source = { uri: 'data:image/jpeg;base64,' + response.data };

				this.setState({
					imageSource: source,
				});
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
			});
		firebase.database().ref('/users/' + u + '/addresses').once('value')
			.then(response => {
				this.setState({Addr: response.val().address});

			});
	}

	//.then(response => console.log(response.val()));
	// console.log(this.state);
	// console.log('hello');
	// this.setState({email: this.state.user.email})

	render() {

		// console.log(this.state);

		return (
			<PaperProvider theme={paperTheme}>
				<NavigationEvents onDidFocus={() => {
					const user = firebase.auth().currentUser.uid;
					firebase.database().ref('/users/' + user + '/addresses').once('value')
						.then(response => {
							this.setState({Addr: response.val().address});

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
									source={this.state.imageSource || require('../img/profile_placeholder.png')}
									style={styles.profilePicStyle}
									resizeMode='contain'
								/>
							</TouchableOpacity>
						</CardSection>

						<CardSection>
							<Text style={styles.textStyle}>
								Welcome {this.state.fName}
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
								<Text >
									{this.state.Addr}
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
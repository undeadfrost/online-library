/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, Alert, StyleSheet, Text, ScrollView, Image} from 'react-native';

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android:
		'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
	render() {
		return (
			<ScrollView>
				<Text style={{fontSize: 96}}>Scroll me plz</Text>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Text style={{fontSize: 96}}>If you like</Text>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Text style={{fontSize: 96}}>Scrolling down</Text>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Text style={{fontSize: 96}}>What's the best</Text>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Text style={{fontSize: 96}}>Framework around?</Text>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}}/>
				<Text style={{fontSize: 80}}>React Native</Text>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 60,
		alignItems: 'center'
	},
	button: {
		marginBottom: 30,
		width: 260,
		alignItems: 'center',
		backgroundColor: '#2196F3'
	},
	buttonText: {
		padding: 20,
		color: 'white'
	}
})

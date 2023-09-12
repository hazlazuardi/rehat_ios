import React, { useState, useEffect } from 'react';
import StoreProvider from './src/context/Context';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabBar from './src/components/BottomTabBar';

import { sendMessage, watchEvents } from 'react-native-watch-connectivity';
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';


function App() {

	const [messageFromWatch, setMessageFromWatch] = useState("Waiting...");
	const [message, setMessage] = useState("");
	// Listener when receive message
	const messageListener = () => watchEvents.on('message', (message) => {
		setMessageFromWatch(message.watchMessage);
	});
	useEffect(() => {
		messageListener();
	}, []);

	console.log(message)
	return (
		<StoreProvider>
			<NavigationContainer>

				<SafeAreaView>
					<Text>Received from Watch App!</Text>
					<Text>{messageFromWatch}</Text>
					<Text>Send to Watch App!</Text>
					<TextInput placeholder='Message' onChangeText={setMessage}>
						{message}
					</TextInput>
					{/*
	    * Call sendMessage on button press
	    * <http://mtford.co.uk/react-native-watch-connectivity/docs/communication#send-messages>　
	    */}
					<TouchableOpacity
						onPress={() =>{
							console.log('pressed send')
							sendMessage(
								{ text: message },
								reply => { console.log(reply, message); },
								error => {
									if (error) {
										console.log('error: ', error)
										Alert.alert("The message can't be sent! The watchOS application is probably not running in the foreground! 🤔");
									}
								}
							)}
						}
					>
						<Text>SEND!</Text>
					</TouchableOpacity>
				</SafeAreaView>
				<BottomTabBar />
			</NavigationContainer>
		</StoreProvider>
	);
}

export default App;
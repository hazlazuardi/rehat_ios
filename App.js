import React, { useState, useEffect } from 'react';
import StoreProvider from './src/context/Context';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabBar from './src/components/BottomTabBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Journaling from './src/screens/journaling/Journaling';
import JournalCategory from './src/screens/journaling/JournalCategory';
import JournalSuccess from './src/screens/journaling/JournalSuccess';
import { MMKV } from 'react-native-mmkv';
import JournalEmotions from './src/screens/journaling/JournalEmotions';
import JournalThoughts from './src/screens/journaling/JournalThoughts';
import BlurredEllipsesBackground from './src/components/BlurredEllipsesBackground';
import { View } from 'react-native';
import { sendMessage, watchEvents } from 'react-native-watch-connectivity';
import {
	Alert,
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
} from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ManageRecoveryPreferences from './src/screens/dashboard/ManageRecoveryPreferences';
import Settings from './src/screens/dashboard/Settings';
import ManageEmergencyContacts from './src/screens/dashboard/ManageEmergencyContacts';
import JournalDetail from './src/screens/journaling/JournalDetail';
import { SafeAreaInsetsContext, SafeAreaProvider } from 'react-native-safe-area-context';
import CreateGoal from './src/screens/goal/CreateGoal';


const Stack = createNativeStackNavigator();

const nestedHeaderOptions = {
	headerTitle: '',
	headerTransparent: true,
	headerBlurEffect: 'dark',
};

export const storage = new MMKV();

const MyTheme = {
	dark: false,
	colors: {
		primary: 'rgb(255, 45, 85)',
		background: 'rgb(242, 242, 242)',
		card: 'rgb(255, 255, 255)',
		text: 'white',
		border: 'rgb(199, 199, 204)',
		notification: 'rgb(255, 69, 58)',
	},
};

function App() {
	const [messageFromWatch, setMessageFromWatch] = useState('Waiting...');
	const [message, setMessage] = useState('');
	// Listener when receive message
	const messageListener = () =>
		watchEvents.on('message', message => {
			setMessageFromWatch(message.watchMessage);
		});
	useEffect(() => {
		messageListener();
	}, []);

	console.log(message);
	return (
		<SafeAreaProvider>
			<StoreProvider>
				{/* <BlurredEllipsesBackground> */}
				<GestureHandlerRootView style={{ flex: 1 }}>
					<NavigationContainer theme={MyTheme}>
						{/* <View style={{ flex: 1, backgroundColor: '#0F1720' }}> */}
						<Stack.Navigator screenOptions={{
							headerShown: false,
							contentStyle: {
								// backgroundColor: 'black'
							}
						}}>
							<Stack.Screen name='Root' component={BottomTabBar} />

							{/* Settings */}
							<Stack.Group screenOptions={{ headerShown: true }}>
								<Stack.Screen name='Settings' component={Settings} options={{ ...nestedHeaderOptions, headerBackTitle: 'Dashboard' }} />
								<Stack.Screen name='Manage Emergency Contact' component={ManageEmergencyContacts} options={{ ...nestedHeaderOptions, headerBackTitle: 'Settings' }} />
								<Stack.Screen name='Manage Recovery Preferences' component={ManageRecoveryPreferences} options={{ ...nestedHeaderOptions, headerBackTitle: 'Settings' }} />
							</Stack.Group>

							{/* Recovery Screens */}
							<Stack.Group screenOptions={{ headerShown: true, }}>
								<Stack.Screen name='Journaling' component={Journaling} options={{ ...nestedHeaderOptions, headerBackTitle: 'Recovery' }} />
								<Stack.Screen name='Journal Category' component={JournalCategory} options={{ ...nestedHeaderOptions, headerBackTitle: 'Journaling' }} />
								<Stack.Screen name='Journal Emotions' component={JournalEmotions} options={{ ...nestedHeaderOptions, headerBackTitle: 'Category' }} />
								<Stack.Screen name='Journal Thoughts' component={JournalThoughts} options={{ ...nestedHeaderOptions, headerBackTitle: 'Emotions' }} />
								<Stack.Screen name='Journal Success' component={JournalSuccess} options={{ ...nestedHeaderOptions, headerShown: false }} />
								<Stack.Screen name='Journal Detail' component={JournalDetail} options={{ ...nestedHeaderOptions, headerBackTitle: 'Journaling' }} />
								<Stack.Screen name='Create a Goal' component={CreateGoal} options={{ ...nestedHeaderOptions, headerBackTitle: 'Details' }} />
							</Stack.Group>




						</Stack.Navigator>
						{/* </View> */}
					</NavigationContainer>
				</GestureHandlerRootView>
				{/* </BlurredEllipsesBackground> */}
			</StoreProvider >
		</SafeAreaProvider>
	);
}

export default App;

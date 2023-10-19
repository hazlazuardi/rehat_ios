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
import Learn from './src/screens/learn/Learn';
import LearnDetail from './src/screens/learn/LearnDetail';
import CognitiveRestructuing from './src/screens/thoughts/CognitiveRestructuring';
import CognitiveDetail from './src/screens/thoughts/CognitiveDetail';
import CognitiveAnotherWay from './src/screens/thoughts/CognitiveAnotherWay';
import SuccessDetail from './src/screens/thoughts/SuccessScreen';
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
import {
	SafeAreaInsetsContext,
	SafeAreaProvider,
} from 'react-native-safe-area-context';
import CreateGoal from './src/screens/goal/CreateGoal';
import GroundingJourney from './src/screens/grounding/GroundingJourney';
import GroundingSteps from './src/screens/grounding/GroundingSteps';
import OnboardingScreen from './src/screens/onboarding/Onboarding';
import OnboardingDetailOne from './src/screens/onboarding/OnboardingDetailOne';
import OnboardingDetailTwo from './src/screens/onboarding/OnboardingDetailTwo';
import ThoughtsReframingMain from './src/screens/thoughts/ThoughtsReframingMain';
import LearnCategory from './src/screens/learn/LearnCategory';

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
	const [isOnboard, setIsOnboard] = useState(false);
	const [loading, setLoading] = useState(true);
	// Listener when receive message
	const messageListener = () =>
		watchEvents.on('message', message => {
			setMessageFromWatch(message.watchMessage);
		});
	useEffect(() => {
		messageListener();
	}, []);

	useEffect(() => {
		let temp = storage.getString('isOnboarded');
		if (temp) {
			setIsOnboard(true);
			setLoading(false);
			return;
		}
		setLoading(false);
	}, [isOnboard]);

	return (
		<SafeAreaProvider>
			<StoreProvider>
				{/* <BlurredEllipsesBackground> */}
				<GestureHandlerRootView style={{ flex: 1 }}>
					<NavigationContainer theme={MyTheme}>
						{/* <View style={{ flex: 1, backgroundColor: '#0F1720' }}> */}
						<Stack.Navigator
							screenOptions={{
								headerShown: false,
								contentStyle: {
									// backgroundColor: 'black'
								},
							}}>
							{!isOnboard && <Stack.Group screenOptions={{ headerShown: false }}>
								<Stack.Screen
									name="Onboarding"
									component={OnboardingScreen}
									options={{
										...nestedHeaderOptions,
										headerBackTitle: '',
									}}
								/>
								<Stack.Screen
									name="Onboarding Detail One"
									component={OnboardingDetailOne}
									options={{
										...nestedHeaderOptions,
										headerBackTitle: '',
									}}
								/>
								<Stack.Screen
									name="Onboarding Detail Two"
									component={OnboardingDetailTwo}
									options={{
										...nestedHeaderOptions,
										headerBackTitle: '',
									}}
								/>
							</Stack.Group>
							}
							<Stack.Screen name="Root" component={BottomTabBar} />

							{/* Settings */}
							<Stack.Group screenOptions={{ headerShown: true }}>
								<Stack.Screen
									name="Settings"
									component={Settings}
									options={{
										...nestedHeaderOptions,
										headerBackTitle: 'Dashboard',
									}}
								/>
								<Stack.Screen
									name="Manage Emergency Contact"
									component={ManageEmergencyContacts}
									options={{
										...nestedHeaderOptions,
										headerBackTitle: 'Settings',
									}}
								/>
								<Stack.Screen
									name="Manage Recovery Preferences"
									component={ManageRecoveryPreferences}
									options={{
										...nestedHeaderOptions,
										headerBackTitle: 'Settings',
									}}
								/>
							</Stack.Group>

							{/* Recovery Screens */}
							<Stack.Group screenOptions={{ headerShown: true }}>
								<Stack.Screen
									name="Journaling"
									component={Journaling}
									options={{
										...nestedHeaderOptions,
										headerBackTitle: 'Recovery',
									}}
								/>
								<Stack.Screen
									name="Journal Category"
									component={JournalCategory}
									options={{
										...nestedHeaderOptions,
										headerBackTitle: 'Journaling',
									}}
								/>
								<Stack.Screen
									name="Journal Emotions"
									component={JournalEmotions}
									options={{
										...nestedHeaderOptions,
										headerBackTitle: 'Category',
									}}
								/>
								<Stack.Screen
									name="Journal Thoughts"
									component={JournalThoughts}
									options={{
										...nestedHeaderOptions,
										headerBackTitle: 'Emotions',
									}}
								/>
								<Stack.Screen
									name="Journal Success"
									component={JournalSuccess}
									options={{
										...nestedHeaderOptions,
										headerShown: false,
										gestureEnabled: false
									}}
								/>
								<Stack.Screen
									name="Journal Detail"
									component={JournalDetail}
									options={{
										...nestedHeaderOptions,
										headerBackTitle: 'Journaling',
									}}
								/>
							</Stack.Group>

							{/* Grounding Technique */}
							<Stack.Group screenOptions={{ headerShown: true }}>
								<Stack.Screen
									name="Five Senses"
									component={GroundingJourney}
									options={{
										...nestedHeaderOptions,
										headerBackTitle: 'Recovery',
									}}
								/>
								<Stack.Screen
									name="Grounding Steps"
									component={GroundingSteps}
									options={{
										...nestedHeaderOptions,
										headerBackTitle: 'Five Senses',
									}}
								/>
							</Stack.Group>

							{/* Learn Screens */}
							<Stack.Group screenOptions={{ headerShown: true }}>
								<Stack.Screen
									name="Learn"
									component={Learn}
									options={{
										...nestedHeaderOptions,
										headerBackTitle: 'Recovery',
									}}
								/>
								<Stack.Screen
									name="Learn Detail"
									component={LearnDetail}
									options={{ ...nestedHeaderOptions, headerBackTitle: 'Learn' }}
								/>
								<Stack.Screen
									name="Learn Category"
									component={LearnCategory}
									options={{ ...nestedHeaderOptions, headerBackTitle: 'Learn' }}
								/>
							</Stack.Group>

							{/* Thoughts Reframing Screens */}
							<Stack.Group screenOptions={{ headerShown: true }}>
								<Stack.Screen
									name="Thoughts Reframing"
									component={ThoughtsReframingMain}
									options={{
										...nestedHeaderOptions,
										headerBackTitle: 'Recovery',

									}}
								/>
								<Stack.Screen
									name="Cognitive Restructuring"
									component={CognitiveRestructuing}
									options={{
										...nestedHeaderOptions,
										headerBackTitle: 'Recovery',
									}}
								/>
								<Stack.Screen
									name="Cognitive Detail"
									component={CognitiveDetail}
									options={{
										...nestedHeaderOptions,
										headerBackTitle: 'Recovery',
									}}
								/>
								<Stack.Screen
									name="Cognitive Another Way"
									component={CognitiveAnotherWay}
									options={{
										...nestedHeaderOptions,
										headerBackTitle: 'Recovery',
									}}
								/>
								<Stack.Screen
									name="Success Screen"
									component={SuccessDetail}
									options={{
										...nestedHeaderOptions,
										headerBackTitle: 'Recovery',
										gestureEnabled: false
									}}
								/>
							</Stack.Group>

							<Stack.Screen
								name="Create a Goal"
								component={CreateGoal}
								options={{
									...nestedHeaderOptions,
									headerBackTitle: 'Details',
									gestureEnabled: false
								}}
							/>


						</Stack.Navigator>
						{/* </View> */}
					</NavigationContainer>
				</GestureHandlerRootView>
				{/* </BlurredEllipsesBackground> */}
			</StoreProvider>
		</SafeAreaProvider>
	);
}

export default App;
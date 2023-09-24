import React from 'react';
import StoreProvider from './src/context/Context';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabBar from './src/components/BottomTabBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Journaling from './src/screens/journaling/Journaling';
import EmotionCategory from './src/screens/journaling/EmotionCategory';
import Emotions from './src/screens/journaling/Emotions';
import JournalSuccess from './src/screens/journaling/JournalSuccess';
import { MMKV } from "react-native-mmkv";

const Stack = createNativeStackNavigator();

const nestedHeaderOptions = {
	headerTitle: '', headerTransparent: true, headerBlurEffect: 'regular'
}

export const storage = new MMKV();

function App() {
	return (
		<StoreProvider>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name='Root' component={BottomTabBar} />

					{/* Recovery Screens */}
					<Stack.Group screenOptions={{ headerShown: true, headerBackTitle: 'Recovery' }}>
						<Stack.Screen name='Journaling' component={Journaling} />
						<Stack.Screen name='Emotion Category' component={EmotionCategory} options={nestedHeaderOptions} />
						<Stack.Screen name='Emotions' component={Emotions} options={nestedHeaderOptions} />
						<Stack.Screen name='JournalDone' component={JournalSuccess} options={{ ...nestedHeaderOptions, headerShown: false }} />
					</Stack.Group>


				</Stack.Navigator>
			</NavigationContainer>
		</StoreProvider>
	);
}

export default App;
import React from 'react';
import StoreProvider from './src/context/Context';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabBar from './src/components/BottomTabBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Journaling from './src/screens/journaling/Journaling';
import JournalCategory from './src/screens/journaling/JournalCategory';
import JournalSuccess from './src/screens/journaling/JournalSuccess';
import { MMKV } from "react-native-mmkv";
import JournalEmotions from './src/screens/journaling/JournalEmotions';
import JournalThoughts from './src/screens/journaling/JournalThoughts';

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
					<Stack.Group screenOptions={{ headerShown: true, }}>
						<Stack.Screen name='Journaling' component={Journaling} options={{ headerBackTitle: 'Recovery' }} />
						<Stack.Screen name='Journal Category' component={JournalCategory} options={{ ...nestedHeaderOptions, headerBackTitle: 'Journaling' }} />
						<Stack.Screen name='Journal Emotions' component={JournalEmotions} options={{ ...nestedHeaderOptions, headerBackTitle: 'Category' }} />
						<Stack.Screen name='Journal Thoughts' component={JournalThoughts} options={{ ...nestedHeaderOptions, headerBackTitle: 'Emotions' }} />
						<Stack.Screen name='Journal Done' component={JournalSuccess} options={{ ...nestedHeaderOptions, headerShown: false }} />
					</Stack.Group>


				</Stack.Navigator>
			</NavigationContainer>
		</StoreProvider>
	);
}

export default App;
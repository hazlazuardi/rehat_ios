import React from 'react';
import StoreProvider from './src/context/Context';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabBar from './src/components/BottomTabBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Journaling, { EmotionCategoryScreen, EmotionsScreen } from './src/screens/journaling/Journaling';
import Recovery from './src/screens/Recovery';

const Stack = createNativeStackNavigator();

const nestedHeaderOptions = {
	headerTitle: '', headerTransparent: true, headerBlurEffect: 'regular'
}


function App() {
	return (
		<StoreProvider>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name='Root' component={BottomTabBar} />
					<Stack.Group screenOptions={{ headerShown: true, headerBackTitle: 'Recovery' }}>
						{/* <Stack.Screen name='De' component={Recovery} /> */}
						<Stack.Screen name='Journaling' component={Journaling} />
						<Stack.Screen name='Emotion Category' component={EmotionCategoryScreen} options={nestedHeaderOptions} />
						<Stack.Screen name='Emotions' component={EmotionsScreen} options={nestedHeaderOptions} />
					</Stack.Group>
				</Stack.Navigator>
			</NavigationContainer>
		</StoreProvider>
	);
}

export default App;
import React from 'react';
import StoreProvider from './src/context/Context';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabBar from './src/components/BottomTabBar';


function App() {
	return (
		<StoreProvider>
			<NavigationContainer>
				<BottomTabBar />
			</NavigationContainer>
		</StoreProvider>
	);
}

export default App;
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard";
import Learn from "../screens/Learn";
import Monitoring from "../screens/Monitoring";
import Recovery from "../screens/Recovery";

const Tab = createBottomTabNavigator();

/**
 * This component defines a Bottom Tab Navigator for navigation within the app.
 * It uses the `createBottomTabNavigator` from React Navigation.
 *
 * @component
 * @returns {React.ReactNode} The BottomTabBar component.
 */
function BottomTabBar() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false
			}}>
			<Tab.Screen
				name="Dashboard"
				children={() => <Dashboard />}
			/>
			<Tab.Screen
				name="Recovery"
				children={() => <Recovery />}
			/>
			<Tab.Screen
				name="Learn"
				children={() => <Learn />}
			/>
			<Tab.Screen
				name="Monitoring"
				children={() => <Monitoring />}
			/>
		</Tab.Navigator>
	);
}

export default BottomTabBar;

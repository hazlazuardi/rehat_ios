import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/dashboard/Dashboard";
import Learn from "../screens/Learn";
import Monitoring from "../screens/Monitoring";
import Recovery from "../screens/Recovery";
import BlurredEllipsesBackground from "./BlurredEllipsesBackground";
import { BlurView } from "@react-native-community/blur";
import { StyleSheet } from "react-native";

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
			sceneContainerStyle={{
				backgroundColor: 'transparent'
			}}

			screenOptions={{
				headerShown: false,
				tabBarBackground: () => <BlurView
					style={styles.absolute}
					blurType="thickMaterial"
					blurAmount={50}
					reducedTransparencyFallbackColor="white"
				/>,

				tabBarStyle: {
					backgroundColor: 'transparent',
					borderTopWidth: 0,
					position: 'absolute',
					elevation: 0  // <-- this is the solution				
				}
			}} >
			<Tab.Screen
				name="Dashboard"
				component={Dashboard}
			/>
			<Tab.Screen
				name="Recovery"
				component={Recovery}
			/>
			<Tab.Screen
				name="Learn"
				component={Learn}
			/>
			<Tab.Screen
				name="Monitoring"
				component={Monitoring}
			/>
		</ Tab.Navigator>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
		backgroundColor: '#0F1720'
	},
	absolute: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	},
	ellipseTopLeft: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: 150,
		height: 150,
		borderRadius: 50,
		backgroundColor: '#0E8388', // Adjust color and styles as needed
	},
	ellipseCenter: {
		position: 'absolute',
		top: '40%',
		left: '40%',
		transform: [{ translateX: -150 }, { translateY: -150 }],
		width: 300,
		height: 300,
		borderRadius: 300,
		backgroundColor: '#0E8388', // Adjust color and styles as needed
	},
	ellipseBottomRight: {
		position: 'absolute',
		top: 90,
		right: 0,
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: '#0E8388', // Adjust color and styles as needed
	},
});


export default BottomTabBar;

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/dashboard/Dashboard";
import Learn from "../screens/learn/Learn";
import Monitoring from "../screens/monitoring/Monitoring";
import Recovery from "../screens/Recovery";
import { BlurView } from "@react-native-community/blur";
import { Image, StyleSheet, Text, View } from "react-native";
import assets from "../data/assets";
import { colors, sizes } from "../data/theme";

const Tab = createBottomTabNavigator();

/**
 * This component defines a Bottom Tab Navigator for navigation within the app.
 * It uses the `createBottomTabNavigator` from React Navigation.
 *
 * @returns {React.ReactNode} The rendered BottomTabBar component.
 */
function BottomTabBar() {
	return (
		<Tab.Navigator
			sceneContainerStyle={{
				backgroundColor: 'black'
			}}
			screenOptions={{
				headerShown: false,
				tabBarBackground: () => (
					<BlurView
						style={styles.absolute}
						blurType="dark"
						blurAmount={50}
						reducedTransparencyFallbackColor="white"
					/>
				),
				tabBarStyle: {
					backgroundColor: 'transparent',
					borderTopWidth: 0,
					position: 'absolute',
					elevation: 0
				}
			}}>
			<Tab.Screen
				name="Dashboard"
				component={Dashboard}
				options={tabOptions(assets.icons.home)}
			/>
			<Tab.Screen
				name="Recovery"
				component={Recovery}
				options={tabOptions(assets.icons.recovery)}
			/>
			<Tab.Screen
				name="Learn"
				component={Learn}
				options={tabOptions(assets.icons.learn)}
			/>
			<Tab.Screen
				name="Monitoring"
				component={Monitoring}
				options={tabOptions(assets.icons.monitoring)}
			/>
		</Tab.Navigator>
	);
}

/**
 * Provides tab options for a specific tab item.
 *
 * @param {object} icon - The icon asset for the tab.
 * @returns {object} The configuration options for the tab.
 */
function tabOptions(icon) {
	return {
		tabBarShowLabel: true,
		tabBarIcon: ({ focused, size }) => (
			<TabIcon focused={focused} size={size} icon={icon} />
		),
		tabBarActiveTintColor: colors.white,
		tabBarInactiveTintColor: colors.whiteTransparent
	}
}

/**
 * Renders the icon for a specific tab.
 *
 * @param {boolean} focused - Indicates if the tab is currently active.
 * @param {object} icon - The icon asset to be displayed.
 * @param {number} size - The size of the icon.
 * @returns {React.ReactNode} The rendered tab icon.
 */
function TabIcon({ focused, icon, size }) {
	return (
		<View style={{
			backgroundColor: 'transparent',
			borderRadius: sizes.radius.lg * 50,
			padding: sizes.padding.md,
			alignItems: 'center',
			justifyContent: 'center',
			aspectRatio: 1,
			width: sizes.icon.lg,
			opacity: focused ? 1 : .25
		}}>
			<View style={{
				width: size,
				aspectRatio: 1,
			}}>
				<Image
					source={icon}
					style={{
						flex: 1,
						aspectRatio: 1,
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	absolute: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	},
});

export default BottomTabBar;

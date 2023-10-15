/* eslint-disable react/no-children-prop */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import icons from '../data/icons';
import { colors, sizes } from '../data/theme';
import Map from '../screens/Map';
import NowPlaying from '../screens/NowPlaying';
import Profile from '../screens/Profile';
import { useLocation, useSamples } from '../context/Context';
import LinearGradient from 'react-native-linear-gradient';

/** Initiate BottomTabNavigator */
const Tab = createBottomTabNavigator();
const { height } = Dimensions.get('screen');

/**
 * This is main component for Bottom Tab Bar
 *
 * @returns {JSX.Element} - React Component for Bottom Tab Bar
 * and Screens for this app.
 */
function BottomTabBar() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarBackground: () => {
                    return (
                        <View>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                colors={[colors.purpleColorLighter, colors.blueColorDarker]}
                                style={styles.linearGradient}
                            />
                        </View>
                    );
                },
            }}
        >
            <Tab.Screen
                name="Map"
                children={() => <Map />}
                options={tabOptions(icons.tabMapPurple)}
            />
            <Tab.Screen
                name="Now Playing"
                children={() => <NowPlaying />}
                options={tabOptions(icons.logoWhite, true)}
            />
            <Tab.Screen
                name="Profile"
                children={() => <Profile />}
                options={tabOptions(icons.tabProfilePurple)}
            />
        </Tab.Navigator>
    );
}

BottomTabBar.propTypes = {
    navigation: PropTypes.object,
};

/**
 * This function specify the tab options for each distinct tab
 *
 * @param {number} icon - Icon for each Tab to show.
 * @param {boolean} isLogo - Flag to indicate if a Tab is for the Logo.
 * @returns {object} - Options for Tab Screen options prop.
 */
function tabOptions(icon) {
    return {
        tabBarIcon: ({ focused, size }) => (
            <TabIcon focused={focused} icon={icon} size={size} />
        ),
        tabBarShowLabel: false,
        tabBarStyle: {
            height: height / 10,
        },
        tabBarItemStyle: {
            flex: 1,
        },
    };
}

/**
 * This is a Tab Icon component to be passed to tabBarIcon.
 *
 * @param {object} props - Object containing props for this component.
 * @param {boolean} props.focused — Flag to indicate which Tab is focused.
 * @param {number} props.icon - Icon for each Tab to show.
 * @param {boolean} props.isLogo - Flag to indicate if a Tab is for the Logo.
 * @param {number} props.size — Size of the Tab.
 * @returns {JSX.Element} - React Component for each Tab.
 */
function TabIcon({ focused, icon, size }) {

    /** Dynamic StyleSheet to style with conditions in mind. */
    const dynamicStyles = StyleSheet.create({
        tabIconContainer: {
            backgroundColor: focused && colors.green,
            padding: size / 2,
        },
        tabIconImage: {
            height: '100%',
            tintColor: focused ? colors.white : colors.white,
            width: '100%',
        },
    });
    return (
        <View style={[styles.tabIconContainer, dynamicStyles.tabIconContainer]}>
            <Image
                source={icon}
                resizeMode="contain"
                style={[styles.tabIconImage, dynamicStyles.tabIconImage]}
            />
        </View>
    );
}

TabIcon.propTypes = {
    focused: PropTypes.bool,
    icon: PropTypes.number,
    isLogo: PropTypes.bool,
    size: PropTypes.number,
};

/** StyleSheet as a wider scope to reduce re-render. */
const styles = StyleSheet.create({
    linearGradient: {
        height: '100%',
    },
    tabIconContainer: {
        aspectRatio: 1,
        flex: 1,
        height: '100%',
        width: '90%',
    },
});

export default BottomTabBar;
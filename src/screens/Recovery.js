import React from 'react';
import { Pressable, SafeAreaView, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Journaling from './journaling/Journaling';
import { BottomTabBar } from '@react-navigation/bottom-tabs';

const RecoveryStack = createNativeStackNavigator();

function Recovery({ navigation }) {

    // console.log('props', props)
    return (
        <SafeAreaView>
            <Pressable onPress={() => navigation.navigate('Journaling')}>
                <Text>Journaling</Text>
            </Pressable>
        </SafeAreaView>
    );
}

export default Recovery;
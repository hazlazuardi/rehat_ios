import React from 'react';
import { Pressable, SafeAreaView, Text } from 'react-native';

function Recovery({ navigation }) {

    // console.log('props', props)
    return (
        <SafeAreaView>
            <Pressable onPress={() => navigation.navigate('Journaling')}>
                <Text>Journaling</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Cognitive Restructuring')}>
                <Text>Cognitive Restructuring</Text>
            </Pressable>
        </SafeAreaView>
    );
}

export default Recovery;
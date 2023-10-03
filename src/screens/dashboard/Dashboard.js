import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';

function Dashboard({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text>This is Dashboard</Text>
            <PrimaryButton text='Settings' color='green' onPress={() => navigation.navigate("Settings")} />
        </SafeAreaView>
    );
}

export default Dashboard;
import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import useManageGoals from '../helpers/useManageGoals';

function Monitoring() {

    const { clearAllGoals } = useManageGoals()

    return (
        <SafeAreaView>
            <Text>This is Monitoring Screen</Text>

            <PrimaryButton
                color='red'
                text='Clear Goals'
                onPress={() => clearAllGoals()}
            />
        </SafeAreaView>
    );
}

export default Monitoring;
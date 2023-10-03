import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { useJournal } from '../../context/Context';
import { storage } from '../../../App';
import { sizes } from '../../data/theme';
import PrimaryButton from '../../components/PrimaryButton';
import { trigger } from 'react-native-haptic-feedback';

/**
 * A component for journaling and managing journals.
 *
 * @component
 * @param {JournalingProps} props - The component's properties.
 * @returns {JSX.Element} The rendered Journaling component.
 */
function Journaling({ navigation }) {
    const { dispatchJournal } = useJournal();

    useEffect(() => {
        dispatchJournal({ type: 'getAllJournals' });
    }, []);

    const strAllJournals = storage.getString('journals');
    const allJournals = strAllJournals ? JSON.parse(strAllJournals) : [];
    console.log('allJournalsFromStorage', allJournals);

    return (
        <SafeAreaView style={{ marginTop: sizes.padding.md, paddingHorizontal: sizes.padding.md }} >
            <View style={{ gap: sizes.padding.md}}>
                <PrimaryButton
                    color='green'
                    text='Create a Journal'
                    onPress={() => {
                        navigation.navigate("Journal Category")
                        trigger('rigid')
                    }}
                />
                <PrimaryButton
                    color='red'
                    text='Clear all journal'
                    onPress={() => {
                        dispatchJournal({ type: 'eraseJournals' })
                        trigger('impactHeavy')
                    }}
                />
                {allJournals.map((journal) => (
                    <Text style={{ marginTop: 8 }} key={journal.dateAdded + journal.emotions[0]}>
                        {journal.emotions[0]}
                    </Text>
                ))}
            </View>
        </SafeAreaView>
    );
}

/**
 * Prop types for the Journaling component.
 *
 * @typedef {object} JournalingProps
 * @property {object} navigation - The navigation function.
 */

/**
 * Prop types for the Journaling component.
 *
 * @type {JournalingProps}
 */
Journaling.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Journaling;

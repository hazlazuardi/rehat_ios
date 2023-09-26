import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Pressable, SafeAreaView, Text } from 'react-native';
import { useJournal } from '../../context/Context';
import { storage } from '../../../App';
import { sizes } from '../../data/theme';

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
            <Pressable onPress={() => navigation.navigate('Journal Category')}>
                <Text>Create a Journal</Text>
            </Pressable>
            <Pressable onPress={() => dispatchJournal({ type: 'eraseJournals' })}>
                <Text>Clear Journals</Text>
            </Pressable>

            {allJournals.map((journal) => (
                <Text style={{ marginTop: 8 }} key={journal.dateAdded + journal.emotions[0]}>
                    {journal.emotions[0]}
                </Text>
            ))}
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

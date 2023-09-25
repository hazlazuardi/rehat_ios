import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useJournal } from '../../context/Context';
import Divider from '../../components/Divider';
import { sizes } from '../../data/theme';
import Chip from '../../components/Chip';
import ChipInput from '../../components/ChipInput';

/**
 * A component for journaling thoughts and provide contexts.
 *
 * @component
 */
function JournalThoughts() {
    const { journal, journalingConfig, setJournalingConfig } = useJournal();

    /**
     * Handles the addition of a new Journal Config.
     *
     * @param {string} newConfig - The new Journal Config to add.
     * @param {string} type - The type of Journal Config (e.g 'locations' or 'people').
     */
    const handleAddJournalConfig = (newConfig, type) => {
        // Add the new Journal Config to your state or context based on the type
        setJournalingConfig((prev) => {
            const updatedConfig = { ...prev.journalThoughts };
            if (type === 'locations') {
                updatedConfig.locations = [...updatedConfig.locations, newConfig];
            } else if (type === 'people') {
                updatedConfig.people = [...updatedConfig.people, newConfig];
            }
            return { ...prev, journalThoughts: updatedConfig };
        });
    };

    return (
        <SafeAreaView>
            <ScrollView style={{ height: '100%' }}>
                <View style={{ paddingHorizontal: sizes.padding.lg, flexDirection: 'column', gap: sizes.padding.md }}>
                    <Text>I'm feeling {journal.emotionCategory}</Text>
                    <View style={{ flexDirection: 'row', gap: sizes.padding.sm }}>
                        {journal.emotions?.map((emotion) => (
                            <Chip key={emotion} text={emotion} />
                        ))}
                    </View>
                    <Divider />
                    <Text>HR Data</Text>
                    <Divider />
                    <Text>Add a photo</Text>
                    <Divider />
                    <Text>Who are you with?</Text>
                    <View style={{ flexDirection: 'row', gap: sizes.padding.sm, flexWrap: 'wrap' }}>
                        {journalingConfig.journalThoughts.people.map((person) => (
                            <Chip key={person} text={person} />
                        ))}
                        <ChipInput type="people" onEndEditing={handleAddJournalConfig} />
                    </View>
                    <Divider />
                    <Text>Where are you?</Text>
                    <View style={{ flexDirection: 'row', gap: sizes.padding.sm, flexWrap: 'wrap' }}>
                        {journalingConfig.journalThoughts.locations.map((location) => (
                            <Chip key={location} text={location} />
                        ))}
                        <ChipInput type="locations" onEndEditing={handleAddJournalConfig} />
                    </View>
                    <Divider />
                    <Text>Write your thoughts</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

JournalThoughts.propTypes = {};

export default JournalThoughts;

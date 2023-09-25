import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useJournal } from '../../context/Context';
import Divider from '../../components/Divider';
import { sizes } from '../../data/theme';
import Chip from '../../components/Chip';
import ChipInput from '../../components/ChipInput';
import TextArea from '../../components/TextArea';

/**
 * A component for journaling thoughts and providing contexts.
 * @component
 * @param {object} props - The component's properties.
 * @param {object} props.navigation - The navigation object.
 * @returns {JSX.Element} The rendered JournalThoughts component.
 */
function JournalThoughts({ navigation }) {
    const { journal, dispatchJournal, journalingConfig, setJournalingConfig } = useJournal();

    /**
     * Handles the addition of a new Journal Config.
     * @param {string} newConfig - The new Journal Config to add.
     * @param {string} type - The type of Journal Config (e.g., 'locations' or 'people').
     */
    const handleAddJournalConfig = (newConfig, type) => {
        // Add the new Journal Config to your state or context based on the type
        setJournalingConfig((prev) => {
            const updatedConfig = { ...prev.journalThoughts };
            updatedConfig[type] = [...updatedConfig[type], newConfig];
            return { ...prev, journalThoughts: updatedConfig };
        });
    };

    const handleWriteThoughts = (newThoughts) => {
        dispatchJournal({ type: 'setJournal', payload: { thoughts: newThoughts } });
    };

    /**
     * Handles the press event of a chip.
     * @param {string} value - The value associated with the chip.
     * @param {string} type - The type of chip (e.g., 'withWho' or 'where').
     */
    const onPressChip = (value, type) => {
        dispatchJournal({
            type: 'setJournal',
            payload: {
                [type]: value,
            },
        });
    };

    /**
     * Checks if a chip is selected based on the value and type.
     * @param {string} value - The value to check for selection.
     * @param {string} type - The type to determine the key.
     * @returns {boolean} True if the chip is selected; otherwise, false.
     */
    const isChipSelected = (value, type) => {
        return journal[type]?.includes(value);
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
                            <Chip
                                key={person}
                                text={person}
                                onPress={() => onPressChip(person, 'withWho')}
                                isSelected={isChipSelected(person, 'withWho')}
                            />
                        ))}
                        <ChipInput type="people" onEndEditing={handleAddJournalConfig} />
                    </View>
                    <Divider />
                    <Text>Where are you?</Text>
                    <View style={{ flexDirection: 'row', gap: sizes.padding.sm, flexWrap: 'wrap' }}>
                        {journalingConfig.journalThoughts.locations.map((location) => (
                            <Chip
                                key={location}
                                text={location}
                                onPress={() => onPressChip(location, 'where')}
                                isSelected={isChipSelected(location, 'where')}
                            />
                        ))}
                        <ChipInput type="locations" onEndEditing={handleAddJournalConfig} />
                    </View>
                    <Divider />
                    <Text>Write your thoughts</Text>
                    <TextArea placeholder={'Today, I met...'} numberOfLines={250} onEndEditing={handleWriteThoughts} />
                    {/* Done Button */}
                    <Pressable
                        onPress={() => navigation.navigate('Journal Success')}
                        style={{
                            backgroundColor: 'green',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: sizes.button.padding.sm,
                            borderRadius: sizes.button.radius,
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Done</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

/**
 * Prop types for the JournalThoughts component.
 * @typedef {object} JournalThoughtsProps
 * @property {object} navigation - The navigation object.
 */

/**
 * Prop types for the JournalThoughts component.
 * @type {JournalThoughtsProps}
 */
JournalThoughts.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default JournalThoughts;

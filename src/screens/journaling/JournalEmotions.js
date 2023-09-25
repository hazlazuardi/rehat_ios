import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { sizes } from '../../data/theme';
import { useJournal } from '../../context/Context';
import Chip from '../../components/Chip';

/**
 * A React Native component for selecting emotions.
 *
 * @component
 * @param {object} props - The component's properties.
 * @param {object} props.navigation - The navigation object from React Navigation.
 * @returns {JSX.Element} The rendered JournalEmotions component.
 */
function JournalEmotions({ navigation }) {
    /**
     * Custom hook to access journal data and dispatch actions.
     *
     * @type {object}
     * @property {object} journal - The journal state.
     * @property {Function} dispatchJournal - A function to dispatch journal-related actions.
     */
    const { journal, dispatchJournal } = useJournal();

    /**
     * Handles the press event of a chip.
     *
     * @param {string} emotion - The emotion associated with the chip.
     */
    function onPressChip(emotion) {
        if (journal.emotions.includes(emotion)) {
            dispatchJournal({
                type: 'setJournal',
                payload: {
                    emotions: [...journal.emotions.filter(selectedEmotion => selectedEmotion !== emotion)],
                },
            });
        } else {
            dispatchJournal({
                type: 'setJournal',
                payload: { emotions: [...journal.emotions, emotion] },
            });
        }
    }

    /**
     * Checks if a chip is selected based on the emotion.
     *
     * @param {string} emotion - The emotion to check for selection.
     * @returns {boolean} True if the chip is selected; otherwise, false.
     */
    const isChipSelected = (emotion) => journal.emotions.includes(emotion);

    console.log('isSelected', isChipSelected('Amazing'));

    return (
        <SafeAreaView>
            <View style={{ alignItems: 'center', marginHorizontal: sizes.padding.md, gap: sizes.padding.md }}>
                <Text style={{ fontSize: sizes.text.header1 }}>{journal.emotionCategory}</Text>
                <Text style={{ fontSize: sizes.text.header1 }}>What best describes this feeling?</Text>

                {/* Emotion Chips */}
                <Chip text={'Amazing'} onPress={() => onPressChip('Amazing')} isSelected={isChipSelected('Amazing')} />
                <Chip text={'Tolol'} onPress={() => onPressChip('Tolol')} isSelected={isChipSelected('Tolol')} />
                <Chip text={'Calm'} onPress={() => onPressChip('Calm')} isSelected={isChipSelected('Calm')} />

                {/* Done Button */}
                <Pressable
                    onPress={() => navigation.navigate('Journal Thoughts')}
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
        </SafeAreaView>
    );
}

/**
 * Prop types for the JournalEmotions component.
 *
 * @typedef {object} EmotionsProps
 * @property {object} navigation - The navigation object from React Navigation.
 */

/**
 * Default props for the JournalEmotions component.
 *
 * @type {EmotionsProps}
 */
JournalEmotions.defaultProps = {};

/**
 * Prop types for the JournalEmotions component.
 *
 * @type {EmotionsProps}
 */
JournalEmotions.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default JournalEmotions;

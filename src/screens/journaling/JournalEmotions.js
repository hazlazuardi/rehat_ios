import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { sizes, styles } from '../../data/theme';
import { useJournal, useJournalingConfig } from '../../context/Context';
import Chip from '../../components/Chip';
import PrimaryButton from '../../components/PrimaryButton';
import { convertToCamelCase, toAssetCase } from '../../helpers/helpers';
import EmotionCategoryButton from '../../components/journaling/EmotionCategoryButton';
import Divider from '../../components/Divider';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';

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

    const { journalingConfig } = useJournalingConfig()

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


    const handlePrimaryButton = () => {
        dispatchJournal({ type: 'setJournal', payload: { dateAdded: Date.now() } })
        navigation.navigate('Journal Thoughts')
    }

    console.log('isSelected', isChipSelected('Amazing'));

    return (
        <BlurredEllipsesBackground>
            <SafeAreaView>
                <View style={{ padding: sizes.padding.md, gap: sizes.gap.lg }}>

                    {/* journalCategory */}
                    <View style={{ alignItems: 'center', gap: sizes.gap.md }}>
                        <EmotionCategoryButton title={journal.emotionCategory} variant={toAssetCase(journal.emotionCategory)} width={120} disabled />
                    </View>

                    {/* Heading */}
                    <View style={{ gap: sizes.gap.md }}>
                        <Text style={styles.text.header3}>What best describes this feeling?</Text>
                        <Divider color={'white'} />
                    </View>

                    {/* journalEmotions */}
                    <View style={{ gap: sizes.padding.md }}>
                        {/* Emotion Chips */}
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: sizes.padding.sm }} >
                            {journalingConfig.journalEmotions[convertToCamelCase(journal.emotionCategory)]?.map(emotion => {
                                return (
                                    <Chip key={emotion} text={emotion} onPress={() => onPressChip(emotion)} isSelected={isChipSelected(emotion)} />
                                )
                            })}
                        </View>
                    </View>

                    {/* Done Button */}
                    <PrimaryButton
                        onPress={handlePrimaryButton}
                        text={'Done'}
                        color={'green'}
                        disabled={journal.emotions?.length === 0}
                    />
                </View>
            </SafeAreaView>
        </BlurredEllipsesBackground>
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

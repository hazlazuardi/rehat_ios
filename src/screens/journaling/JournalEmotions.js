import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { sizes, styles } from '../../data/theme';
// import { useJournal, useJournalingConfig } from '../../context/Context';
import Chip from '../../components/Chip';
import PrimaryButton from '../../components/PrimaryButton';
import { convertToCamelCase, toAssetCase } from '../../helpers/helpers';
import EmotionCategoryButton from '../../components/journaling/EmotionCategoryButton';
import Divider from '../../components/Divider';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import useManageJournaling from '../../helpers/useManageJournaling';

/**
 * A React Native component for selecting emotions.
 *
 * @component
 * @param {object} props - The component's properties.
 * @param {object} props.navigation - The navigation object from React Navigation.
 * @returns {JSX.Element} The rendered JournalEmotions component.
 */
function JournalEmotions({ navigation }) {

    const {
        currentJournal,
        journalingConfig,
        setCurrentJournal
    } = useManageJournaling()

    function onPressChip(emotion) {
        if (currentJournal.emotions?.includes(emotion)) {
            setCurrentJournal('emotions', [...currentJournal.emotions.filter(selectedEmotion => selectedEmotion !== emotion)])
        } else {
            setCurrentJournal('emotions', [...currentJournal.emotions, emotion])
        }
    }
    const isChipSelected = (emotion) => currentJournal.emotions?.includes(emotion);


    const handlePrimaryButton = () => {
        // dispatchJournal({ type: 'setJournal', payload: { dateAdded: Date.now() } })
        setCurrentJournal('dateAdded', Date.now())
        navigation.navigate('Journal Thoughts')
    }

    // console.log('isSelected', isChipSelected('Amazing'));

    return (
        <BlurredEllipsesBackground>
            <SafeAreaView>
                <View style={{ padding: sizes.padding.md, gap: sizes.gap.lg }}>

                    {/* journalCategory */}
                    <View style={{ alignItems: 'center', gap: sizes.gap.md }}>
                        <EmotionCategoryButton title={currentJournal.emotionCategory} variant={toAssetCase(currentJournal.emotionCategory)} width={120} disabled />
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
                            {journalingConfig.journalEmotions[convertToCamelCase(currentJournal.emotionCategory)]?.map(emotion => {
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
                        disabled={currentJournal.emotions?.length === 0}
                    />
                </View>
            </SafeAreaView>
        </BlurredEllipsesBackground>
    );
}

JournalEmotions.defaultProps = {};

JournalEmotions.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default JournalEmotions;

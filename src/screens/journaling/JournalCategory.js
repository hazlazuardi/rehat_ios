import React from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { sizes, styles } from '../../data/theme';
import { useJournal } from '../../context/Context';
import PrimaryButton from '../../components/PrimaryButton';
import EmotionCategoryButton from '../../components/journaling/EmotionCategoryButton';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';


/**
 * A component for selecting the emotion category.
 *
 * @component
 * @param {object} props - The component's properties.
 * @param {object} props.navigation - The navigation object.
 * @returns {JSX.Element} The rendered JournalCategory component.
 */
function JournalCategory({ navigation }) {

    const { journal } = useJournal()

    return (
        <BlurredEllipsesBackground>
            <SafeAreaView>
                <View style={{ padding: sizes.padding.md, gap: sizes.gap.lg }}>

                    {/* Heading */}
                    <Text style={{ ...styles.text.header1, textAlign: 'center' }}>Choose How You're Feeling Right Now</Text>

                    {/* journalCategory */}
                    <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                            <EmotionCategoryButton title="Unpleasant" width={120} variant='unpleasant' />
                            <EmotionCategoryButton title="Slightly Unpleasant" width={120} variant='slightly_unpleasant' />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', margin: sizes.padding.md }}>
                            <EmotionCategoryButton title="Neutral" width={120} variant='neutral' />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                            <EmotionCategoryButton title="Pleasant" width={120} variant='pleasant' />
                            <EmotionCategoryButton title="Very Pleasant" width={120} variant='very_pleasant' />
                        </View>
                    </View>

                    {/* Done Button */}
                    <PrimaryButton
                        onPress={() => navigation.navigate('Journal Emotions')}
                        text={'Done'}
                        color={'green'}
                        disabled={journal.emotionCategory === ''}


                    />
                </View>
            </SafeAreaView>
        </BlurredEllipsesBackground>
    );
}

/**
 * Prop types for the JournalCategory component.
 *
 * @typedef {object} JournalCategoryProps
 * @property {object} navigation - The navigation object.
 */

/**
 * Prop types for the JournalCategory component.
 *
 * @type {JournalCategoryProps}
 */
JournalCategory.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default JournalCategory;

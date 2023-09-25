import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { sizes } from '../../data/theme';
import { useJournal } from '../../context/Context';
import PrimaryButton from '../../components/PrimaryButton';

/**
 * A button component for emotion categories.
 *
 * @component
 * @param {object} props - The component's properties.
 * @param {string} props.title - The title of the emotion category.
 * @returns {JSX.Element} The rendered EmotionCategoryButton component.
 */
function EmotionCategoryButton({ title }) {
    const { journal, dispatchJournal } = useJournal();
    const isSelected = journal.emotionCategory === title;

    /**
     * Handles the press event of an emotion category button.
     *
     * @param {string} title - The title of the emotion category.
     */
    const handleEmotionCategoryPress = (title) => {
        dispatchJournal({ type: 'setJournal', payload: { emotionCategory: title } });
    };

    return (
        <>
            <Pressable
                onPress={() => handleEmotionCategoryPress(title)}
                style={{
                    backgroundColor: isSelected ? 'green' : 'grey',
                    aspectRatio: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: sizes.padding.sm,
                    width: '40%',
                    borderRadius: sizes.radius,
                }}
            >
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{title}</Text>
            </Pressable>
        </>
    );
}

/**
 * Prop types for the EmotionCategoryButton component.
 *
 * @typedef {object} EmotionCategoryButtonProps
 * @property {string} title - The title of the emotion category.
 */

/**
 * Prop types for the EmotionCategoryButton component.
 *
 * @type {EmotionCategoryButtonProps}
 */
EmotionCategoryButton.propTypes = {
    title: PropTypes.string.isRequired,
};

/**
 * A component for selecting the emotion category.
 *
 * @component
 * @param {object} props - The component's properties.
 * @param {object} props.navigation - The navigation object.
 * @returns {JSX.Element} The rendered JournalCategory component.
 */
function JournalCategory({ navigation }) {
    return (
        <SafeAreaView>
            <View style={{ alignItems: 'center', marginHorizontal: sizes.padding.md, gap: sizes.padding.md }}>
                <Text style={{ fontSize: sizes.text.header1 }}>Choose How You're Feeling Right Now</Text>
                <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                        <EmotionCategoryButton title="Unpleasant" />
                        <EmotionCategoryButton title="Slightly Unpleasant" />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', margin: sizes.padding.md }}>
                        <EmotionCategoryButton title="Neutral" />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                        <EmotionCategoryButton title="Pleasant" />
                        <EmotionCategoryButton title="Very Pleasant" />
                    </View>
                </View>
                <PrimaryButton
                    onPress={() => navigation.navigate('Journal Emotions')}
                    text={'Done'}
                    color={'green'}
                />
            </View>
        </SafeAreaView>
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

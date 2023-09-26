import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, Text, View } from 'react-native';
import { sizes } from '../../data/theme';
import { useJournal } from '../../context/Context';
import PrimaryButton from '../../components/PrimaryButton';
import EmotionCategoryButton from '../../components/journaling/EmotionCategoryButton';


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
        <SafeAreaView>
            <View style={{ alignItems: 'center', paddingTop: sizes.padding.md, marginHorizontal: sizes.padding.md, gap: sizes.padding.md }}>
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
                    disabled={journal.emotionCategory === ''}


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

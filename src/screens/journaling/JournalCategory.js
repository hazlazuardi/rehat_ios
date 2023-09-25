import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { sizes } from '../../data/theme';
import { useJournal } from '../../context/Context';

/**
 * A component for selecting the emotion category.
 *
 * @component
 * @param {object} props - The component's properties.
 * @param {object} props.navigation - The navigation object.
 * @returns {JSX.Element} The rendered JournalCategory component.
 */
function JournalCategory({ navigation }) {
    const EmotionCategoryButton = ({ title }) => {
        const { journal, dispatchJournal } = useJournal();
        const isSelected = journal.emotionCategory === title;

        return (
            <>
                <Pressable
                    onPress={() => dispatchJournal({ type: 'setJournal', payload: { emotionCategory: title } })}
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
    };

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
                <Pressable
                    onPress={() => navigation.navigate('Journal Emotions')}
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

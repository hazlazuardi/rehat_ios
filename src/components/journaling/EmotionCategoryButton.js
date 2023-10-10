import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text } from 'react-native';
import { sizes } from '../../data/theme';
import { useJournal } from '../../context/Context';


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
                    borderRadius: sizes.radius.lg,
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
 * @typedef {object} EmotionCategoryButton
 * @property {string} title - The title of the emotion category.
 */

/**
 * Prop types for the EmotionCategoryButton component.
 *
 * @type {EmotionCategoryButton}
 */
EmotionCategoryButton.propTypes = {
    title: PropTypes.string.isRequired,
};

export default EmotionCategoryButton;

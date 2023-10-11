import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text, View } from 'react-native';
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
function EmotionCategoryButton({ title, isFillContainer, width, disabled }) {
    const { journal, dispatchJournal } = useJournal();
    const isSelected = journal.emotionCategory === title;

    console.log('jecat dalem: ', journal.emotionCategory)

    /**
     * Handles the press event of an emotion category button.
     *
     * @param {string} title - The title of the emotion category.
     */
    const handleEmotionCategoryPress = (title) => {
        if (!disabled) dispatchJournal({ type: 'setJournal', payload: { emotionCategory: title } });
    };

    const styles =
    {
        backgroundColor: isSelected || disabled ? 'green' : 'grey',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: sizes.padding.sm,
        width: width ? width : null,
        flex: width ? null : (isFillContainer ? 1 : 1 / 3),
        borderRadius: sizes.radius.lg,
    }

    if (disabled) {
        return (
            <View style={{ ...styles }}>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{title}</Text>
            </View>
        )
    }

    return (
        <>
            <Pressable
                onPress={() => { handleEmotionCategoryPress(title) }}
                style={{
                    ...styles
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
 * @property {boolean} isFillContainer - The bool if it should fill the container
 * @property {number} width - The fixed width
 */

/**
 * Prop types for the EmotionCategoryButton component.
 *
 * @type {EmotionCategoryButton}
 */
EmotionCategoryButton.propTypes = {
    title: PropTypes.string.isRequired,
    isFillContainer: PropTypes.bool
};

export default EmotionCategoryButton;

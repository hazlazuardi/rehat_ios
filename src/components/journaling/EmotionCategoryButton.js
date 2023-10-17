import React from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import { sizes, styles } from '../../data/theme';
import { useJournal } from '../../context/Context';
import assets from '../../data/assets';
import useManageJournaling from '../../helpers/useManageJournaling';


/**
 * A button component for emotion categories.
 *
 * @component
 * @param {object} props - The component's properties.
 * @param {string} props.title - The title of the emotion category.
 * @returns {JSX.Element} The rendered EmotionCategoryButton component.
 */
function EmotionCategoryButton({ title, isFillContainer, width, disabled, variant }) {
    // const { journal, dispatchJournal } = useJournalContext();

    const {
        currentJournal,
        setCurrentJournal
    } = useManageJournaling()

    const isSelected = currentJournal.emotionCategory === title;

    // console.log('jecat dalem: ', currentJournal.emotionCategory)

    /**
     * Handles the press event of an emotion category button.
     *
     * @param {string} title - The title of the emotion category.
     */
    const handleEmotionCategoryPress = (title) => {
        if (!disabled) {
            // console.log('pressed')
            setCurrentJournal('emotionCategory', title)
        }
    };

    const innerStyles =
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
            <ImageBackground source={assets.images[variant]}
                width={width}
                height={width}
            >
                <View style={{
                    width: width,
                    height: width,
                }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, padding: sizes.padding.md }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>{title}</Text>
                    </View>
                </View>
            </ImageBackground>
        )
    }

    return (
        <Pressable onPress={() => { handleEmotionCategoryPress(title) }}>
            <ImageBackground source={assets.images[variant]}
                width={width}
                height={width}
                style={{
                    opacity: isSelected ? 1 : .5
                }}
            >
                <View style={{
                    width: width,
                    height: width,
                }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, padding: sizes.padding.md }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>{title}</Text>
                    </View>
                </View>
            </ImageBackground>
        </Pressable>
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
    title: PropTypes.string,
    isFillContainer: PropTypes.bool
};

export default EmotionCategoryButton;

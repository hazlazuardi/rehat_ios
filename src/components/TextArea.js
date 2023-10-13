import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import { sizes } from '../data/theme';

/**
 * A multiline text input component.
 *
 * @component
 * @param {object} props - The component's properties.
 * @param {string} props.placeholder - The placeholder text for the input.
 * @param {number} props.numberOfLines - The number of lines to display in the input.
 * @param {Function} props.onEndEditing - A callback function to be called when editing ends.
 * @returns {JSX.Element} The rendered TextArea component.
 */
function TextArea({ multiline, textStyle, placeholder, onEndEditing, value }) {
    const [inputText, setInputText] = useState('');

    /**
     * Handles the end of input editing.
     */
    const handleEndEditing = () => {
        const trimmedText = inputText.trim();
        onEndEditing(trimmedText); // Call the onEndEditing callback with the trimmed input text

        // Clear the input field
        // setInputText('');
    };

    const innerTextStyle = textStyle ? { ...textStyle } : {
        color: 'white',
        fontSize: sizes.text.header3,
    }

    return (
        <TextInput
            multiline={true}
            maxLength={!multiline ? 40 : 100_000_000}
            // multiline={numberOfLines === 1 ? false : true}
            placeholder={placeholder}
            value={value || inputText}
            onChangeText={(text) => setInputText(text)}
            onEndEditing={handleEndEditing}
            scrollEnabled={false}
            style={{
                minHeight: !multiline ? sizes.padding.md / 2 : sizes.padding.lg * 4,
                backgroundColor: 'grey',
                borderRadius: sizes.radius.sm,
                paddingHorizontal: sizes.padding.md,
                paddingTop: sizes.padding.md,
                paddingBottom: sizes.padding.md,
                // paddingVertical: 0,
                ...innerTextStyle,
            }}
        />
    );
}

/**
 * Prop types for the TextArea component.
 *
 * @typedef {object} TextAreaProps
 * @property {string} placeholder - The placeholder text for the input.
 * @property {number} numberOfLines - The number of lines to display in the input.
 * @property {Function} onEndEditing - A callback function to be called when editing ends.
 */

/**
 * Prop types for the TextArea component.
 *
 * @type {TextAreaProps}
 */
TextArea.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onEndEditing: PropTypes.func.isRequired,
};

export default TextArea;

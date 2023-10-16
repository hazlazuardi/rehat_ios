import React, { useState } from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { sizes, styles } from '../data/theme';

/**
 * A customizable input component with the appearance of the Chip component
 *
 * @component
 * @param {object} props - The component's properties.
 * @param {string} props.type - The type of anything really (e.g 'location' or 'people').
 * @param {Function} props.onEndEditing - A callback function to be executed when the input ends editing.
 * @returns {JSX.Element} The rendered ChipInput component.
 */
function ChipInput({ type, onEndEditing, onFocus, onBlur, font, size, variant, color }) {
    const [inputText, setInputText] = useState('');

    /**
     * Handles the end of input editing.
     */
    const handleEndEditing = () => {
        const trimmedText = inputText.trim();
        onEndEditing(trimmedText, type); // Call the onEndEditing callback with the trimmed input text

        // Clear the input field
        setInputText('');
    };

    const handleChange = text => {
        setInputText(text)
    }


    const innerStyle = {
        outlined: {
            borderColor: color,
            backgroundColor: 'transparent',
            borderWidth: 1
        },
        filled: {
            backgroundColor: color,
        }
    }

    return (
        <TextInput
            // {...props}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder="     +     "
            // placeholderTextColor="white"
            value={inputText}
            onChangeText={handleChange}
            onSubmitEditing={handleEndEditing}
            style={{
                backgroundColor: 'transparent',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: sizes.button.radius,
                borderColor: 'grey',
                borderWidth: 1,
                paddingHorizontal: size ? sizes.button.padding[size] : sizes.button.padding.sm,
                paddingVertical: size ? sizes.button.padding[size] / 2 : sizes.button.padding.sm / 2,
                width: 'auto',
                ...innerStyle[variant],
                ...styles.text[font],
            }}
        />
    );
}

/**
 * Prop types for the ChipInput component.
 *
 * @typedef {object} ChipInputProps
 * @property {string} type - The type of anything really (e.g 'location' or 'people').
 * @property {Function} onEndEditing - A callback function to be executed when the input ends editing.
 */

/**
 * Prop types for the ChipInput component.
 *
 * @type {ChipInputProps}
 */
ChipInput.propTypes = {
    type: PropTypes.string.isRequired,
    onEndEditing: PropTypes.func.isRequired,
};

export default ChipInput;

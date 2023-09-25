import React, { useState } from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { sizes } from '../data/theme';

/**
 * A customizable input component with the appearance of the Chip component
 *
 * @component
 * @param {object} props - The component's properties.
 * @param {string} props.type - The type of anything really (e.g 'location' or 'people').
 * @param {function} props.onEndEditing - A callback function to be executed when the input ends editing.
 * @returns {JSX.Element} The rendered ChipInput component.
 */
function ChipInput({ type, onEndEditing }) {
    const [inputText, setInputText] = useState('');

    /**
     * Handles the end of input editing.
     */
    const handleEndEditing = () => {
        if (inputText.trim() !== '') {
            // Call the onEndEditing callback with the trimmed input text and type
            onEndEditing(inputText.trim(), type);

            // Clear the input field
            setInputText('');
        }
    };

    return (
        <TextInput
            placeholder="     +     "
            placeholderTextColor="white"
            value={inputText}
            onChangeText={(text) => setInputText(text)}
            onEndEditing={handleEndEditing}
            style={{
                backgroundColor: 'grey',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: sizes.button.radius,
                padding: sizes.button.padding.sm,
            }}
        />
    );
}

/**
 * Prop types for the ChipInput component.
 *
 * @typedef {object} ChipInputProps
 * @property {string} type - The type of anything really (e.g 'location' or 'people').
 * @property {function} onEndEditing - A callback function to be executed when the input ends editing.
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

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
 * @param {boolean} props.multiline - Whether the text input should be multiline.
 * @param {Function} props.onEndEditing - A callback function to be called when editing ends.
 * @param {string} props.value - Initial value of the input.
 * @param {object} props.textStyle - Styles for the text inside the input.
 * @returns {JSX.Element} The rendered TextArea component.
 */
function TextArea(props) {

    const { placeholder, onEndEditing, value, textStyle, multiline } = props
    const [inputText, setInputText] = useState('');

    /**
     * Handles the end of input editing.
     */
    const handleEndEditing = () => {
        if (onEndEditing) {
            const trimmedText = inputText.trim();
            onEndEditing(trimmedText); // Call the onEndEditing callback with the trimmed input text
        }
    };

    const innerTextStyle = textStyle ? { ...textStyle } : {
        color: 'white',
        fontSize: sizes.text.header3,
    }

    return (
        <TextInput
            {...props}
            multiline={true}
            maxLength={!multiline ? 40 : 100_000_000}
            placeholder={placeholder}
            value={value || inputText}
            onChangeText={props.onChangeText || setInputText}
            onEndEditing={handleEndEditing}
            scrollEnabled={false}
            style={{
                minHeight: !multiline ? sizes.padding.md / 2 : sizes.padding.lg * 4,
                backgroundColor: 'grey',
                borderRadius: sizes.radius.sm,
                paddingHorizontal: sizes.padding.md,
                paddingTop: sizes.padding.md,
                paddingBottom: sizes.padding.md,
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
 * @property {boolean} multiline - Whether the text input should be multiline.
 * @property {Function} onEndEditing - A callback function to be called when editing ends.
 * @property {string} [value] - Initial value of the input.
 * @property {object} [textStyle] - Styles for the text inside the input.
 */

/**
 * Prop types for the TextArea component.
 *
 * @type {TextAreaProps}
 */
TextArea.propTypes = {
    placeholder: PropTypes.string.isRequired,
    multiline: PropTypes.bool.isRequired,
    onEndEditing: PropTypes.func,
    value: PropTypes.string,
    textStyle: PropTypes.object
};

export default TextArea;

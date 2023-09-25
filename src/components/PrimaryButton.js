import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text } from 'react-native';
import { sizes } from '../data/theme';

/**
 * A primary button component.
 *
 * @component
 * @param {object} props - The component's properties.
 * @param {Function} props.onPress - The function to call when the button is pressed.
 * @param {string} props.text - The text to display on the button.
 * @param {string} props.color - The background color of the button.
 * @returns {JSX.Element} The rendered PrimaryButton component.
 */
function PrimaryButton({ onPress, text, color }) {
    return (
        <Pressable
            onPress={onPress}
            style={{
                backgroundColor: color,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: sizes.button.padding.sm,
                borderRadius: sizes.button.radius,
            }}
        >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{text}</Text>
        </Pressable>
    );
}

/**
 * Prop types for the PrimaryButton component.
 *
 * @typedef {object} PrimaryButtonProps
 * @property {Function} onPress - The function to call when the button is pressed.
 * @property {string} text - The text to display on the button.
 * @property {string} color - The background color of the button.
 */

/**
 * Prop types for the PrimaryButton component.
 *
 * @type {PrimaryButtonProps}
 */
PrimaryButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
};

export default PrimaryButton;

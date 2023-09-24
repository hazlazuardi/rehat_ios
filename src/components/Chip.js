import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text } from 'react-native';
import { sizes } from '../data/theme';

/**
 * A customizable chip component for React Native.
 *
 * @component
 * @param {object} props - The component's properties.
 * @param {string} props.text - The text content displayed on the chip.
 * @param {function} props.onPress - A callback function to be executed when the chip is pressed.
 * @param {boolean} props.isSelected - Indicates whether the chip is selected or not.
 * @returns {JSX.Element} The rendered Chip component.
 */
function Chip({ text, onPress, isSelected }) {
    /**
     * Handles the press event of the chip.
     */
    function handlePress() {
        onPress();
    }

    return (
        <Pressable
            onPress={handlePress}
            style={{
                backgroundColor: isSelected ? 'green' : 'grey',
                borderRadius: sizes.button.radius,
                padding: sizes.button.padding.sm,
            }}
        >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{text}</Text>
        </Pressable>
    );
}

/**
 * Prop types for the Chip component.
 *
 * @typedef {object} ChipProps
 * @property {string} text - The text content displayed on the chip.
 * @property {function} onPress - A callback function to be executed when the chip is pressed.
 * @property {boolean} isSelected - Indicates whether the chip is selected or not.
 */

/**
 * Default props for the Chip component.
 *
 * @type {ChipProps}
 */
Chip.defaultProps = {
    isSelected: false,
};

/**
 * Prop types for the Chip component.
 *
 * @type {ChipProps}
 */
Chip.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    isSelected: PropTypes.bool,
};

export default Chip;

import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text } from 'react-native';
import { colors, sizes, styles } from '../data/theme';
import { getContrastColor } from '../helpers/helpers';

/**
 * A customizable chip component for React Native.
 *
 * @component
 * @param {object} props - The component's properties.
 * @param {string} props.text - The text content displayed on the chip.
 * @param {Function} [props.onPress] - A callback function to be executed when the chip is pressed (optional).
 * @param {boolean} props.isSelected - Indicates whether the chip is selected or not.
 * @returns {JSX.Element} The rendered Chip component.
 */
function Chip({ text, onPress, isSelected, size, variant, color }) {
    /**
     * Handles the press event of the chip.
     */
    function handlePress() {
        if (onPress) {
            onPress();
        }
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

    const innerTextStyle = {
        caption: styles.text.caption,
        body3: styles.text.body3,

    }

    return (
        <Pressable
            onPress={handlePress}
            style={{
                backgroundColor: isSelected ? 'green' : (color || colors.darkGrey),
                borderRadius: sizes.button.radius,
                paddingHorizontal: sizes.button.padding.sm,
                paddingVertical: sizes.button.padding.sm / 2,
                ...innerStyle[variant]
            }}
        >
            <Text style={{
                // ...styles.text.caption,
                // ...innerTextStyle[size],
                ...styles.text[size],
                color: variant === 'outlined' ? color : color ? getContrastColor(color) : colors.white
            }}>{text}</Text>
        </Pressable>
    );
}

/**
 * Prop types for the Chip component.
 *
 * @typedef {object} ChipProps
 * @property {string} text - The text content displayed on the chip.
 * @property {Function} [onPress] - A callback function to be executed when the chip is pressed (optional).
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
    onPress: PropTypes.func,
    isSelected: PropTypes.bool,
};

export default Chip;

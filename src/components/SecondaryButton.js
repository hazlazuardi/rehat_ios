import React from 'react'
import PropTypes from 'prop-types'
import { Pressable, Text, View } from 'react-native'
import { colors, sizes, styles } from '../data/theme'
import { getContrastColor } from '../helpers/helpers'

function SecondaryButton({ text, color, onPress, textColor }) {
    return (
        <Pressable onPress={onPress}>
            <View style={{
                backgroundColor: color,
                alignSelf: 'flex-start',
                paddingHorizontal: sizes.padding.lg,
                paddingVertical: sizes.padding.md,
                borderRadius: sizes.radius.sm
            }} >
                <Text style={{
                    ...styles.text.semi2,
                    color: textColor || getContrastColor(color)
                }}>{text}</Text>
            </View>
        </Pressable>

    )
}

SecondaryButton.propTypes = {}

export default SecondaryButton

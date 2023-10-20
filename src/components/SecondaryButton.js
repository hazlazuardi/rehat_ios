import React from 'react'
import PropTypes from 'prop-types'
import { Pressable, Text, View } from 'react-native'
import { colors, sizes, styles } from '../data/theme'
import { getContrastColor } from '../helpers/helpers'

function SecondaryButton({ text, color, onPress, textColor, font, size }) {

    return (
        <Pressable onPress={onPress}>
            <View style={{
                backgroundColor: color,
                alignSelf: 'flex-start',
                paddingHorizontal: size ? sizes.padding[size] * 2 : sizes.padding.lg,
                paddingVertical: size ? sizes.padding[size] : sizes.padding.md,
                borderRadius: sizes.radius.sm
            }} >
                <Text style={{
                    ...styles.text[font],
                    color: textColor || getContrastColor(color)
                }}>
                    {text}
                </Text>
            </View>
        </Pressable>

    )
}

SecondaryButton.propTypes = {}

export default SecondaryButton

import React from 'react'
import PropTypes from 'prop-types'
import { Pressable, Text, View } from 'react-native'
import { colors, sizes, styles } from '../data/theme'
import { getContrastColor } from '../helpers/helpers'

function SecondaryButton({ text, color, onPress }) {
    return (
        <Pressable onPress={onPress}>
            <View style={{
                backgroundColor: color,
                alignSelf: 'flex-start',
                paddingHorizontal: sizes.padding.md,
                paddingVertical: sizes.padding.sm,
                borderRadius: sizes.radius.sm
            }} >
                <Text style={{
                    ...styles.text.body3,
                    color: getContrastColor(color)
                }}>{text}</Text>
            </View>
        </Pressable>

    )
}

SecondaryButton.propTypes = {}

export default SecondaryButton

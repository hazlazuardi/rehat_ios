import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { sizes } from '../data/theme'

function Divider({ hasMarginX }) {
    return (
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginHorizontal: hasMarginX && sizes.padding.lg }} />
    )
}

Divider.propTypes = {}

export default Divider

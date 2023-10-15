import React from 'react'
import PropTypes from 'prop-types'
import { Image, View } from 'react-native'
import { sizes } from '../data/theme'

/**
 * Represents a circular icon component.
 * 
 * @component
 * @param {Object} props - Properties passed to component
 * @param {string} props.containerColor - Color for the icon container
 * @param {Object} props.icon - Source for the icon image
 * @param {number} props.iconWidth - Width of the icon inside the container
 * @param {number} props.iconContainerWidth - Width of the icon container
 */
function CircularIcon({ containerColor, icon, iconWidth, iconContainerWidth }) {
    return (
        <View style={{
            backgroundColor: containerColor,
            borderRadius: sizes.radius.lg * 50,
            padding: sizes.padding.md,
            alignItems: 'center',
            justifyContent: 'center',
            aspectRatio: 1,
            width: iconContainerWidth
        }}>
            <View style={{
                width: iconWidth,
                aspectRatio: 1,
            }}>
                <Image
                    source={icon}
                    style={{
                        flex: 1,
                        aspectRatio: 1
                    }}
                />
            </View>
        </View>
    )
}

CircularIcon.propTypes = {
    containerColor: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    iconWidth: PropTypes.number.isRequired,
    iconContainerWidth: PropTypes.number.isRequired
}

export default CircularIcon

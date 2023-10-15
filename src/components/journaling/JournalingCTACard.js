import React from 'react'
import PropTypes from 'prop-types'
import { Image, Pressable, Text, View } from 'react-native'
import { colors, sizes, styles } from '../../data/theme'
import assets from '../../data/assets'
import SecondaryButton from '../SecondaryButton'

function JournalingCTACard({ title, description, buttonText, icon, onPress }) {
    return (
        <View style={{
            borderRadius: sizes.radius.lg,
            backgroundColor: colors.turqoise,
            padding: sizes.padding.md,
            gap: sizes.gap.md,
            width: '100%'
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: sizes.gap.sm }} >
                <View style={{ width: 20, aspectRatio: 1 }}>
                    <Image
                        source={icon}
                        style={{
                            flex: 1,
                            aspectRatio: 1
                        }}
                    />
                </View>
                <Text style={styles.text.semi1}>{title}</Text>
            </View>
            <View>
                <Text style={styles.text.merri.body2} >{description}</Text>
            </View>
            <SecondaryButton
                text={buttonText}
                color={colors.orange}
                onPress={onPress}
                textColor={colors.white}
            />
        </View>
    )
}

JournalingCTACard.propTypes = {}

export default JournalingCTACard

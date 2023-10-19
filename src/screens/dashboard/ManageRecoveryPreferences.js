import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { colors, sizes, styles } from '../../data/theme'
import Divider from '../../components/Divider'
import PrimaryButton from '../../components/PrimaryButton'
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useRecommendedMethod, useRecoveryPreferences } from '../../context/Context'
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground'
import { toAssetCase } from '../../helpers/helpers'
import assets from '../../data/assets'

function ManageRecoveryPreferences(props) {

    const { recoveryPreferences, dispatchRecoveryPreferences } = useRecoveryPreferences()

    const { recommendedMethod } = useRecommendedMethod()
    console.log('manrec', recommendedMethod)


    useEffect(() => {
        dispatchRecoveryPreferences({ type: 'getRecoveryPreferences' })
    }, [])

    const renderItem = ({ item, drag, isActive }) => {


        const isRecommended = recommendedMethod && toAssetCase(item.label) === toAssetCase(recommendedMethod)
        return (
            <Pressable
                onLongPress={isDraggingEnabled ? drag : null}
                delayLongPress={200}
                style={{
                    marginVertical: sizes.padding.sm / 2
                }}
            >
                <ListItem title={item.label} isRecommended={isRecommended} isActive={isActive} isDraggingEnabled={isDraggingEnabled} />
            </Pressable>
        );
    };

    const [data, setData] = useState(recoveryPreferences);
    const [isDraggingEnabled, setDraggingEnabled] = useState(false);

    const handleDragEnd = ({ data }) => {
        setData(data)
        dispatchRecoveryPreferences({ type: 'sortRecoveryPreferences', payload: [...data] })
    }

    const handlePrimaryButton = () => {
        setDraggingEnabled(prev => !prev)
    }

    return (
        <BlurredEllipsesBackground>
            <ScrollView style={{ flex: 1 }} contentInsetAdjustmentBehavior='automatic'>
                <SafeAreaView>
                    <View style={{
                        flex: 1,
                        gap: sizes.gap.lg,
                        // alignItems: 'center',
                        // justifyContent: 'center',
                        paddingHorizontal: sizes.padding.md,
                        paddingBottom: sizes.padding.lg * 2,
                        paddingTop: sizes.padding.lg
                    }}
                    >
                        <DraggableFlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.key}
                            onDragEnd={handleDragEnd}
                            drag={isDraggingEnabled}
                            scrollEnabled={false}
                        />
                        <PrimaryButton text={isDraggingEnabled ? 'Save' : 'Edit'} color={colors.almostBlack} onPress={handlePrimaryButton} />
                    </View>
                </SafeAreaView>
            </ScrollView>
        </BlurredEllipsesBackground>
    )
}

ManageRecoveryPreferences.propTypes = {}

export default ManageRecoveryPreferences

export function ListItem({ title, subtitle, isRecommended, isActive, isDraggingEnabled, renderRightItem }) {

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: sizes.padding.sm,
            paddingHorizontal: sizes.padding.md,
            backgroundColor: isActive ? colors.whiteSoTransparent : colors.darkGrey,
            borderRadius: sizes.radius.sm
        }}>
            <View>
                <View style={{
                    flexDirection: 'row',
                    gap: sizes.gap.md
                }}>
                    <Text style={{ ...styles.text.semi1 }}>{title}</Text>
                    {/* isRecommended */}
                    {isRecommended && (
                        <Image
                            source={assets.icons.star}
                            style={{
                                width: 24,
                                height: 24,
                            }}
                        />
                    )}
                </View>
                {subtitle && (<Text style={{
                    ...styles.text.body2,
                    opacity: .75

                }}>{subtitle}</Text>)}
            </View>
            <Text style={{ fontWeight: '300', fontSize: sizes.text.header1, color: 'white' }} >{isDraggingEnabled ? '=' : ' '}</Text>
            {renderRightItem}
        </View>
    )
}
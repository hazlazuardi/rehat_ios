import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { colors, sizes, styles } from '../../data/theme'
import Divider from '../../components/Divider'
import PrimaryButton from '../../components/PrimaryButton'
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useRecoveryPreferences } from '../../context/Context'
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground'

function ManageRecoveryPreferences(props) {

    const { recoveryPreferences, dispatchRecoveryPreferences } = useRecoveryPreferences()

    useEffect(() => {
        dispatchRecoveryPreferences({ type: 'getRecoveryPreferences' })
    }, [])

    const renderItem = ({ item, drag, isActive }) => {
        return (
            <Pressable
                onLongPress={isDraggingEnabled ? drag : null}
                delayLongPress={200}
                style={{
                    marginVertical: sizes.padding.sm / 2
                }}
            >
                <ListItem title={item.label} isActive={isActive} isDraggingEnabled={isDraggingEnabled} />
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

function ListItem({ title, subtitle, isActive, isDraggingEnabled }) {

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
                <Text style={{ ...styles.text.semi1 }}>{title}</Text>
                {subtitle && (<Text style={styles.text.semi2}>{subtitle}</Text>)}
            </View>
            <Text style={{ fontWeight: '300', fontSize: sizes.text.header1, color: 'white' }} >{isDraggingEnabled ? '=' : ' '}</Text>
        </View>
    )
}
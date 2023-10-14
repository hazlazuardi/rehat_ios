import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { sizes, styles } from '../../data/theme'
import Divider from '../../components/Divider'
import PrimaryButton from '../../components/PrimaryButton'
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useRecoveryReferences } from '../../context/Context'

function ManageRecoveryPreferences(props) {

    const { recoveryReferences, dispatchRecoveryReferences } = useRecoveryReferences()

    useEffect(() => {
        dispatchRecoveryReferences({ type: 'getRecoveryReferences' })
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

    const [data, setData] = useState(recoveryReferences);
    const [isDraggingEnabled, setDraggingEnabled] = useState(false);

    const handleDragEnd = ({ data }) => {
        setData(data)
        dispatchRecoveryReferences({ type: 'sortRecoveryReferences', payload: [...data] })
    }

    const handlePrimaryButton = () => {
        setDraggingEnabled(prev => !prev)
    }

    return (
        // <ScrollView >
        <SafeAreaView style={{ gap: sizes.gap.lg, flex: 1, paddingTop: sizes.padding.lg * 2, paddingHorizontal: sizes.padding.md }}>
            <Text style={{ ...styles.text.header2 }}>Recovery References</Text>
            <DraggableFlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                onDragEnd={handleDragEnd}
                drag={isDraggingEnabled}
                scrollEnabled={false}
            />
            <PrimaryButton text={isDraggingEnabled ? 'Save' : 'Edit'} color='grey' onPress={handlePrimaryButton} />
        </SafeAreaView>
        // </ScrollView>
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
            backgroundColor: isActive ? 'rgba(50,50,50,0.5)' : 'grey',
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
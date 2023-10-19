import React from 'react'
import PropTypes from 'prop-types'
import { colors, styles } from '../../data/theme'
import { ScrollView, Text } from 'react-native'
import BarChart from '../../components/monitoring/BarChart'
import usePanicHistory, { currentEpochTime, weekIntervalWidth } from '../../helpers/usePanicHistory'
import PrimaryButton from '../../components/PrimaryButton'
import { getMonday } from '../../helpers/helpers'
import { initializeWeeks } from '../../context/MonitoringProvider'

function PanicHistory(props) {
    const {
        data,
        scrollViewRef,
        scrollToCurrentDay

    } = usePanicHistory()

    console.log('init', initializeWeeks(1, 1))

    // console.log(scrollRefPanicAttackHistory.current)
    return (
        <>
            <Text style={styles.text.header3}>Panic Attack History</Text>

            <ScrollView
                ref={scrollViewRef}
                horizontal
                snapToAlignment='center'
                snapToInterval={weekIntervalWidth}
                decelerationRate={'fast'}
                showsHorizontalScrollIndicator={false}
            >
                <BarChart groupedData={Object.values(data)} />
            </ScrollView>
            <PrimaryButton
                color={colors.darkGrey}
                text='Scroll to Today'
                onPress={scrollToCurrentDay}
            />

        </>
    )
}

PanicHistory.propTypes = {}

export default PanicHistory

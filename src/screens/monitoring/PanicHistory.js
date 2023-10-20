import React from 'react'
import PropTypes from 'prop-types'
import { colors, styles } from '../../data/theme'
import { ScrollView, Text, View } from 'react-native'
import BarChart from '../../components/monitoring/BarChart'
import usePanicHistory, { currentEpochTime, weekIntervalWidth } from '../../helpers/usePanicHistory'
import PrimaryButton from '../../components/PrimaryButton'
import { getMonday } from '../../helpers/helpers'
import { initializeWeeks } from '../../context/MonitoringProvider'
import Chip from '../../components/Chip'
import SecondaryButton from '../../components/SecondaryButton'

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
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text style={styles.text.header3}>Panic Attack History</Text>
                <SecondaryButton
                    text={'Go to Today'}
                    onPress={scrollToCurrentDay}
                    color={colors.whiteSoTransparent}
                    font={'caption'}
                    size={'sm'}
                />
            </View>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                snapToAlignment='center'
                snapToInterval={weekIntervalWidth}
                decelerationRate={'fast'}
                showsHorizontalScrollIndicator={false}
            >
                <BarChart groupedData={Object.values(data)} handleScroll={scrollToCurrentDay} />
            </ScrollView>
        </>
    )
}

PanicHistory.propTypes = {}

export default PanicHistory

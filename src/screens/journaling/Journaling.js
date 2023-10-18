import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useJournal } from '../../context/Context';
import { storage } from '../../../App';
import { colors, sizes, styles } from '../../data/theme';
import PrimaryButton from '../../components/PrimaryButton';
import { trigger } from 'react-native-haptic-feedback';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import assets from '../../data/assets';
import useFormattedDate from '../../helpers/useDateFormatter';
import { formatDate, toAssetCase } from '../../helpers/helpers';
import EmotionCategoryButton from '../../components/journaling/EmotionCategoryButton';
import JournalingCTACard from '../../components/journaling/JournalingCTACard';
import useManageJournaling from '../../helpers/useManageJournaling';


// TODO: Sort Journaling List based on dateAdded

/**
 * A component for journaling and managing journals.
 *
 * @component
 * @param {JournalingProps} props - The component's properties.
 * @returns {JSX.Element} The rendered Journaling component.
 */
function Journaling({ navigation }) {

    const {
        journals,
        getAllJournals
    } = useManageJournaling()

    useEffect(() => {
        getAllJournals()
    }, []);

    // console.log('journals', [...journals])

    return (
        <BlurredEllipsesBackground>
            <ScrollView style={{ flex: 1 }} contentInsetAdjustmentBehavior='automatic'>
                <SafeAreaView>
                    <View style={{ gap: sizes.gap.lg, padding: sizes.padding.md }}>

                        <View style={{ gap: sizes.gap.sm }}>
                            <Text style={{ ...styles.text.header1 }}>Journaling</Text>

                            {/* Card */}
                            <JournalingCTACard
                                title={'Journaling'}
                                description={'Another day, another story. Share yours now!'}
                                buttonText={'Check in'}
                                icon={assets.icons.journaling}
                                onPress={() => navigation.navigate('Journal Category')}
                            />
                        </View>

                        {/* My Journals */}
                        <View style={{ gap: sizes.gap.md }} >

                            {/* Section Title */}
                            <Text style={{ ...styles.text.header2 }}>My Journals</Text>

                            {/* List of My Journal */}
                            {journals.map((journal) => {
                                const formattedDate = formatDate(journal.dateAdded);
                                return (
                                    <Pressable
                                        key={journal.dateAdded + journal.emotions[0]}
                                        onPress={() => navigation.navigate('Journal Detail', { journal })}
                                    >
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <View style={{ flex: 1 }}>
                                                <View style={{
                                                    flex: 1,
                                                    flexShrink: 1,
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'flex-start',
                                                    // backgroundColor: 'red'
                                                }}>
                                                    <Text style={{ ...styles.text.header3, paddingRight: sizes.padding.md }} >
                                                        {journal.title || 'Untitled'}
                                                    </Text>
                                                    <Text style={{ ...styles.text.captionTransparent }}>
                                                        {formattedDate.dayString} at {formattedDate.timeString}
                                                    </Text>
                                                </View>
                                            </View>
                                            <EmotionCategoryButton variant={toAssetCase(journal.emotionCategory)} disabled width={80} />
                                        </View>
                                    </Pressable>
                                );
                            })}
                        </View>



                        {/* For Debugging Only */}
                        {/* <PrimaryButton
                            color='red'
                            text='Clear all journal'
                            onPress={() => {
                                dispatchJournal({ type: 'eraseJournals' })
                                trigger('impactHeavy')
                            }}
                        /> */}



                    </View>
                </SafeAreaView>
            </ScrollView>
        </BlurredEllipsesBackground >
    );
}

/**
 * Prop types for the Journaling component.
 *
 * @typedef {object} JournalingProps
 * @property {object} navigation - The navigation function.
 */

/**
 * Prop types for the Journaling component.
 *
 * @type {JournalingProps}
 */
Journaling.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Journaling;

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

/**
 * A component for journaling and managing journals.
 *
 * @component
 * @param {JournalingProps} props - The component's properties.
 * @returns {JSX.Element} The rendered Journaling component.
 */
function Journaling({ navigation }) {
    const { dispatchJournal } = useJournal();

    useEffect(() => {
        dispatchJournal({ type: 'getAllJournals' });
    }, []);

    const strAllJournals = storage.getString('journals');
    const allJournals = strAllJournals ? JSON.parse(strAllJournals) : [];
    console.log('allJournalsFromStorage', allJournals);

    const { date } = useFormattedDate()

    return (
        <BlurredEllipsesBackground>
            <ScrollView style={{ flex: 1 }} contentInsetAdjustmentBehavior='automatic'>
                <SafeAreaView>
                    <View style={{ gap: sizes.gap.lg, padding: sizes.padding.md }}>

                        <View style={{ gap: sizes.gap.sm }}>
                            <Text style={{ ...styles.text.header1 }}>Journaling</Text>

                            {/* Card */}
                            <View style={{
                                borderRadius: sizes.radius.lg,
                                backgroundColor: colors.turqoise,
                                padding: sizes.padding.md,
                                gap: sizes.gap.md
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: sizes.gap.sm }} >
                                    <View style={{ width: 20, aspectRatio: 1 }}>
                                        <Image
                                            source={assets.icons.journaling}
                                            style={{
                                                flex: 1,
                                                aspectRatio: 1
                                            }}
                                        />
                                    </View>
                                    <Text style={styles.text.semi1}>Journaling</Text>
                                </View>
                                <View>
                                    <Text style={styles.text.merri.body2} >Another day, another story.</Text>
                                    <Text style={styles.text.merri.body2}>Share yours now!</Text>
                                </View>
                                <Pressable
                                    onPress={() => {
                                        navigation.navigate("Journal Category")
                                        trigger('rigid')
                                    }}
                                >
                                    <View style={{
                                        backgroundColor: colors.orange,
                                        borderRadius: sizes.radius.sm,
                                        paddingVertical: sizes.padding.md,
                                        paddingHorizontal: sizes.padding.lg,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'flex-start'
                                    }} >
                                        <Text style={styles.text.semi2} >Check In</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>

                        {/* My Journals */}
                        <View style={{ gap: sizes.gap.md }} >

                            {/* Section Title */}
                            <Text style={{ ...styles.text.header2 }}>My Journals</Text>

                            {/* List of My Journal */}
                            {allJournals.map((journal) => {
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
                                                        {formattedDate.dateString} at {formattedDate.timeString}
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

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useJournal } from '../../context/Context';
import { storage } from '../../../App';
import { sizes, styles } from '../../data/theme';
import PrimaryButton from '../../components/PrimaryButton';
import { trigger } from 'react-native-haptic-feedback';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import assets from '../../data/assets';

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

    return (
        <BlurredEllipsesBackground>
            <ScrollView style={{ flex: 1 }} contentInsetAdjustmentBehavior='automatic'>
                <SafeAreaView>
                    <View style={{ gap: sizes.gap.lg, padding: sizes.padding.md }}>

                        <View style={{ gap: sizes.gap.sm }}>
                            <Text style={{ ...styles.text.header1 }}>Journaling</Text>

                            <View style={{
                                borderRadius: sizes.radius.lg,
                                backgroundColor: 'green',
                                padding: sizes.padding.md,
                                gap: sizes.gap.md
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: sizes.gap.sm }} >
                                    <View style={{ width: 20, aspectRatio: 1 }}>
                                        <Image
                                            source={assets.icons.journaling_head}
                                            style={{
                                                flex: 1,
                                                aspectRatio: 1
                                            }}
                                        />
                                    </View>
                                    <Text style={styles.text.semi1}>Journaling</Text>
                                </View>
                                <View>
                                    <Text>Another day, another story.</Text>
                                    <Text>Share yours now!</Text>
                                </View>
                                <Pressable
                                    onPress={() => {
                                        navigation.navigate("Journal Category")
                                        trigger('rigid')
                                    }}
                                >
                                    <View style={{
                                        backgroundColor: 'orange',
                                        borderRadius: sizes.radius.sm,
                                        padding: sizes.padding.md,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }} >
                                        <Text>Check In</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>

                        {/* My Journals */}
                        <View>
                            <Text style={{ ...styles.text.header2 }}>My Journals</Text>
                            {allJournals.map((journal) => (
                                <Pressable
                                    key={journal.dateAdded + journal.emotions[0]}
                                    onPress={() => navigation.navigate('Journal Detail', { journal })}
                                >
                                    <Text style={{ ...styles.text.header2, marginTop: 8 }} >
                                        {journal.title || 'Untitled'}
                                    </Text>
                                    <Text style={{ marginTop: 8 }}>
                                        {journal.emotions[0]}
                                    </Text>
                                </Pressable>
                            ))}
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

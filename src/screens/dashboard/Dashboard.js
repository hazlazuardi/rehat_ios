import React from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import JournalSuccess from '../journaling/JournalSuccess';
import useManageGoals from '../../helpers/useManageGoals';
import { colors, sizes, styles } from '../../data/theme';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import assets from '../../data/assets';
import { formatDate } from '../../helpers/helpers';
import CircularIcon from '../../components/CircularIcon';
import JournalingCTACard from '../../components/journaling/JournalingCTACard';

function Dashboard({ navigation }) {

    const { goals, toggleGoalCompletion } = useManageGoals()

    const sortedGoals = [...goals].sort((a, b) => {
        if (a.isCompleted === b.isCompleted) {
            return b.id - a.id; // Sort by date, with newer goals coming first
        }
        return a.isCompleted ? 1 : -1; // Place uncompleted goals before completed ones
    });


    return (
        <BlurredEllipsesBackground>
            <ScrollView style={{ flex: 1 }} contentInsetAdjustmentBehavior='automatic'>
                <SafeAreaView>
                    <View style={{
                        flex: 1,
                        gap: sizes.gap.lg,
                        alignItems: 'center',
                        // justifyContent: 'center',
                        paddingHorizontal: sizes.padding.md,
                        paddingBottom: sizes.padding.lg * 2
                    }}
                    >
                        {/* Top Header */}
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <View>
                                <Text style={styles.text.body3} >Welcome to</Text>
                                <Text style={styles.text.semi1} >Rehat</Text>
                            </View>
                            <Pressable onPress={() => navigation.navigate("Settings")} >
                                <CircularIcon
                                    containerColor={colors.textArea.backgroundColor}
                                    icon={assets.icons.settings}
                                    iconContainerWidth={48}
                                    iconWidth={24}
                                />
                            </Pressable>
                        </View>


                        {/* Mindset Goals */}
                        <View style={{
                            gap: sizes.gap.md,
                            backgroundColor: colors.orange,
                            padding: sizes.padding.md,
                            width: '100%',
                            borderRadius: sizes.radius.lg
                        }}>
                            <Text style={styles.text.semi2}>Mindset Goals</Text>
                            <Text style={styles.text.merri.body2}>Craft positive thoughts. Set goals to reshape your thinking.</Text>

                            <View style={{ gap: sizes.gap.sm }}>

                                {/* List of Goals */}
                                {sortedGoals.length === 0 ? (
                                    <Text style={{ ...styles.text.body3, textAlign: 'center' }}>You don't have any goal yet.</Text>
                                ) :
                                    sortedGoals.slice(0, 2).map(goal => {
                                        return (
                                            <Pressable
                                                key={goal.id}
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    borderRadius: sizes.radius.lg,
                                                    backgroundColor: colors.whiteSoTransparent,
                                                    padding: sizes.padding.md
                                                }}
                                                onPress={() => toggleGoalCompletion(goal.id)}
                                            >
                                                <View>
                                                    <Text style={styles.text.semi2} >{goal.text}</Text>
                                                    <Text style={{ ...styles.text.caption, opacity: .5 }} >{formatDate(goal.id).dateString}</Text>
                                                    <Text style={{ ...styles.text.caption, opacity: .5 }} >{formatDate(goal.id).timeString}</Text>
                                                </View>
                                                <View style={{
                                                    padding: sizes.padding.md,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    aspectRatio: 1,
                                                    width: 72
                                                }} >
                                                    <View style={{
                                                        width: 32,
                                                        aspectRatio: 1,
                                                    }}>
                                                        <Image
                                                            source={goal.isCompleted ? assets.icons.checklist_completed : assets.icons.checklist_not_completed}
                                                            style={{
                                                                flex: 1,
                                                                aspectRatio: 1
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                            </Pressable>
                                        )
                                    })}
                            </View>
                        </View>


                        {/* Journaling Card */}
                        <JournalingCTACard
                            title={'Journaling'}
                            description={'Another day, another story. Share yours now!'}
                            buttonText={'Go to Journaling'}
                            icon={assets.icons.journaling}
                            onPress={() => navigation.navigate('Journaling')}
                        />

                    </View>
                </SafeAreaView>
            </ScrollView>
        </BlurredEllipsesBackground >
    );
}

export default Dashboard;
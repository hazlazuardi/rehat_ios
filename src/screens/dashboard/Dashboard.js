import React from 'react';
import { Dimensions, Image, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import JournalSuccess from '../journaling/JournalSuccess';
import useManageGoals from '../../helpers/useManageGoals';
import { colors, sizes, styles } from '../../data/theme';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import assets from '../../data/assets';
import { formatDate, getContrastColor } from '../../helpers/helpers';
import CircularIcon from '../../components/CircularIcon';
import JournalingCTACard from '../../components/journaling/JournalingCTACard';
import CreateGoal from '../goal/CreateGoal';
import Chip from '../../components/Chip';
import SecondaryButton from '../../components/SecondaryButton';
import { methods } from '../../data/recoveryMethods';

function Dashboard({ navigation }) {
    const { goals, toggleGoalCompletion } = useManageGoals()

    const sortedGoals = goals?.sort((a, b) => {
        if (a.isCompleted === b.isCompleted) {
            return b.id - a.id; // Sort by date, with newer goals coming first
        }
        return a.isCompleted ? 1 : -1; // Place uncompleted goals before completed ones
    });

    // console.log('sgol', sortedGoals)

    const handleGoToGoalMethod = (method) => {
        if (['Journaling', 'Cognitive Restructuring'].includes(method)) {
            navigation.navigate(method)
        }
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
                        // paddingHorizontal: sizes.padding.md,
                        paddingBottom: sizes.padding.lg * 2
                    }}
                    >
                        <View
                            style={{
                                paddingHorizontal: sizes.padding.md,
                            }}
                        >

                            {/* Debugging Purpose */}
                            {/* <PrimaryButton
                                color={colors.green}
                                text='Create a Goal'
                                onPress={() => navigation.navigate('Create a Goal', { nextPage: 'Recovery' })
                                }
                            /> */}

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
                        </View>

                        {/* Mindset Goals */}
                        {/* <GoalCard /> */}

                        <ScrollView
                            horizontal={true}
                            snapToAlignment='start'
                            snapToInterval={Dimensions.get('screen').width - 64 + 16}
                            decelerationRate='fast'
                            contentContainerStyle={{
                                columnGap: sizes.gap.md,
                                paddingHorizontal: goals.length > 1 ? sizes.padding.md : sizes.padding.lg,
                                // width: 'auto'
                            }}
                            showsHorizontalScrollIndicator={false}
                        >
                            {sortedGoals?.map(goal => {
                                return (
                                    <GoalCard
                                        key={goal.id}
                                        goal={goal}
                                        toggleGoalCompletion={toggleGoalCompletion}
                                        onPressButton={() => handleGoToGoalMethod(goal.method)}
                                    />
                                )
                            })}
                        </ScrollView>

                        <View
                            style={{
                                paddingHorizontal: sizes.padding.md,
                            }}
                        >

                            {/* Journaling Card */}
                            <JournalingCTACard
                                title={'Journaling'}
                                description={'Another day, another story. Share yours now!'}
                                buttonText={'Go to Journaling'}
                                icon={assets.icons.journaling}
                                onPress={() => navigation.navigate('Journaling')}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </BlurredEllipsesBackground >
    );
}

function GoalCard({ goal, toggleGoalCompletion, onPressButton }) {

    return (
        <View key={goal.id} style={{
            gap: sizes.gap.md,
            backgroundColor: colors.orange,
            padding: sizes.padding.md,
            borderRadius: sizes.radius.lg,
            width: Dimensions.get('screen').width - 64,
            justifyContent: 'space-between'
        }}>
            <View style={{
                gap: sizes.gap.md,
            }}>
                <Text style={styles.text.semi2}>Mindset Goals</Text>
                <View>
                    <Text style={styles.text.caption}>To:</Text>
                    <Text style={{
                        ...styles.text.merri.body2,
                        fontStyle: 'italic'
                    }}>
                        {goal.outcome}
                    </Text>
                </View>
                <View>
                    <Text style={styles.text.caption}>I will:</Text>
                    <Text style={
                        {
                            ...styles.text.merri.body2,
                            fontStyle: 'italic'
                        }}
                    >
                        {goal.action}
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: sizes.gap.sm
                }}>
                    <Chip text={`Doing ${goal.duration}`} variant='outlined' font='caption' color={colors.white} />
                    <Chip text={`Of ${goal.method}`} variant='outlined' font='caption' color={colors.white} />
                    <Chip text={`For ${goal.period}`} variant='outlined' font='caption' color={colors.white} />
                </View>
            </View>

            {/* CTA */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
            }}>
                {methods.includes(goal.method) ?
                    <SecondaryButton
                        text={`Do ${goal.method}`}
                        color={colors.darkTurquoise}
                        onPress={onPressButton}
                    />
                    : <Text
                        style={{
                            ...styles.text.caption,
                            fontStyle: 'italic',
                        }}
                    >
                        *Method Unavailable
                    </Text>
                }
                <Pressable onPress={() => toggleGoalCompletion(goal.id)}>
                    <View style={{
                        width: 48,
                        height: 48
                    }}>
                        <Image
                            source={goal.isCompleted ? assets.icons.checklist_completed : assets.icons.checklist_not_completed}
                            style={{
                                flex: 1,
                                aspectRatio: 1
                            }}
                        />
                    </View>
                </Pressable>
            </View>
        </View >
    )

}

export default Dashboard;
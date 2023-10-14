import React from 'react';
import { Image, Pressable, SafeAreaView, Text, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import JournalSuccess from '../journaling/JournalSuccess';
import useManageGoals from '../../helpers/useManageGoals';
import { colors, sizes, styles } from '../../data/theme';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import assets from '../../data/assets';
import { formatDate } from '../../helpers/helpers';

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
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, gap: sizes.gap.lg, alignItems: 'center', justifyContent: 'center', paddingHorizontal: sizes.padding.md }}>
                    <Text>This is Dashboard</Text>
                    <PrimaryButton text='Settings' color='green' onPress={() => navigation.navigate("Settings")} />
                    <PrimaryButton text='Create a Goal' color='green' onPress={() => navigation.navigate("Create a Goal", { nextPage: 'Recovery' })} />


                    <View style={{
                        gap: sizes.gap.md,
                        backgroundColor: colors.orange,
                        padding: sizes.padding.md,
                        width: '100%',
                        borderRadius: sizes.radius.lg
                        // flex: 1


                    }}>
                        <Text style={styles.text.semi2}>Mindset Goals</Text>
                        <Text style={styles.text.merri.body2}>Craft positive thoughts. Set goals to reshape your thinking.</Text>

                        <View style={{ gap: sizes.gap.sm }}>
                            {/* <Text style={styles.text.caption}>Latest Goal</Text> */}
                            {/* List of Goals */}
                            {sortedGoals.slice(0, 2).map(goal => {

                                // if (goal.isCompleted) return;

                                return (
                                    <Pressable
                                        key={goal.id}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            borderRadius: sizes.radius.lg,
                                            backgroundColor: colors.textArea.backgroundColor,
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
                </View>
            </SafeAreaView>
        </BlurredEllipsesBackground >
    );
}

export default Dashboard;
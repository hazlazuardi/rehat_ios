import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Button,
  Linking,
  Platform,
  Dimensions,
} from 'react-native';
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
import useEmergencyContacts from '../../helpers/useEmergencyContacts';
import { useRecommendedMethod } from '../../context/Context';

function Dashboard({ navigation }) {
  const [quoteIndex, setQuoteIndex] = useState(0);


  const { recommendedMethod, dispatchRecommendedMethod } = useRecommendedMethod()

  console.log('recMed', recommendedMethod)


  const {
    emergencyContacts,
    getAllEmergencyContacts,
    dispatchEmergencyContacts,
  } = useEmergencyContacts();
  const { goals, toggleGoalCompletion } = useManageGoals();

  const sortedGoals = goals?.sort((a, b) => {
    if (a.isCompleted === b.isCompleted) {
      return b.id - a.id; // Sort by date, with newer goals coming first
    }
    return a.isCompleted ? 1 : -1; // Place uncompleted goals before completed ones
  });

  //   console.log('sgol', sortedGoals);

  const handleGoToGoalMethod = method => {
    if (['Journaling', 'Cognitive Restructuring'].includes(method)) {
      navigation.navigate(method);
    }
  };

  const quotes = [
    'Challenges are opportunities to grow and learn. I embrace them with courage.',
    'Adversity is the fuel of growth. I face it with determination.',
    'In every obstacle, I see a chance to become stronger.',
    'Difficulties are stepping stones to success. I step up eagerly.',
    'Challenges test my limits and reveal my potential. I welcome them.',
    'Every setback is a setup for a comeback. I rise to the occasion.',
    'Obstacles are the path to innovation. I embrace them wholeheartedly.',
    "Life's challenges are my training ground for resilience.",
    'In the face of adversity, I discover my true strength and character.',
    'The harder the battle, the sweeter the victory. I fight with purpose.',
    'Each challenge I encounter is an opportunity to become a better version of myself.',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Change the quote every 60 seconds
      setQuoteIndex((quoteIndex + 1) % quotes.length);
    }, 60000);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [quoteIndex]);

  return (
    <BlurredEllipsesBackground>
      <ScrollView style={{ flex: 1 }} contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView>
          <View
            style={{
              flex: 1,
              gap: sizes.gap.lg,
              // alignItems: 'center',
              // justifyContent: 'center',
              // paddingHorizontal: sizes.padding.md,
              paddingBottom: sizes.padding.lg * 2,
            }}>
            <View
              style={{
                paddingHorizontal: sizes.padding.md,
              }}>
              {/* Debugging Purpose */}
              {/* <PrimaryButton
                                color={colors.green}
                                text='Create a Goal'
                                onPress={() => navigation.navigate('Create a Goal', { nextPage: 'Recovery' })
                                }
                            /> */}

              {/* Top Header */}
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={styles.text.body3}>Welcome to</Text>
                  <Text style={styles.text.semi1}>Rehat</Text>
                </View>
                <Pressable onPress={() => navigation.navigate('Settings')}>
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
              snapToAlignment="start"
              snapToInterval={Dimensions.get('screen').width - 64 + 16}
              decelerationRate={0.8}
              contentContainerStyle={{
                columnGap: sizes.gap.md,
                paddingHorizontal: sizes.padding.md,
                // width: 'auto'
              }}
              showsHorizontalScrollIndicator={false}>
              {sortedGoals?.map(goal => {
                return (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    toggleGoalCompletion={toggleGoalCompletion}
                    onPressButton={() => handleGoToGoalMethod(goal.method)}
                  />
                );
              })}
            </ScrollView>

            <View
              style={{
                paddingHorizontal: sizes.padding.md,
              }}>
              {/* Journaling Card */}
              <JournalingCTACard
                title={'Journaling'}
                description={'Another day, another story. Share yours now!'}
                buttonText={'Go to Journaling'}
                icon={assets.icons.journaling}
                onPress={() => navigation.navigate('Journaling')}
              />
            </View>

            {/* QUOTATION */}
            <View style={{ padding: 14 }}>
              <View
                style={{
                  backgroundColor: '#1E252A',
                  padding: 14,
                  borderRadius: 30,
                  marginBottom: 24,
                }}>
                <View style={{ marginVertical: 10 }}>
                  <Image source={assets.images.kutip} />
                </View>
                <View>
                  <Text
                    style={{
                      ...styles.text.body2,
                      marginTop: 5,
                      marginLeft: 12,
                      color: 'white',
                    }}>
                    {quotes[quoteIndex]}
                  </Text>
                </View>
                <View style={{ marginVertical: 10, alignSelf: 'flex-end' }}>
                  <Image source={assets.images.kutipakhir} />
                </View>
              </View>

              <Text
                style={{
                  ...styles.text.body1,
                  textAlign: 'left',
                  alignSelf: 'flex-start',
                  paddingHorizontal: sizes.padding.sm,
                }}>
                Emergency Contacts
              </Text>
              <View style={{ width: '100%', padding: sizes.padding.sm }}>
                {emergencyContacts?.map(econ => (
                  <Pressable
                    key={econ.recordID}
                    onPress={async () => {
                      if (econ.phoneNumbers[0]?.number) {
                        const phoneNumber = econ.phoneNumbers[0].number.replace(
                          /[^0-9]/g,
                          '',
                        ); // Remove non-numeric characters
                        const dial =
                          Platform.OS === 'android'
                            ? `tel:${phoneNumber}`
                            : `telprompt:${phoneNumber}`;

                        const canOpen = await Linking.canOpenURL(dial);

                        if (canOpen) {
                          Linking.openURL(dial);
                        } else if (Platform.OS !== 'android') {
                          const telUrl = `tel:${phoneNumber}`;
                          if (await Linking.canOpenURL(telUrl)) {
                            Linking.openURL(telUrl);
                          } else {
                            console.warn('Device not capable of making calls');
                          }
                        } else {
                          console.warn('Device not capable of making calls');
                        }
                      }
                    }}>
                    <View
                      style={{
                        padding: sizes.padding.md,
                        backgroundColor: colors.orange,
                        borderColor: 'white',
                        borderRadius: sizes.radius.sm,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItem: 'center',
                        marginVertical: 10,
                      }}>
                      <View style={{ gap: sizes.gap.sm }}>
                        <Text style={innerStyles.contactName}>
                          {econ.givenName} {econ.familyName}
                        </Text>
                        <Text style={innerStyles.contactNumber}>
                          {econ.phoneNumbers[0]?.number}
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: colors.white,
                          borderRadius: 30,
                          padding: 15,
                        }}>
                        <Image
                          source={assets.images.call}
                          style={{ width: 25, height: 25 }}
                        />
                      </View>
                    </View>
                  </Pressable>
                ))}
                {emergencyContacts.length === 0 && (
                  <View
                    style={{
                      padding: 20,
                      backgroundColor: '#1E252A',
                      marginTop: 14,
                      borderRadius: 14,
                    }}>
                    <Text
                      style={{
                        ...styles.text.body2,
                        color: 'white',
                        textAlign: 'center'
                      }}>
                      You haven't added any emergency contacts!
                    </Text>
                    <Pressable onPress={() => { navigation.navigate('Manage Emergency Contact') }}>
                      <View
                        style={{
                          padding: 16,
                          backgroundColor: colors.orange,
                          width: '75%',
                          alignSelf: 'center',
                          borderRadius: 16,
                          marginTop: 16,
                        }}>
                        <Text
                          style={{
                            ...styles.text.body3,
                            color: 'white',
                            textAlign: 'center'
                          }}>
                          Add Emergency Contact
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                )}
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </BlurredEllipsesBackground>
  );
}

const innerStyles = {
  container: {
    paddingVertical: sizes.padding.lg,
    paddingHorizontal: sizes.padding.md,
    flexDirection: 'column',
    gap: sizes.padding.md,
  },
  contactList: {},
  contactItem: {},
  contactName: {
    // fontWeight: 'bold',
    ...styles.text.semi1,
  },
  contactNumber: {
    ...styles.text.semi2,
    color: 'rgba(255,255,255,.5)',
  },
  input: {
    minHeight: sizes.padding.lg,
    backgroundColor: 'grey',
    color: 'white',
    borderRadius: sizes.radius.sm,
    paddingHorizontal: sizes.padding.md,
    paddingVertical: sizes.padding.md,
    fontSize: sizes.text.header3,
  },
};

function GoalCard({ goal, toggleGoalCompletion, onPressButton }) {
  return (
    <View
      key={goal.id}
      style={{
        gap: sizes.gap.md,
        backgroundColor: colors.orange,
        padding: sizes.padding.md,
        borderRadius: sizes.radius.lg,
        width: Dimensions.get('screen').width - 64,
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          gap: sizes.gap.md,
        }}>
        <Text style={styles.text.semi2}>Mindset Goals</Text>
        <View>
          <Text style={styles.text.caption}>To:</Text>
          <Text
            style={{
              ...styles.text.merri.body2,
              fontStyle: 'italic',
            }}>
            {goal.outcome}
          </Text>
        </View>
        <View>
          <Text style={styles.text.caption}>I will:</Text>
          <Text
            style={{
              ...styles.text.merri.body2,
              fontStyle: 'italic',
            }}>
            {goal.action}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: sizes.gap.sm,
          }}>
          <Chip
            text={`Doing ${goal.duration}`}
            variant="outlined"
            font="caption"
            color={colors.white}
          />
          <Chip
            text={`Of ${goal.method}`}
            variant="outlined"
            font="caption"
            color={colors.white}
          />
          <Chip
            text={`For ${goal.period}`}
            variant="outlined"
            font="caption"
            color={colors.white}
          />
        </View>
      </View>

      {/* CTA */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}>
        {methods.includes(goal.method) ? (
          <SecondaryButton
            text={`Do ${goal.method}`}
            color={colors.darkTurquoise}
            onPress={onPressButton}
          />
        ) : (
          <Text
            style={{
              ...styles.text.caption,
              fontStyle: 'italic',
            }}>
            *Method Unavailable
          </Text>
        )}
        <Pressable onPress={() => toggleGoalCompletion(goal.id)}>
          <View
            style={{
              width: 48,
              height: 48,
            }}>
            <Image
              source={
                goal.isCompleted
                  ? assets.icons.checklist_completed
                  : assets.icons.checklist_not_completed
              }
              style={{
                flex: 1,
                aspectRatio: 1,
              }}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default Dashboard;

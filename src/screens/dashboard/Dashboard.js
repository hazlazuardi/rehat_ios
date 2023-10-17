import React, {useEffect} from 'react';
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
} from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import JournalSuccess from '../journaling/JournalSuccess';
import useManageGoals from '../../helpers/useManageGoals';
import {colors, sizes, styles} from '../../data/theme';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import assets from '../../data/assets';
import {formatDate} from '../../helpers/helpers';
import CircularIcon from '../../components/CircularIcon';
import JournalingCTACard from '../../components/journaling/JournalingCTACard';
import useEmergencyContacts from '../../helpers/useEmergencyContacts';
import {storage} from '../../../App';

function Dashboard({navigation}) {
  const {
    emergencyContacts,
    getAllEmergencyContacts,
    dispatchEmergencyContacts,
  } = useEmergencyContacts();
  const {goals, toggleGoalCompletion} = useManageGoals();
  useEffect(() => {
    getAllEmergencyContacts(); // Get all emergency contacts when the component mounts
  }, []);

  const sortedGoals = [...goals].sort((a, b) => {
    if (a.isCompleted === b.isCompleted) {
      return b.id - a.id; // Sort by date, with newer goals coming first
    }
    return a.isCompleted ? 1 : -1; // Place uncompleted goals before completed ones
  });

  return (
    <BlurredEllipsesBackground>
      <ScrollView style={{flex: 1}} contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView>
          <View
            style={{
              flex: 1,
              gap: sizes.gap.lg,
              alignItems: 'center',
              // justifyContent: 'center',
              paddingHorizontal: sizes.padding.md,
              paddingBottom: sizes.padding.lg * 2,
            }}>
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
                  icon={assets?.icons?.settings}
                  iconContainerWidth={48}
                  iconWidth={24}
                />
              </Pressable>
            </View>

            {/* Mindset Goals */}
            <View
              style={{
                gap: sizes.gap.md,
                backgroundColor: colors.orange,
                padding: sizes.padding.md,
                width: '100%',
                borderRadius: sizes.radius.lg,
              }}>
              <Text style={styles.text.semi2}>Mindset Goals</Text>
              <Text style={styles.text.merri.body2}>
                Craft positive thoughts. Set goals to reshape your thinking.
              </Text>

              <View style={{gap: sizes.gap.sm}}>
                {/* List of Goals */}
                {sortedGoals.slice(0, 2).map(goal => {
                  return (
                    <Pressable
                      key={goal.id}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: sizes.radius.lg,
                        backgroundColor: colors.textArea.backgroundColor,
                        padding: sizes.padding.md,
                      }}
                      onPress={() => toggleGoalCompletion(goal.id)}>
                      <View>
                        <Text style={styles.text.semi2}>{goal.text}</Text>
                        <Text style={{...styles.text.caption, opacity: 0.5}}>
                          {formatDate(goal.id).dateString}
                        </Text>
                        <Text style={{...styles.text.caption, opacity: 0.5}}>
                          {formatDate(goal.id).timeString}
                        </Text>
                      </View>
                      <View
                        style={{
                          padding: sizes.padding.md,
                          alignItems: 'center',
                          justifyContent: 'center',
                          aspectRatio: 1,
                          width: 72,
                        }}>
                        <View
                          style={{
                            width: 32,
                            aspectRatio: 1,
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
                      </View>
                    </Pressable>
                  );
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

            {/* QUOTATION */}
            <View
              style={{
                backgroundColor: '#1E252A',
                padding: 14,
                borderRadius: 30,
              }}>
              <View style={{marginVertical: 10}}>
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
                  Challenges are opportunities to grow and learn. I embrace them
                  with courage.
                </Text>
              </View>
              <View style={{marginVertical: 10, alignSelf: 'flex-end'}}>
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
            <View style={{width: '100%', padding: sizes.padding.sm}}>
              {emergencyContacts.map(econ => (
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
                    <View style={{gap: sizes.gap.sm}}>
                      <Text style={innerStyles.contactName}>
                        {econ.givenName} {econ.familyName}
                      </Text>
                      <Text style={innerStyles.contactNumber}>
                        {econ.phoneNumbers[0]?.number}
                      </Text>
                    </View>
                    <View style={{backgroundColor:colors.white, borderRadius:30, padding:15}}>
                        <Image source={assets.images.call} style={{width:25, height:25}}/>
                    </View>
                  </View>
                </Pressable>
              ))}
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

export default Dashboard;

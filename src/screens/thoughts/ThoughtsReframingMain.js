import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useJournal} from '../../context/Context';
import {storage} from '../../../App';
import {colors, sizes, styles} from '../../data/theme';
import PrimaryButton from '../../components/PrimaryButton';
import {trigger} from 'react-native-haptic-feedback';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import assets from '../../data/assets';
import useFormattedDate from '../../helpers/useDateFormatter';
import {formatDate, toAssetCase} from '../../helpers/helpers';
import EmotionCategoryButton from '../../components/journaling/EmotionCategoryButton';
import JournalingCTACard from '../../components/journaling/JournalingCTACard';
import EmptyState from '../../components/EmptyState';

/**
 * A component for journaling and managing journals.
 *
 * @component
 * @param {JournalingProps} props - The component's properties.
 * @returns {JSX.Element} The rendered Journaling component.
 */
function ThoughtsReframingMain({navigation}) {
  const [cognitiveData, setCognitiveData] = useState([]);


  const strAllJournals = storage.getString('journals');
  const allJournals = strAllJournals ? JSON.parse(strAllJournals) : [];

  const {date} = useFormattedDate();

  useEffect(() => {
    const storedData = storage.getString('cognitiveData');
    let parsedData = [];

    if (storedData) {
      try {
        parsedData = JSON.parse(storedData);
      } catch (error) {
        console.error('Error parsing cognitiveData:', error);
      }
    }

    setCognitiveData(parsedData);
  }, []);

  console.log(cognitiveData);

  return (
    <BlurredEllipsesBackground>
      <ScrollView style={{flex: 1}} contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView>
          <View style={{gap: sizes.gap.lg, padding: sizes.padding.md}}>
            <View style={{gap: sizes.gap.sm}}>
              <Text style={{...styles.text.header1}}>Thoughts Reframing</Text>

              {/* Card */}
              <JournalingCTACard
                title={'Thoughts Reframing'}
                description={'Another day, another story. Share yours now!'}
                buttonText={'Check in'}
                icon={assets.icons.journaling}
                onPress={() => navigation.navigate('Cognitive Restructuring')}
              />
            </View>

            {/* My Journals */}
            <View style={{gap: sizes.gap.md}}>
              {/* Section Title */}
              <Text style={{...styles.text.header2}}>My thoughts</Text>

              {/* List of My Journal */}

              {cognitiveData?.map((cog, index) => {
                const formattedDate = formatDate(cog.time);
                return (
                  <Pressable onPress={()=>{navigation.navigate('Cognitive Another Way', {isPreview:true, TRData:cog.data, TRFI:cog.input.firstInput, TRSI:cog.input.secondInput, TRTI:cog.input.thirdInput})}}>
                    <View
                      key={index}
                      style={{
                        padding: 14,
                        backgroundColor: colors.turqoise,
                        borderRadius: 14,
                      }}>
                      <View>
                        <Text style={{...styles.text.body1, marginBottom: 14}}>
                          {cog.title || 'test'}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          marginBottom: 20,
                        }}>
                        {cog.data.map(res => {
                          return (
                            <View
                              style={{
                                padding: 5,
                                margin: 5,
                                backgroundColor: colors.orange,
                                borderRadius: 10,
                              }}>
                              <Text
                                style={{...styles.text.body1, fontSize: 12}}>
                                {res}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                      <View>
                        <Text style={{...styles.text.body1, fontSize: 10}}>
                          {formattedDate.dayString} at{' '}
                          {formattedDate.timeString}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                );
              })}
              {cognitiveData.length === 0 && (
                <EmptyState
                  createOrAdd={'created'}
                  subject={'Thoughts Reframing'}
                  onPressTo={'Cognitive Restructuring'}
                  navigation={navigation}
                />
              )}
            </View>

            
          </View>
        </SafeAreaView>
      </ScrollView>
    </BlurredEllipsesBackground>
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
ThoughtsReframingMain.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ThoughtsReframingMain;

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { colors, styles } from '../../data/theme';
import articlesNew from '../../data/learn';
import { sizes } from '../../data/theme';
import LearnCard from '../../components/learn/LearnCard';
import data from '../../data/articles';
import { Pressable } from 'react-native';
import progress from '../../../assets/img/progress.png';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage } from '../../../App';
import useManageLearn from '../../helpers/useManageLearn';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import assets from '../../data/assets';


function Learn({ navigation }) {
  const { learnedArticles,
    articles,
    getProgress,
    clearAllLearnedArticles,
    totalCount,
    totalContentsCount,
  } = useManageLearn();

  // clearAllLearnedArticles()
  console.log('learnedArt', learnedArticles)

  const learnCategory = [
    {
      title: 'Understanding Anxiety',
      description: 'Detailed insights into various disorders like depression, anxiety',
      color: colors.green,
      icon: assets.images.brain,
      onPress: () => {
        navigation.navigate('Learn Category', {
          title: 'Understanding Anxiety',
          category: 1,
          assetImg: 'brain',
        });
      },
    },
    {
      title: 'Understanding Panic Attack',
      description: 'Exploration of different breathing exercises to manage stress',
      color: colors.orange,
      icon: assets.images.lung,
      onPress: () => {
        navigation.navigate('Learn Category', {
          title: 'Understanding Panic Attack',
          category: 2,
          assetImg: 'lung',
        });
      },
    },
    {
      title: 'Treatment',
      description: 'Exploration of different breathing exercises to manage stress',
      color: colors.turqoise,
      icon: assets.images.lung,
      onPress: () => {
        navigation.navigate('Learn Category', {
          title: 'Treatment',
          category: 3,
          assetImg: 'brain',
        });
      },
    },
    {
      title: 'Coping Methods',
      description: 'Detailed insights into various disorders like depression, anxiety,',
      color: colors.blue,
      icon: assets.images.brain,
      onPress: () => {
        navigation.navigate('Learn Category', {
          title: 'Coping Methods',
          category: 4,
          assetImg: 'lung',
        });
      },
    }

  ]

  // console.log('totc', totalCount)

  // storage.clearAll()
  // console.log('Dim', Dimensions.get('screen').width - 64)

  const progress = totalCount / totalContentsCount
  return (
    <BlurredEllipsesBackground>
      <ScrollView style={{ flex: 1 }} contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView>
          <View
            style={{
              gap: sizes.gap.lg,
              padding: sizes.padding.md,
              paddingBottom: sizes.padding.lg * 2,
            }}>
            <Text style={styles.text.header2}>Insight Hub</Text>

            {/* Card Progress Learn */}
            <View style={innerStyles.progressLearn}>
              <View style={innerStyles.progressText}>
                <Image source={progress} style={{ width: 30, height: 30 }} />
                <Text style={{ ...styles.text.header3 }}>
                  Progress Of Learn
                </Text>
              </View>
              <Text style={{ ...styles.text.semi2, marginTop: 15 }}>
                {`${getProgress()}  Articles`}
              </Text>

              <View style={{ position: 'relative', height: 20, marginTop: sizes.padding.md }}>
                <View style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: 20,
                  backgroundColor: colors.whiteSoTransparent,
                  borderRadius: sizes.radius.lg,
                }} />
                <View style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: progress === 0 ? '100%' : (Dimensions.get('screen').width - 64) * progress,
                  height: 20,
                  backgroundColor: progress === 0 ? colors.whiteSoTransparent : colors.orange,
                  borderRadius: sizes.radius.lg,
                }} />
              </View>


              <View style={innerStyles.progressBarContainer}>
                {/* {articles.map((arc, key) => {
                  return (
                    <View key={key} style={innerStyles.progressBar}></View>
                  );
                })} */}
              </View>
            </View>


            <Text style={styles.text.header3}>About Self Wellbeing</Text>

            <View style={{
              gap: sizes.gap.md,
              // backgroundColor: 'red',
              flexDirection: 'row',
              flexWrap: 'wrap',
              // flex: 1
              // width: Dimensions.get('screen').width - 32
            }}>

              {learnCategory.map(cat => (
                <View
                  style={{
                    width: (Dimensions.get('screen').width - (3 * sizes.gap.md)) / 2,
                    // aspectRatio: 1/1.5,
                    height: 200,
                    backgroundColor: cat.color,
                    borderRadius: sizes.radius.lg,
                  }}
                  key={cat.title}
                >
                  <Pressable
                    onPress={cat.onPress}>
                    <View key={cat.title}
                      style={{
                        // flex: 1 / 2,
                        padding: sizes.padding.md,
                        gap: sizes.gap.sm
                      }}>
                      <View>
                        <Image
                          source={cat.icon}
                          style={{ width: 20, height: 20 }}
                        />
                        <Text style={{ ...styles.text.semi2, marginTop: 10 }}>
                          {cat.title}
                        </Text>
                      </View>
                      <Text style={{ ...styles.text.body3, opacity: .75 }}>
                        {cat.description}
                      </Text>
                    </View>
                  </Pressable>
                </View>
              ))}
            </View>

          </View>
        </SafeAreaView>
      </ScrollView>
    </BlurredEllipsesBackground>
  );
}

const innerStyles = StyleSheet.create({
  progressText: {
    gap: 10,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  headingText: {
    fontSize: sizes.text.header3,
    // marginTop: sizes.padding.lg,
    // marginHorizontal: sizes.padding.lg,
  },
  progressLearn: {
    padding: sizes.padding.md,
    borderRadius: sizes.padding.md,
    backgroundColor: '#0E6E74',
  },
  textProgressHeading: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: '50%',
    color: colors.white,
    paddingBottom: sizes.padding.md,
  },
  textProgress: {
    color: colors.white,
    // marginLeft: 3,
    marginTop: 15,
  },
  containerCards: {
    // marginBottom: 100,
    gap: sizes.gap.md,
  },
  progressBar: {
    height: 20,
    gap: 50,
    backgroundColor: 'red',
    // borderRadius: 10
  },
  progressBarContainer: {
    justifyContent: 'space-evenly',
    flex: 1,
    flexDirection: 'row',
  },
});

export default Learn;


// {/* {articles.map((arc, key) => {
//                 return (
//                   <Pressable
//                     key={key}
//                     onPress={() => navigation.navigate('Learn Detail', { arc })}>
//                     <LearnCard article={arc} />
//                   </Pressable>
//                 );
//               })} */}

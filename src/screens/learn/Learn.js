import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
} from 'react-native';
import {colors, styles} from '../../data/theme';
import articlesNew from '../../data/learn';
import {sizes} from '../../data/theme';
import LearnCard from '../../components/learn/LearnCard';
import data from '../../data/articles';
import {Pressable} from 'react-native';
import progress from '../../../assets/img/progress.png';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {storage} from '../../../App';
import useManageLearn from '../../helpers/useManageLearn';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import assets from '../../data/assets';

function Learn({navigation}) {
  const {learnedArticles,articles, getProgress, clearAllLearnedArticles} = useManageLearn();
  // clearAllLearnedArticles()
  console.log('learnedArt',learnedArticles)

  storage.clearAll()
  return (
    <BlurredEllipsesBackground>
      <ScrollView style={{flex: 1}} contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView>
          <View
            style={{
              gap: sizes.gap.lg,
              padding: sizes.padding.md,
              paddingBottom: sizes.padding.lg * 2,
            }}>
            <Text style={styles.text.header2}>Insight Hub</Text>
            <View style={innerStyles.progressLearn}>
              <View style={innerStyles.progressText}>
                <Image source={progress} style={{width: 30, height: 30}} />
                <Text style={{...styles.text.body3}}>
                  Progress Of Learn
                </Text>
              </View>
              <Text style={{...styles.text.body3, marginTop:15}}>{getProgress()} <Text style={{...styles.text.body3, color:colors.orange}}>Articles</Text></Text>
              <View style={innerStyles.progressBarContainer}>
                {/* {articles.map((arc, key) => {
                  return (
                    <View key={key} style={innerStyles.progressBar}></View>
                  );
                })} */}
              </View>
            </View>
            <Text style={styles.text.header3}>About Self Wellbeing</Text>
            <View
              style={{
                ...innerStyles.containerCards,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
              {/* {articles.map((arc, key) => {
                return (
                  <Pressable
                    key={key}
                    onPress={() => navigation.navigate('Learn Detail', { arc })}>
                    <LearnCard article={arc} />
                  </Pressable>
                );
              })} */}
              <Pressable
                style={{
                  padding: 14,
                  backgroundColor: colors.green,
                  width: '45%',
                  borderRadius: 14,
                }}
                onPress={() => {
                  navigation.navigate('Learn Category', {
                    title: 'Understanding Anxiety',
                    category: 1,
                    assetImg: 'brain',
                  });
                }}>
                <View>
                  <Image
                    source={assets.images.brain}
                    style={{width: 20, height: 20}}
                  />
                  <Text style={{...styles.text.body3, marginTop: 10}}>
                    Understanding Anxiety
                  </Text>
                </View>
              </Pressable>
              <Pressable
                style={{
                  padding: 14,
                  backgroundColor: colors.orange,
                  width: '45%',
                  borderRadius: 14,
                }}
                onPress={() => {
                  navigation.navigate('Learn Category', {
                    title: 'Understanding Panic Attack',
                    category: 2,
                    assetImg: 'lung',
                  });
                }}>
                <View>
                  <Image
                    source={assets.images.lung}
                    style={{width: 20, height: 20}}
                  />
                  <Text style={{...styles.text.body3, marginTop: 10}}>
                    Understanding Panic Attack
                  </Text>
                </View>
              </Pressable>
              <Pressable
                style={{
                  padding: 14,
                  backgroundColor: colors.turqoise,
                  width: '45%',
                  borderRadius: 14,
                }}
                onPress={() => {
                  navigation.navigate('Learn Category', {
                    title: 'Learn About Treatment',
                    category: 3,
                    assetImg: 'lung',
                  });
                }}>
                <View>
                  <Image
                    source={assets.images.lung}
                    style={{width: 20, height: 20}}
                  />
                  <Text style={{...styles.text.body3, marginTop: 10}}>
                    Learn About Treamtment
                  </Text>
                </View>
              </Pressable>
              <Pressable
                style={{
                  padding: 14,
                  backgroundColor: '#0084E3',
                  width: '45%',
                  height: 'auto',
                  borderRadius: 14,
                }}
                onPress={() => {
                  navigation.navigate('Learn Category', {
                    title: 'Learn About Coping Methods',
                    category: 4,
                    assetImg: 'brain',
                  });
                }}>
                <View>
                  <Image
                    source={assets.images.brain}
                    style={{width: 20, height: 20}}
                  />
                  <Text style={{...styles.text.body3, marginTop: 10}}>
                    Learn About Coping Methods
                  </Text>
                </View>
              </Pressable>
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

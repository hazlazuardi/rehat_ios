import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
} from 'react-native';
import { colors, styles } from '../data/theme';
import { sizes } from '../data/theme';
import LearnCard from '../components/learn/LearnCard';
import data from '../data/articles';
import { Pressable } from 'react-native';
import progress from '../../assets/img/progress.png';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage } from '../../App';
import useManageLearn from '../helpers/useManageLearn';
import BlurredEllipsesBackground from '../components/BlurredEllipsesBackground';

function Learn({ navigation }) {
  const { articles, getProgress, clearAllLearnedArticles } = useManageLearn()

  // clearAllLearnedArticles()
  return (
    <BlurredEllipsesBackground>
      <ScrollView style={{ flex: 1 }} contentInsetAdjustmentBehavior='automatic'>
        <SafeAreaView>
          <View style={{ gap: sizes.gap.lg, padding: sizes.padding.md, paddingBottom: sizes.padding.lg*2 }}>
            <Text style={styles.text.header2}>Insight Hub</Text>
            <View style={innerStyles.progressLearn}>
              <View style={innerStyles.progressText}>
                <Image source={progress} style={{ width: 30, height: 30 }} />
                <Text style={innerStyles.textProgressHeading}>Progress Of Learn</Text>
              </View>
              <Text style={innerStyles.textProgress}>{getProgress()}</Text>
              <View style={innerStyles.progressBarContainer}>
                {articles.map((arc, key) => {
                  return (
                    <View key={key} style={innerStyles.progressBar}></View>
                  );
                })}
              </View>
            </View>
            <Text style={styles.text.header3}>About Self Wellbeing</Text>
            <View style={innerStyles.containerCards}>
              {articles.map((arc, key) => {
                return (
                  <Pressable
                    key={key}
                    onPress={() => navigation.navigate('Learn Detail', { arc })}>
                    <LearnCard article={arc} />
                  </Pressable>
                );
              })}
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
    // marginTop: 15,
  },
  containerCards: {
    // marginBottom: 100,
    gap: sizes.gap.md
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
    flexDirection: 'row'
  },
});

export default Learn;

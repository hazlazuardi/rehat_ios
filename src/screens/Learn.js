import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
} from 'react-native';
import { colors } from '../data/theme';
import { sizes } from '../data/theme';
import LearnCard from '../components/learn/LearnCard';
import data from '../data/articles.json';
import { Pressable } from 'react-native';
import progress from '../../assets/img/progress.png';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage } from '../../App';

function Learn({ navigation }) {
  const article = data.articles;
  const [progressState, setProgressState] = useState()
  const [readArticles, setReadArticles] = useState([]);

  // async function getReadingProgress() {
  function getReadingProgress() {
    // Get the current list of read articles
    // const readArticlesString = await AsyncStorage.getItem('readArticles');
    const readArticlesString = storage.getString('readArticles');
    const readArticles = readArticlesString ? JSON.parse(readArticlesString) : [];

    // Calculate the progress
    const totalArticles = article.length;
    const readCount = readArticles?.length;
    const unreadCount = totalArticles - readCount;
    const readPercentage = (readCount / totalArticles) * 100;

    return {
      totalArticles,
      readCount,
      unreadCount,
      readPercentage
    };
  }

  // async function displayProgress() {
  function displayProgress() {
    // const progress = await getReadingProgress();
    const progress = getReadingProgress();
    setProgressState(progress);

    // const readArticlesString = await AsyncStorage.getItem('readArticles');
    const readArticlesString = storage.getString('readArticles')
    const readList = readArticlesString ? JSON.parse(readArticlesString) : [];
    setReadArticles(readList);
  }

  // Invoke the function
  useEffect(() => {
    displayProgress()
  }, [])
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView>
        <Text style={styles.headingText}>Learn</Text>
        <View style={styles.progressLearn}>
          <View style={styles.progressText}>
            <Image source={progress} style={{ width: 30, height: 30 }} />
            <Text style={styles.textProgressHeading}>Progress Of Learn</Text>
          </View>
          <Text style={styles.textProgress}>{progressState?.readCount}/{progressState?.totalArticles}</Text>
          <View style={styles.progressBarContainer}>
            {article.map((arc, key) => {
              return (
                <View key={key} style={styles.progressBar}></View>
              );
            })}
          </View>
        </View>
        <Text style={styles.headingText}>About Self Wellbeing</Text>
        <View style={styles.containerCards}>
          {article.map((arc, key) => {
            return (
              <Pressable
                key={key}
                onPress={() => navigation.navigate('Learn Detail', { arc })}>
                <LearnCard article={arc} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#0F1720',
    marginTop: 30,
    paddingHorizontal: sizes.padding.md, // This sets the background color for the entire screen
  },
  progressText: {
    gap: 10,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  headingText: {
    color: colors.white,
    fontSize: sizes.text.header2,
    marginTop: sizes.padding.lg,
    marginHorizontal: sizes.padding.lg,
    fontWeight: 700,
    fontFamily: 'Poppins-Regular',
  },
  progressLearn: {
    padding: sizes.padding.lg,
    margin: sizes.padding.lg,
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
    marginLeft: 3,
    marginTop: 15,
  },
  containerCards: {
    marginBottom: 100,
  },
  progressBar: {
    height: 20,
    gap: 50,
    backgroundColor: 'red',
    borderRadius: 10
  },
  progressBarContainer: {
    justifyContent: 'space-evenly',
    flex: 1,
    flexDirection: 'row'
  },
});

export default Learn;

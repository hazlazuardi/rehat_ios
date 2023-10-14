import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, ScrollView } from 'react-native';
import { Pressable } from 'react-native';
import { colors } from '../data/theme';
import { sizes } from '../data/theme';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import LearnCard from '../components/learn/LearnCard';
import data from '../data/articles.json';
import { storage } from '../../App';

function LearnDetail({ route, navigation }) {
  const { arc } = route.params;
  const [number, setNumber] = useState(0);
  // Storing data
  // async function markArticleAsRead(articleId) {
  function markArticleAsRead(articleId) {
    // Get the current list of read articles
    // const readArticlesString = await AsyncStorage.getItem('readArticles');
    const readArticlesString = storage.getString('readArticles');
    const readArticles = readArticlesString ? JSON.parse(readArticlesString) : [];

    // Add the article ID if not already present
    if (!readArticles.includes(articleId)) {
      readArticles.push(articleId);
      // await AsyncStorage.setItem('readArticles', JSON.stringify(readArticles));
      storage.set('readArticles', JSON.stringify(readArticles));
    }
  }

  useEffect(() => {
    if (arc?.content?.sections[number]?.end) {
      markArticleAsRead(arc?.id)
    }
  }, [number])


  return (
    <View style={styles.container}>
      <Text style={styles.headingLearn}>{arc?.title}</Text>
      {arc?.content?.sections[number] !== '' ? (
        arc?.content?.sections[number]?.end ? (
          <>
            <Text style={styles.descLearn}>
              {arc?.content?.sections[number]?.header}
            </Text>
            <Text style={styles.descLearn}>
              {arc?.content?.sections[number]?.text}
            </Text>
            <Pressable
              onPress={() => {
                navigation.goBack();
                setNumber(0)
              }}>
              <Text style={styles.descLearn}>Back To Learn</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={styles.descLearn}>
              {arc?.content?.sections[number]?.header}
            </Text>
            <Text style={styles.descLearn}>
              {arc?.content?.sections[number]?.text}
            </Text>
            {number > 0 ? (
              <Pressable onPress={() => setNumber(number - 1)}>
                <Text style={styles.descLearn}>Previous Section</Text>
              </Pressable>
            ) : (
              <></>
            )}
            <Pressable onPress={() => setNumber(number + 1)}>
              <Text style={styles.descLearn}>Next Section</Text>
            </Pressable>
          </>
        )
      ) : (
        <Text>tdk ada</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1720',
    paddingTop: 120,
    paddingHorizontal: sizes.padding.md, // This sets the background color for the entire screen
  },
  headingLearn: {
    color: colors.white,
    fontSize: sizes.text.header1,
    width: '100%',
    fontFamily: 'Poppins-regular',
  },
  descLearn: {
    marginTop: sizes.padding.sm,
    color: '#D9D9D9',
    fontSize: sizes.text.bodylg,
    width: '75%',
    fontFamily: 'Poppins-regular',
  },
});

export default LearnDetail;

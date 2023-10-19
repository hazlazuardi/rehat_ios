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
// import progress from '../../../assets/img/progress.png';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage } from '../../../App';
import useManageLearn from '../../helpers/useManageLearn';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import assets from '../../data/assets';

function LearnCategory({ route, navigation }) {
  const { title, category, assetImg } = route.params;
  const { articles, getProgress, getProgressEach, clearAllLearnedArticles,

    countContentByCatId, countContentsByCatId } = useManageLearn();
  // clearAllLearnedArticles()

  const progress = countContentByCatId(category) / countContentsByCatId(category)

  return (
    <BlurredEllipsesBackground>
      <ScrollView
        style={{ flex: 1 }}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
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
              <View style={{
                ...innerStyles.progressText,
                gap: sizes.gap.md,
              }}>
                <Image source={assetImg} style={{ width: 30, height: 30 }} />
                <Text style={{ ...styles.text.header3 }}>
                  {title}
                </Text>
              </View>
              <Text style={{ ...styles.text.semi2, marginTop: 15 }}>
                {`${getProgressEach(category)}  Articles`}
              </Text>

              {/* Progress Bar */}
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
            </View>

            {/* Articles */}
            <View style={{
              gap: sizes.gap.md
            }}>
              <Text style={styles.text.header3}>About Self Wellbeing</Text>
              <View
                style={{
                  ...innerStyles.containerCards,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}>
                {articlesNew.filter((d) => d.catId === category)[0].content?.map((arc, key) => {
                  return (
                    <Pressable
                      key={key}
                      onPress={() => navigation.navigate('Learn Detail', { arc, assetImg: assetImg, title: title, category })}>
                      <LearnCard article={arc} done={true} />
                    </Pressable>
                  );
                })}
              </View>
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

export default LearnCategory;

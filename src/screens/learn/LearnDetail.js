import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
} from 'react-native';
import { Pressable } from 'react-native';
import { colors, styles as styleses } from '../../data/theme';
import { sizes } from '../../data/theme';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import LearnCard from '../../components/learn/LearnCard';
import data from '../../data/articles';
import { storage } from '../../../App';
import useManageLearn from '../../helpers/useManageLearn';
import assets from '../../data/assets';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import PrimaryButton from '../../components/PrimaryButton';

function LearnDetail({ route, navigation }) {
  const { arc, assetsImg, title, category } = route.params;
  const [number, setNumber] = useState(0);

  const { addLearnedArticle, totalCount, totalContentsCount } = useManageLearn();

  console.log('arc det', arc);

  const arcUpdated = { arc, catId: category }

  return (
    <BlurredEllipsesBackground>
      <ScrollView
        style={{
          flex: 1,
          // backgroundColor: colors.darkTurquoise
        }}
        contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView style={{ marginBottom: 100 }}>
          <View style={{ padding: sizes.padding.md, gap: sizes.gap.lg }}>
            <View style={innerStyles.progressLearn}>
              <View style={innerStyles.progressText}>
                <Image
                  source={
                    assetsImg === 'brain'
                      ? assets.images.brain
                      : assets.images.lung
                  }
                  style={{ width: 20, height: 20 }}
                />
                <Text style={{ ...styleses.text.body3 }}>{title}</Text>
              </View>

              <View style={innerStyles.progressBarContainer}>
                {/* {articles.map((arc, key) => {
                  return (
                    <View key={key} style={innerStyles.progressBar}></View>
                  );
                })} */}
              </View>
            </View>
            <Text style={{ ...styleses.text.header1 }}>{arc?.title}</Text>
            {arc?.content?.sections[number] !== '' ? (
              arc?.content?.sections[number]?.end ? (
                <>
                  <Text style={{ ...styleses.text.header3 }}>
                    {arc?.content?.sections[number]?.header}
                  </Text>
                  <View
                    style={{
                      padding: 14,
                      backgroundColor: 'white',
                      borderRadius: 16,
                    }}>
                    <Text style={{ ...styleses.text.body3, color: colors.black }}>
                      {arc?.content?.sections[number]?.text}
                    </Text>
                  </View>
                  <PrimaryButton
                    text='Back to Learn'
                    color={colors.darkGrey}
                    onPress={() => {
                      navigation.goBack();
                      addLearnedArticle(arc, category);
                      setNumber(0);
                    }}
                  />
                </>
              ) : (
                <>
                  <Text style={{ ...styleses.text.header3 }}>
                    {arc?.content?.sections[number]?.header}
                  </Text>
                  <View
                    style={{
                      padding: 14,
                      backgroundColor: 'white',
                      borderRadius: 16,
                    }}>
                    <Text style={{ ...styleses.text.body2, color: colors.black }}>
                      {arc?.content?.sections[number]?.text}
                    </Text>
                  </View>
                  <View
                    style={{
                      gap: 20,
                    }}>
                    <PrimaryButton
                      text='Next'
                      color={colors.green}
                      onPress={() => setNumber(number + 1)}
                    />
                    {number > 0 ? (
                      <PrimaryButton
                        text='Back'
                        color={colors.darkGrey}
                        onPress={() => setNumber(number - 1)}
                      />
                    ) : (
                      <></>
                    )}
                  </View>
                </>
              )
            ) : (
              <Text>tdk ada</Text>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </BlurredEllipsesBackground>
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

export default LearnDetail;

import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, Image, Alert } from 'react-native';
import { colors, styles } from '../../data/theme';
import { sizes } from '../../data/theme';
import art1 from '../../../assets/img/art1.png';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';

function LearnCard({ article, done }) {
  return (
    <View style={done ? { opacity: 0.4 } : { opacity: 1 }}>
      <View style={innerStyles.container}>
        <ImageBackground
          resizeMode="cover"
          source={art1}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: sizes.padding.md,
            overflow: 'hidden',
          }}>
          <View style={innerStyles.firstCard}>
            <Text style={styles.text.header3}>{article?.title}</Text>
            <Text style={styles.text.body3}>{article?.desc}</Text>
          </View>
          <View style={innerStyles.secondCard}></View>
        </ImageBackground>
      </View>
    </View>
  );
}

const innerStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#306D76',
    // margin: sizes.padding.lg,
    marginBottom: 0,
    borderRadius: sizes.padding.md,
  },
  headingText: {
    color: colors.white,
    fontSize: sizes.text.bodyLg,
    fontWeight: 700,
    fontFamily: 'Poppins-Regular',
    paddingBottom: sizes.padding.sm,
  },
  descText: {
    color: colors.white,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    paddingBottom: sizes.padding.sm,
  },
  firstCard: {
    backgroundColor: colors.green,
    padding: sizes.padding.md,
    borderTopRightRadius: sizes.padding.lg,
    borderBottomRightRadius: sizes.padding.lg,
    borderRadius: sizes.padding.md,
    width: '70%',
  },
  secondCard: {
    width: '50%',
  },
});

LearnCard.propTypes = {};

export default LearnCard;

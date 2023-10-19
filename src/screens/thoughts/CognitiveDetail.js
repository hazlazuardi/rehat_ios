import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import { Pressable } from 'react-native';
import { colors } from '../../data/theme';
import { sizes } from '../../data/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LearnCard from '../../components/learn/LearnCard';
import data from '../../data/articles';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import { styles as styleses } from '../../data/theme';
import PrimaryButton from '../../components/PrimaryButton';

function CognitiveDetail({ route, navigation }) {
  const [isShouldReturn, setIsShouldReturn] = useState(false);
  const { data, title, inputText } = route.params;
  const [input, setInput] = useState('');

  const isInputChanged = () => {
    return input !== '';
  };

  const handleNextPress = () => {
    if (isInputChanged()) {
      navigation.navigate('Cognitive Another Way', {
        previousData: data,
        title: title,
        previousInput: inputText,
        currentInput: input,
      });
    } else {
      alert('Please modify the text input before proceeding.');
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <BlurredEllipsesBackground>
      <KeyboardAwareScrollView
        extraScrollHeight={64}
        keyboardOpeningTime={10}
        enableResetScrollToCoords={false}
        keyboardDismissMode={isShouldReturn ? 'none' : 'interactive'}
        keyboardShouldPersistTaps={isShouldReturn ? 'always' : 'never'}
        contentContainerStyle={{ flexGrow: 1 }}
        contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView style={{ marginBottom: 100 }}>
          <View style={{ padding: sizes.padding.md, gap: sizes.gap.lg }}>
            <View>
              <Text style={{ ...styleses.text.header1 }}>Cognitive Restructuring</Text>
            </View>

            <View style={styles.prevText}>
              <Text style={styles.descLearn}>"{inputText}"</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {data
                ?.filter(d => d.choosen === true)
                .map(dats => {
                  return (
                    <View key={dats?.text} style={styles.choice2}>
                      <Text style={{ color: 'white' }}>{dats?.text}</Text>
                    </View>
                  );
                })}
            </View>

            <View>
              <Text style={styles.challenge}>
                How can you challenge your thought?
              </Text>
            </View>
            <View>
              <TextInput
                placeholder="Even though ..."
                placeholderTextColor="#F8F8F8"
                editable
                multiline
                numberOfLines={4}
                maxLength={100}
                onChangeText={text => setInput(text)}
                value={input}
                style={styles.textInput}
              />
            </View>
            <View style={{
              gap: sizes.gap.md
            }}>
              <PrimaryButton
                text='Next'
                color={colors.green}
                onPress={handleNextPress}
              />
              <PrimaryButton
                text='Back'
                color={colors.darkGreyTransparent}
                onPress={handleBackPress}
              />
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </BlurredEllipsesBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1720',
    paddingTop: 100,
    paddingHorizontal: 24, // This sets the background color for the entire screen
  },
  containerButton: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
    marginVertical: 30,
    marginBottom: 0,
  },
  prevText: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 0,
    fontStyle: 'italic',
    backgroundColor: 'rgba(254, 118, 58, 0.39)',
  },
  buttonBack: {
    marginVertical: 10,
    backgroundColor: colors.white,
    padding: 20,
    width: '100%',
    borderRadius: 20,
    textAlign: 'center',
  },
  buttonNext: {
    marginVertical: 10,
    backgroundColor: colors.green,
    padding: 20,
    width: '100%',
    borderRadius: 20,
    textAlign: 'center',
  },
  buttonNextText: {
    textAlign: 'center',
    color: 'white',
  },
  buttonNextBack: {
    textAlign: 'center',
    color: 'black',
  },
  textInput: {
    color: 'white',
    marginTop: 20,
    borderRadius: 10,
    height: 200,
    padding: 20,
    paddingTop: 25,
    backgroundColor: 'rgba(217, 217, 217, 0.08)',
  },
  challenge: {
    color: colors.white,
    fontSize: sizes.text.bodyLg,
    width: '100%',
    fontFamily: 'Poppins-regular',
    marginTop: 0,
  },
  headingLearn: {
    color: colors.white,
    fontSize: sizes.text.header1,
    width: '100%',
    fontFamily: 'Poppins-regular',
    marginBottom: 20,
  },
  descLearn: {
    marginTop: sizes.padding.sm,
    color: '#D9D9D9',
    fontSize: sizes.text.bodylg,
    width: '75%',
    fontFamily: 'Poppins-regular',
  },
  descLearn2: {
    marginTop: sizes.padding.md,
    color: '#D9D9D9',
    fontSize: sizes.text.header3,
    width: '100%',
    fontFamily: 'Poppins-regular',
  },
  choice: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 2,
    marginVertical: 5,
  },
  choice2: {
    backgroundColor: 'rgba(255, 255, 255, 0.23)',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 2,
    marginVertical: 5,
    color: 'white',
  },
  containerChoice: {
    marginVertical: 15,
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default CognitiveDetail;

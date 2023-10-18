import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import {Pressable} from 'react-native';
import {colors} from '../../data/theme';
import {sizes} from '../../data/theme';
import LearnCard from '../../components/learn/LearnCard';
import {storage} from '../../../App';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import {styles as styleses} from '../../data/theme';

function CognitiveAnotherWay({route, navigation}) {
  const [isShouldReturn, setIsShouldReturn] = useState(false);
  const {
    previousData,
    previousInput,
    currentInput,
    title,
    isPreview,
    TRData,
    TRFI,
    TRSI,
    TRTI,
  } = route.params;
  const [input, setInput] = useState('');

  console.log('trfdata');
  const filteredData = previousData
    ?.filter(d => d.choosen === true)
    .map(dats => ({
      id: dats.id,
      text: dats.text,
    }));
  const currentTime = new Date().toISOString();

  const handleNextPress = () => {
    if (input !== '') {
      // Transform the data into the desired structure
      const transformedDataArray = filteredData.map(d => d.text);

      const newEntry = {
        data: [...transformedDataArray],
        time: currentTime,
        title: title,
        input: {
          firstInput: previousInput,
          secondInput: currentInput,
          thirdInput: input,
        },
      };

      let existingData = [];
      const storedData = storage.getString('cognitiveData'); // Fetch existing data
      if (storedData) {
        existingData = JSON.parse(storedData);
      }

      existingData.push(newEntry); // Add new data to the existing data

      try {
        storage.set('cognitiveData', JSON.stringify(existingData)); // Store updated data
        navigation.navigate('Success Screen');
      } catch (error) {
        console.error('Error storing data:', error);
      }
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
        contentContainerStyle={{flexGrow: 1}}
        contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView style={{marginBottom: 100}}>
          <View style={{padding: sizes.padding.md, gap: sizes.gap.lg}}>
            <View>
              <Text style={{...styleses.text.header1}}>
                Cognitive Restructuring
              </Text>
            </View>
            {isPreview && (
              <Text style={{color: 'white'}}>
                What unhelpful thought do you have?
              </Text>
            )}
            <View style={isPreview ? styles.prevTextprev : styles.prevText}>
              {!isPreview && (
                <Text style={styles.descLearn}>"{previousInput}"</Text>
              )}
              {isPreview && <Text style={styles.descLearn}>"{TRFI}"</Text>}
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {!isPreview &&
                previousData
                  ?.filter(d => d.choosen === true)
                  .map(dats => {
                    return (
                      <View key={dats?.text} style={styles.choice2}>
                        <Text style={{color: 'white'}}>{dats?.text}</Text>
                      </View>
                    );
                  })}
              {isPreview &&
                TRData?.map((dats, index) => {
                  return (
                    <View key={index} style={styles.choice2}>
                      <Text style={{color: 'white'}}>{dats}</Text>
                    </View>
                  );
                })}
            </View>
            {isPreview && (
              <View>
                <Text style={{color: 'white'}}>
                  How can you challenge your thought?
                </Text>
              </View>
            )}
            <View style={isPreview ? styles.prevTextprev : styles.prevText}>
              {!isPreview && (
                <Text style={styles.descLearn}>"{currentInput}"</Text>
              )}
              {isPreview && <Text style={styles.descLearn}>"{TRSI}"</Text>}
            </View>
            {isPreview && (
              <View>
                <Text style={{color: 'white'}}>
                  What is another way of thinking about this?
                </Text>
              </View>
            )}
            {isPreview && (
              <View style={isPreview ? styles.prevTextprev : styles.prevText}>
                <Text style={styles.descLearn}>"{TRTI}"</Text>
              </View>
            )}
            <View>
              {!isPreview && (
                <TextInput
                  placeholder="A better way to look at it would be..."
                  placeholderTextColor="#F8F8F8"
                  editable
                  multiline
                  numberOfLines={4}
                  maxLength={100}
                  onChangeText={text => setInput(text)}
                  value={input}
                  style={styles.textInput}
                />
              )}
            </View>
            {!isPreview && (
              <View style={styles.containerButton}>
                <Pressable onPress={handleBackPress}>
                  <View style={styles.buttonBack}>
                    <Text style={styles.buttonNextBack}>Back</Text>
                  </View>
                </Pressable>
                <Pressable onPress={handleNextPress}>
                  <View style={styles.buttonNext}>
                    <Text style={styles.buttonNextText}>Next</Text>
                  </View>
                </Pressable>
              </View>
            )}
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </BlurredEllipsesBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 24, // This sets the background color for the entire screen
  },
  challenge: {
    color: colors.white,
    fontSize: sizes.text.bodyLg,
    width: '100%',
    fontFamily: 'Poppins-regular',
    marginTop: 20,
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
    marginTop: 0,
    marginBottom: 0,
    fontStyle: 'italic',
    backgroundColor: 'rgba(254, 118, 58, 0.39)',
  },
  prevTextprev: {
    padding: 10,
    borderRadius: 10,
    marginTop: 0,
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

export default CognitiveAnotherWay;

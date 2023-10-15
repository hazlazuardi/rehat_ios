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
import { colors } from '../data/theme';
import { sizes } from '../data/theme';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import LearnCard from '../components/learn/LearnCard';
import data from '../data/articles';
import { storage } from '../../App';

function CognitiveAnotherWay({ route, navigation }) {
  const { previousData, previousInput, currentInput } = route.params;
  const [input, setInput] = useState('');

  // const storeData = async (key, value) => {
  const storeData = (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      // await AsyncStorage.setItem(key, jsonValue);
      storage.set(key, jsonValue)
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  // const handleNextPress = async () => {
  const handleNextPress = () => {
    if (input !== '') {
      const dataToBeStored = {
        data: previousData,
        input: [
          { firstInput: previousInput },
          { secondInput: currentInput },
          { thirdInput: input },
        ],
      };
      navigation.navigate('Success Screen');

      try {
        // await AsyncStorage.setItem(
        //   'cognitiveData',
        //   JSON.stringify(dataToBeStored),

        storage.set('cognitiveData', JSON.stringify(dataToBeStored))

        // ... further navigation or other logic goes here
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
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.headingLearn}>Cognitive Restructuring</Text>
      </View>

      <View style={styles.prevText}>
        <Text style={styles.descLearn}>"{previousInput}"</Text>
      </View>
      {previousData
        ?.filter(d => d.choosen === true)
        .map(dats => {
          return (
            <View style={styles.choice2}>
              <Text style={{ color: 'white' }}>{dats?.text}</Text>
            </View>
          );
        })}
      <View style={styles.prevText}>
        <Text style={styles.descLearn}>"{currentInput}"</Text>
      </View>
      <View>
        <Text style={styles.challenge}>
          What is another way of thinking about this?
        </Text>
      </View>
      <View>
        <TextInput
          placeholder="A better way to look at it would be..."
          placeholderTextColor="#F8F8F8"
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          onChangeText={text => setInput(text)}
          value={input}
          style={styles.textInput}
        />
      </View>
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
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1720',
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
    marginBottom: 200,
  },
  prevText: {
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
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
    height: 400,
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

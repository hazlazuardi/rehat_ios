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
import {colors} from '../data/theme';
import {sizes} from '../data/theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BlurredEllipsesBackground from '../components/BlurredEllipsesBackground';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import LearnCard from '../components/learn/LearnCard';
import data from '../data/articles';
import { styles as styleses } from '../data/theme';

function CognitiveRestructuring({navigation}) {
  const [isShouldReturn, setIsShouldReturn] = useState(false)
  const initialData = [
    {id: 1, text: 'Emotional Reasoning', choosen: false},
    {id: 2, text: 'All or Nothing Thinking', choosen: false},
    {id: 3, text: 'Jumping to Conclusion', choosen: false},
    {id: 4, text: 'Self Blaming', choosen: false},
    {id: 5, text: 'Should or Must Statement', choosen: false},
    {id: 6, text: 'Fortune Telling', choosen: false},
  ];

  const [data, setData] = useState(initialData);
  const [title, setTitle] = useState('')
  const [input, setInput] = useState('');
  const isReadyToProceed = () => {
    const isInputChanged = input !== '';
    const isChoiceMade = data.some(item => item.choosen);
    return isInputChanged && isChoiceMade;
  };

  const handleChoicePress = id => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        return {...item, choosen: !item.choosen};
      }
      return item;
    });
    setData(updatedData);
  };

  const handleNextPress = () => {
    if (isReadyToProceed()) {
      navigation.navigate('Cognitive Detail', {data, title, inputText: input});
    } else {
      alert(
        'Please ensure you have written in the text field and chosen at least one option.',
      );
    }
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
            <Text style={{...styleses.text.header1}}>Cognitive Restructuring</Text>
              <Text style={styles.descLearn}>
                What unhelpful thought do you have?
              </Text>
            </View>
            <View>
              <TextInput
                placeholder="What is the best word to describe this feeling?"
                placeholderTextColor="#F8F8F8"
                editable
                multiline
                numberOfLines={4}
                maxLength={40}
                onChangeText={text => setTitle(text)}
                value={title}
                style={styles.textInputTwo}
              />
            </View>
            <View>
              <TextInput
                placeholder="I Think..."
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
            <View>
              <Text style={styles.descLearn2}>
                Does your thought have any of these relation?
              </Text>
            </View>
            <View style={styles.containerChoice}>
              {data?.map((dats,index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => {
                      handleChoicePress(dats.id);
                    }}>
                    <View style={dats.choosen ? styles.choice : styles.choice2}>
                      <Text
                        style={
                          dats.choosen ? {color: 'black'} : {color: 'white'}
                        }>
                        {dats?.text}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
            <Pressable onPress={handleNextPress}>
              <View style={styles.buttonNext}>
                <Text style={styles.buttonNextText}>Next</Text>
              </View>
            </Pressable>
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
  buttonNext: {
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
  textInput: {
    color: 'white',
    marginTop: 20,
    borderRadius: 10,
    height: 400,
    padding: 20,
    paddingTop: 25,
    backgroundColor: 'rgba(217, 217, 217, 0.08)',
  },
  textInputTwo: {
    color: 'white',
    marginTop: 20,
    borderRadius: 10,
    height: 70,
    padding: 20,
    paddingTop: 25,
    backgroundColor: 'rgba(217, 217, 217, 0.08)',
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

export default CognitiveRestructuring;

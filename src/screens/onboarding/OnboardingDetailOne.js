import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  Modal,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import assets from '../../data/assets';
import {colors, sizes, styles} from '../../data/theme';
// import checklist from '../../../assets/img/checklist1.png';
import BlurredOnboarding from '../../components/BlurredBackgroundOnboarding';

function OnboardingDetailOne({navigation}) {
  const [input, setInput] = useState();
  const [state, setState] = useState(0);
  const [finished, setFinished] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <BlurredOnboarding>
      <SafeAreaView style={{marginBottom: 100}}>
        <View style={{padding: sizes.padding.md, gap: sizes.gap.lg}}>
          <View style={{padding: 24}}>
            <View>
              <Text
                style={{
                  ...styles.text.header1,
                  marginTop: 0,
                  fontWeight: 600,
                }}>
                Discover Rehat's Tools for Tranquility
              </Text>
            </View>
            <Text
              style={{
                ...styles.text.body2,
                color: 'white',
                textAlign: 'left',
                marginTop: 30,
              }}>
              Our specially curated tools are designed to guide you to serenity:
            </Text>
            <View style={{marginBottom: 15, marginTop: 30}}>
              <Text style={{...styles.text.body3, fontWeight: 'bold'}}>
                • Breathing Method
              </Text>
              <Text
                style={{...styles.text.body3, marginTop: 5, marginLeft: 12}}>
                Let every inhale and exhale bring you clarity and relief.
              </Text>
            </View>
            <View style={{marginBottom: 15}}>
              <Text style={{...styles.text.body3, fontWeight: 'bold'}}>
                • Recovery Techniques
              </Text>
              <Text
                style={{
                  ...styles.text.body3,
                  marginTop: 5,
                  marginLeft: 12,
                  color: 'white',
                }}>
                From grounding exercises to cognitive therapies, explore a range
                of methods tailored to support your mental wellness journey.
              </Text>
            </View>
            <View>
              <Pressable onPress={()=>{navigation.navigate('Onboarding Detail Two')}}>
                <View
                  style={{
                    backgroundColor: colors.orange,
                    padding: 20,
                    width: '100%',
                    alignSelf: 'center',
                    borderRadius: 15,
                    textAlign: 'center',
                    marginTop: 100,
                  }}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    Next -{'>'}
                  </Text>
                </View>
              </Pressable>
              <Pressable onPress={()=>{navigation.goBack()}}>
                <View
                  style={{
                    backgroundColor: colors.white,
                    padding: 20,
                    width: '100%',
                    alignSelf: 'center',
                    borderRadius: 15,
                    textAlign: 'center',
                    marginTop: 20,
                  }}>
                  <Text style={{color: 'black', textAlign: 'center'}}>
                    Back
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </BlurredOnboarding>
  );
}

export default OnboardingDetailOne;

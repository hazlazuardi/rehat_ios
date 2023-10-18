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
  TouchableHighlight,
} from 'react-native';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import assets from '../../data/assets';
import {colors, sizes, styles} from '../../data/theme';
import checklist from '../../../assets/img/checklist1.png';
import BlurredOnboarding from '../../components/BlurredBackgroundOnboarding';
import {storage} from '../../../App';

function OnboardingScreen({navigation}) {
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
              <Text style={{...styles.text.body2}}>Welcome to</Text>
              <Text
                style={{
                  ...styles.text.header1,
                  marginTop: 0,
                  fontWeight: 600,
                }}>
                Rehat
              </Text>
            </View>
            <View
              style={{
                marginTop: 50,
                padding: 50,
                backgroundColor: colors.white,
                borderColor: colors.orange,
                borderWidth: 5,
                borderRadius: 30,
              }}>
              <Text
                style={{
                  ...styles.text.body2,
                  color: 'black',
                  textAlign: 'left',
                }}>
                Embark on a transformative journey towards mindfulness and
                well-being. With Rehat, every moment can become an opportunity
                to find calm and peace.
              </Text>
            </View>
            <Pressable
              onPress={() => {
                navigation.navigate('Onboarding Detail One');
              }}>
              <View
                style={{
                  backgroundColor: colors.orange,
                  padding: 20,
                  width: '80%',
                  alignSelf: 'center',
                  borderRadius: 15,
                  textAlign: 'center',
                  marginTop: 100,
                }}>
                <Text style={{color: 'white', textAlign: 'center'}}>
                  Begin -{'>'}
                </Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                storage.set('isOnboarded', 'true');
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Root'}],
                });
              }}>
              <Text
                style={{
                  ...styles.text.body3,
                  color: 'white',
                  textAlign: 'center',
                  paddingTop: 20,
                }}>
                Skip for now
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </BlurredOnboarding>
  );
}

export default OnboardingScreen;

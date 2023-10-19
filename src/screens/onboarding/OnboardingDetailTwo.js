import React, { useState } from 'react';
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
import { colors, sizes, styles } from '../../data/theme';
// import checklist from '../../../assets/img/checklist1.png';
import BlurredOnboarding from '../../components/BlurredBackgroundOnboarding';
import { storage } from '../../../App';

function OnboardingDetailTwo({ navigation }) {
  const [input, setInput] = useState();
  const [state, setState] = useState(0);
  const [finished, setFinished] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <BlurredOnboarding>
      <SafeAreaView style={{ marginBottom: 100 }}>
        <View style={{ padding: sizes.padding.md, gap: sizes.gap.lg }}>
          <View style={{ padding: 24 }}>
            <View>
              <Text
                style={{
                  ...styles.text.header1,
                  marginTop: 0,
                  fontWeight: 600,
                }}>
                Personalize Your Rehat Experience
              </Text>
            </View>
            <Text
              style={{
                ...styles.text.body2,
                color: 'white',
                textAlign: 'left',
                marginTop: 30,
              }}>
              Every individual is unique, and so should be their path to
              tranquility. Choose the techniques that resonate with you the
              most, and let's tailor your Rehat journey.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginVertical: 30,
              }}>
              <View
                style={{
                  padding: 10,
                  margin: 5,
                  borderColor: colors.orange,
                  borderWidth: 1,
                  borderRadius: 30,
                }}>
                <Text style={{ color: colors.white }}>Guided Breathing</Text>
              </View>
              <View
                style={{
                  padding: 10,
                  margin: 5,
                  borderColor: colors.orange,
                  borderWidth: 1,
                  borderRadius: 30,
                }}>
                <Text style={{ color: colors.white }}>Calling Loved Ones</Text>
              </View>
              <View
                style={{
                  padding: 10,
                  margin: 5,
                  borderColor: colors.orange,
                  borderWidth: 1,
                  borderRadius: 30,
                }}>
                <Text style={{ color: colors.white }}>Grounding</Text>
              </View>
              <View
                style={{
                  padding: 10,
                  margin: 5,
                  borderColor: colors.orange,
                  borderWidth: 1,
                  borderRadius: 30,
                }}>
                <Text style={{ color: colors.white }}>
                  Thoughts Restructuring
                </Text>
              </View>
            </View>
            <View>
              <Pressable
                onPress={() => {
                  storage.set('isOnboarded', "true");
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Root' }],
                  });
                }}>
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
                  <Text style={{ color: 'white', textAlign: 'center' }}>
                    Start Exploring -{'>'}
                  </Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}>
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
                  <Text style={{ color: 'black', textAlign: 'center' }}>
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

export default OnboardingDetailTwo;

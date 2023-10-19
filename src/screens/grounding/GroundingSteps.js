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
  TouchableHighlight,
  Keyboard,
} from 'react-native';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import assets from '../../data/assets';
import { colors, sizes, styles } from '../../data/theme';
import useFormattedDate from '../../helpers/useDateFormatter';
// import checklist from '../../../assets/img/checklist1.png';
import ChipInput from '../../components/ChipInput';
import { useJournal, useJournalingConfig } from '../../context/Context';

function GroundingSteps({ navigation }) {
  const [input, setInput] = useState();
  const [state, setState] = useState(0);
  const [finished, setFinished] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const { journal, dispatchJournal } = useJournal();
  const { journalingConfig, dispatchJournalingConfig } = useJournalingConfig();
  const { dayString, timeString } = useFormattedDate(journal.dateAdded);
  const [isShouldReturn, setIsShouldReturn] = useState(false);
  const requiredChipsCount = 5 - state;

  // State to store the values of the ChipInputs
  const [chipValues, setChipValues] = useState({});

  // Handler to update the chipValues state
  const handleChipEndEditing = (value, type) => {
    setChipValues(prevValues => ({
      ...prevValues,
      [type]: value,
    }));
  };

  const handleNextPress = () => {
    const requiredChips = ['1', '2', '3', '4', '5'].slice(0, 6 - (state + 1)); // Adjust the number of chips based on the state
    const allChipsFilled = requiredChips.every(
      chip => chipValues[chip] && chipValues[chip].trim() !== '',
    );

    if (!allChipsFilled) {
      alert('Please input values for all chips before proceeding!');
      return;
    }

    if (state === 4) {
      setFinished(true);
      return;
    }
    setState(state + 1);
    setInput('');

    // Reset chip values for the next set
    setChipValues({});
  };

  const data = [
    {
      id: 5,
      iconText: (
        <Text
          style={{
            ...styles.text.header2,
            textAlign: 'center',
            paddingTop: sizes.padding.lg,
            fontWeight: 800,
          }}>
          Acknowledge <Text style={{ color: colors.orange }}>FIVE</Text> things
          you can <Text style={{ color: colors.orange }}>SEE</Text> around you.
        </Text>
      ),
      learnText:
        'Begin by looking around, and take in your surroundings. Identify and acknowledge five things you can clearly see. It can be anything from a nearby object to something in the distance.',
      icon: assets.icons.see,
    },
    {
      id: 4,
      iconText: (
        <Text
          style={{
            ...styles.text.header2,
            textAlign: 'center',
            paddingTop: sizes.padding.lg,
            fontWeight: 800,
          }}>
          Recognise <Text style={{ color: colors.orange }}>FOUR</Text> things you
          can <Text style={{ color: colors.orange }}>TOUCH</Text> around you.
        </Text>
      ),
      learnText:
        'Now, shift your attention to your sense of touch. Reach out and feel four different objects or surfaces around you. Notice the texture, temperature, and other sensations they provide.',
      icon: assets.icons.touch,
    },
    {
      id: 3,
      iconText: (
        <Text
          style={{
            ...styles.text.header2,
            textAlign: 'center',
            paddingTop: sizes.padding.lg,
            fontWeight: 800,
          }}>
          Listen for <Text style={{ color: colors.orange }}>THREE</Text> things
          you can <Text style={{ color: colors.orange }}>HEAR</Text>.
        </Text>
      ),
      learnText:
        "Close your eyes for a moment and tune into the sounds around you. Whether it's the distant hum of traffic, the chirping of birds, or the ticking of a clock, identify three distinct sounds.",
      icon: assets.icons.hearing,
    },
    {
      id: 2,
      iconText: (
        <Text
          style={{
            ...styles.text.header2,
            textAlign: 'center',
            paddingTop: sizes.padding.lg,
            fontWeight: 800,
          }}>
          Note <Text style={{ color: colors.orange }}>TWO</Text> things you can{' '}
          <Text style={{ color: colors.orange }}>SMELL</Text>.
        </Text>
      ),
      learnText:
        "This might require you to move or seek out particular scents. Whether it's the aroma of a freshly brewed coffee or the scent of a blooming flower, take a deep breath and immerse yourself in the fragrances.",
      icon: assets.icons.smell,
    },
    {
      id: 1,
      iconText: (
        <Text
          style={{
            ...styles.text.header2,
            textAlign: 'center',
            paddingTop: sizes.padding.lg,
            fontWeight: 800,
          }}>
          Recognize <Text style={{ color: colors.orange }}>ONE</Text> thing you
          can <Text style={{ color: colors.orange }}>TASTE</Text>.
        </Text>
      ),
      learnText:
        "Finally, focus on your sense of taste. This might be the aftertaste of a recent meal, the flavor of gum, or even just the taste of the air. By identifying a taste, you're completing your sensory journey back to the present moment.",
      icon: assets.icons.taste,
    },
  ];

  return (
    <BlurredEllipsesBackground>
      <ScrollView
        style={{
          flex: 1,
          // backgroundColor: colors.darkTurquoise
        }}
        contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView style={{ marginBottom: 100 }}>
          {!finished ? (
            <>
              <View style={{ padding: sizes.padding.md, gap: sizes.gap.lg }}>
                {data[state]?.iconText}
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Pressable onPress={() => setModalVisible(true)}>
                  <View
                    style={{
                      backgroundColor: '#3F4D54',
                      borderRadius: 24,
                      borderWidth: 1,
                      borderColor: 'white',
                    }}>
                    <Text style={{ padding: 14, color: 'white' }}>
                      Learn More
                    </Text>
                  </View>
                </Pressable>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={isModalVisible}
                  onRequestClose={() => setModalVisible(false)}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 300,
                        height: 200,
                        padding: 20,
                        backgroundColor: 'white',
                        borderRadius: 10,
                        alignItems: 'center',
                      }}>
                      <Text>{data[state]?.learnText}</Text>
                      <TouchableHighlight
                        style={{
                          marginTop: 20,
                          padding: 10,
                          backgroundColor: colors.orange,
                          borderRadius: 5,
                        }}
                        onPress={() => setModalVisible(false)}>
                        <Text style={{ color: 'white' }}>Close</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </Modal>
              </View>
              <View
                style={{
                  backgroundColor: colors.orange,
                  width: 150,
                  height: 150,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 75,
                  marginTop: 30,
                }}>
                <Image source={data[state]?.icon} />
              </View>
              <View
                style={{
                  padding: 20,
                  flexDirection: 'row',
                  gap: 10,
                  flexWrap: 'wrap',
                }}>
                {Array.from({ length: requiredChipsCount }, (_, i) =>
                  (i + 1).toString(),
                ).map(type => (
                  <ChipInput
                    value={chipValues[type]}
                    key={type}
                    type={type}
                    onEndEditing={(value, type) =>
                      handleChipEndEditing(value, type)
                    }
                    onFocus={() => setIsShouldReturn(true)}
                  />
                ))}
              </View>
              <View style={{ padding: 24 }}>
                <Pressable onPress={handleNextPress}>
                  <View
                    style={{
                      backgroundColor: colors.green,
                      padding: 20,
                      width: '100%',
                      borderRadius: 20,
                      textAlign: 'center',
                      marginTop: 20,
                    }}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                      Next
                    </Text>
                  </View>
                </Pressable>
              </View>
            </>
          ) : (
            <View style={{ padding: 24 }}>
              <View
                style={{
                  paddingTop: 100,
                  justifyContent: 'center',
                  alignContent: 'center',
                  textAlign: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={assets.icons.checklist_completed}
                  style={{ width: 100, height: 100, marginBottom: 20 }}
                />
                <Text
                  style={{
                    ...styles.text.header2,
                    textAlign: 'center',
                    paddingTop: sizes.padding.lg,
                    fontWeight: 800,
                  }}>
                  <Text style={{ color: colors.orange }}>Excercise Complete</Text>
                </Text>
                <Text
                  style={{
                    ...styles.text.body2,
                    textAlign: 'justify',
                    marginTop: 20,
                  }}>
                  Congratulations! You've successfully navigated the 54321
                  grounding technique.
                </Text>
                <Text
                  style={{
                    ...styles.text.body2,
                    textAlign: 'justify',
                    marginTop: 20,
                  }}>
                  Remember, anytime you feel overwhelmed or distant, you have
                  this tool at your disposal to bring you back to the here and
                  now. Always prioritize your well-being.
                </Text>
              </View>
              <Pressable onPress={() => navigation.popToTop()}>
                <View
                  style={{
                    backgroundColor: colors.green,
                    padding: 20,
                    width: '100%',
                    borderRadius: 20,
                    textAlign: 'center',
                    marginTop: 100,
                  }}>
                  <Text style={{ color: 'white', textAlign: 'center' }}>
                    Next
                  </Text>
                </View>
              </Pressable>
            </View>
          )}
        </SafeAreaView>
      </ScrollView>
    </BlurredEllipsesBackground>
  );
}
export default GroundingSteps;

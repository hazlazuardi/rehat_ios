import React from 'react';
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import checklist from '../../../assets/img/checklist1.png';
import {colors} from '../../data/theme';
import { styles as styleses } from '../../data/theme';

function SuccessDetail({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        source={checklist}
        style={{width: 100, height: 100, marginBottom: 20}}
      />
      <Text style={styles.textSuccess}>All Set!</Text>
      <Text style={styles.descSuccess}>
        Your reflections have been captured. Continue your journey of
        self-growth..
      </Text>

      <Pressable
        style={styles.buttonDone}
        onPress={() => {
            navigation.navigate('Thoughts Reframing')
        }}>
        <Text style={{color: 'white', textAlign: 'center'}}>Done</Text>
      </Pressable>
      <Pressable
        style={styles.buttonGoal}
        onPress={() => {
          navigation.navigate('Create a Goal', { nextPage: 'Thoughts Reframing' })
        }}>
        <Text style={{color: colors.green, textAlign: 'center'}}>
          Create A Goal
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1720',
    paddingTop: 100,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    alignItems: 'center', // This sets the background color for the entire screen
  },
  buttonDone: {
    width: '100%',
    marginVertical: 20,
    padding: 20,
    backgroundColor: colors.green,
    marginTop: 150,
    borderRadius: 16,
  },
  buttonGoal: {
    width: '100%',
    marginVertical: 20,
    padding: 20,
    backgroundColor: colors.white,
    marginTop: 10,
    borderRadius: 16,
  },
  textSuccess: {
    color: 'white',
    fontSize: 24,
  },
  descSuccess: {
    color: 'white',
    fontSize: 16,
    width: '75%',
    marginTop: 10,
    textAlign: 'justify',
  },
});

export default SuccessDetail;

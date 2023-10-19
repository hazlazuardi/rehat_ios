import React from 'react';
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';
// import checklist from '../../../assets/img/checklist1.png';
import { colors, sizes } from '../../data/theme';
import { styles } from '../../data/theme';
import assets from '../../data/assets';
import PrimaryButton from '../../components/PrimaryButton';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';

function SuccessDetail({ navigation }) {
  return (
    <BlurredEllipsesBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, gap: sizes.gap.lg, alignItems: 'center', justifyContent: 'center', paddingHorizontal: sizes.padding.md }}>
          <View style={{
            flex: .24,
            paddingBottom: 16
          }}>
            <Image
              source={assets.icons.done}
              style={{
                flex: 1,
                aspectRatio: 1,
              }}
            />
          </View>
          <Text style={{ ...styles.text.header1, textAlign: 'center' }}>
            Your reflections have been captured. Continue your journey of self-growth..
          </Text>
          <PrimaryButton
            text='Create a Goal'
            color={colors.green}
            onPress={() => {
              navigation.navigate('Create a Goal', { nextPage: 'Thoughts Reframing' })
            }} />

          <PrimaryButton
            text='Done'
            color={colors.darkGreyTransparent}
            onPress={() => {
              navigation.navigate('Thoughts Reframing')
            }} />
        </View>
      </SafeAreaView>
    </BlurredEllipsesBackground>
  );
}






// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0F1720',
//     paddingTop: 100,
//     paddingHorizontal: 24,
//     justifyContent: 'center',
//     alignContent: 'center',
//     textAlign: 'center',
//     alignItems: 'center', // This sets the background color for the entire screen
//   },
//   buttonDone: {
//     width: '100%',
//     marginVertical: 20,
//     padding: 20,
//     backgroundColor: colors.green,
//     marginTop: 150,
//     borderRadius: 16,
//   },
//   buttonGoal: {
//     width: '100%',
//     marginVertical: 20,
//     padding: 20,
//     backgroundColor: colors.white,
//     marginTop: 10,
//     borderRadius: 16,
//   },
//   textSuccess: {
//     color: 'white',
//     fontSize: 24,
//   },
//   descSuccess: {
//     color: 'white',
//     fontSize: 16,
//     width: '75%',
//     marginTop: 10,
//     textAlign: 'justify',
//   },
// });

export default SuccessDetail;

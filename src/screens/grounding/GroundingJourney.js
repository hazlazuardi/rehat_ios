import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  Image,
} from 'react-native';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import assets from '../../data/assets';
import {colors, sizes, styles} from '../../data/theme';

function GroundingJourney({navigation}) {
  // console.log('props', props)
  return (
    <BlurredEllipsesBackground>
      <ScrollView
        style={{
          flex: 1,
          // backgroundColor: colors.darkTurquoise
        }}
        contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView style={{marginBottom: 100}}>
          <View style={{padding: sizes.padding.md, gap: sizes.gap.lg}}>
            <Text
              style={{
                ...styles.text.header2,
                color: colors.orange,
                textAlign: 'center',
                paddingTop: sizes.padding.lg,
                fontWeight: 800,
              }}>
              Welcome to your grounding journey!
            </Text>
            <Text style={{...styles.text.body2, textAlign: 'justify'}}>
              When our minds become overwhelmed, it's essential to bring
              ourselves back to the present moment. The 54321 technique is a
              simple, yet powerful method to anchor your mind.{' '}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                textAlign: 'center',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <View style={{paddingHorizontal: sizes.padding.sm}}>
                <RecoveryList
                  icon={assets.icons.hearing}
                  title={'Extended Exhale'}
                  description={'4 seconds breath-in, 6 seconds breath-out'}
                  iconColor={colors.orange}
                  backgroundColor={colors.orangeTransparent}
                  onPress={() => navigation.navigate('Journaling')}
                />
                <RecoveryList
                  icon={assets.icons.see}
                  title={'Journaling'}
                  description={
                    'Reflect on experiences, emotions, and the triggers'
                  }
                  iconColor={colors.orange}
                  backgroundColor={colors.orangeTransparent}
                  onPress={() => navigation.navigate('Journaling')}
                />
              </View>
              <View
                style={{
                  paddingHorizontal: sizes.padding.sm,
                  justifyContent: 'center',
                }}>
                <RecoveryList
                  icon={assets.icons.smell}
                  title={'Thoughts Reframing'}
                  description={
                    'Challenge and reshape negative thought patterns'
                  }
                  iconColor={colors.orange}
                  backgroundColor={colors.orangeTransparent}
                  onPress={() => navigation.navigate('Thoughts Reframing')}
                />
              </View>
              <View style={{paddingHorizontal: sizes.padding.sm}}>
                <RecoveryList
                  icon={assets.icons.touch}
                  title={'Thoughts Reframing'}
                  description={
                    'Challenge and reshape negative thought patterns'
                  }
                  iconColor={colors.orange}
                  backgroundColor={colors.orangeTransparent}
                  onPress={() => navigation.navigate('Thoughts Reframing')}
                />
                <RecoveryList
                  icon={assets.icons.taste}
                  title={'Five Senses'}
                  description={
                    'Challenge and reshape negative thought patterns'
                  }
                  iconColor={colors.orange}
                  backgroundColor={colors.orangeTransparent}
                  onPress={() => navigation.navigate('Five Senses')}
                />
              </View>
            </View>
            <Text style={{...styles.text.body2, textAlign: 'justify'}}>
              Through a series of sensory-based tasks, you'll be able to
              redirect your focus and find a calming center. Let's get started.
            </Text>
            <Pressable onPress={()=>navigation.navigate('Grounding Steps')} >
              <View
                style={{
                  backgroundColor: colors.green,
                  padding: 20,
                  width: '100%',
                  borderRadius: 20,
                  textAlign: 'center',
                  marginTop:20
                }}>
                <Text style={{color: 'white', textAlign:'center'}}>Next</Text>
              </View>
            </Pressable>
          </View>
        </SafeAreaView>
      </ScrollView>
    </BlurredEllipsesBackground>
  );
}

function RecoveryList({
  icon,
  title,
  description,
  iconColor,
  backgroundColor,
  onPress,
}) {
  return (
    <View
      style={{
        backgroundColor: iconColor,
        borderRadius: sizes.radius.lg * 50,
        padding: sizes.padding.md,
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
        width: 72,
        marginBottom: 20,
      }}>
      <View
        style={{
          width: 32,
          aspectRatio: 1,
        }}>
        <Image
          source={icon}
          style={{
            flex: 1,
            aspectRatio: 1,
          }}
        />
      </View>
    </View>
  );
}

export default GroundingJourney;

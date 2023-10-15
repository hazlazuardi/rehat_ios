import React from 'react';
import PropTypes from 'prop-types';
import {Image, Pressable, SafeAreaView, Text, View} from 'react-native';
import {colors, sizes, styles} from '../../data/theme';
import {useJournal} from '../../context/Context';
import assets from '../../data/assets';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import PrimaryButton from '../../components/PrimaryButton';

/**
 * A component for displaying a success message after saving a journal entry.
 *
 * @component
 * @param {JournalSuccessProps} props - The component's properties.
 * @returns {JSX.Element} The rendered JournalSuccess component.
 */
function JournalSuccess({navigation}) {
  const {dispatchJournal} = useJournal();

  /**
   * Handles the press event when the user is done with the journal entry.
   */
  function handlePress(action) {
    dispatchJournal({type: 'saveJournal'});

    if (action === 'done') {
      navigation.navigate('Journaling');
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'Create a Goal', params: {nextPage: 'Recovery'}}],
      });
    }
  }

  return (
    <BlurredEllipsesBackground>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            gap: sizes.gap.lg,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: sizes.padding.md,
          }}>
          <View
            style={{
              flex: 0.24,
              paddingBottom: 16,
            }}>
            <Image
              source={assets.icons.done}
              style={{
                flex: 1,
                aspectRatio: 1,
              }}
            />
          </View>
          <Text style={{...styles.text.header1, textAlign: 'center'}}>
            Your daily journal has been saved
          </Text>
          <PrimaryButton
            color={colors.green}
            text="Create a Goal"
            onPress={() => handlePress('addGoal')}
          />
          <PrimaryButton
            color={colors.textArea.backgroundColor}
            text="Done"
            onPress={() => handlePress('done')}
          />
        </View>
      </SafeAreaView>
    </BlurredEllipsesBackground>
  );
}

/**
 * Prop types for the JournalSuccess component.
 *
 * @typedef {object} JournalSuccessProps
 * @property {object} navigation - The navigation function.
 */

/**
 * Prop types for the JournalSuccess component.
 *
 * @type {JournalSuccessProps}
 */
JournalSuccess.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default JournalSuccess;

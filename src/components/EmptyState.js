import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Pressable} from 'react-native';
import { styles } from '../data/theme';
import { colors } from '../data/theme';
import {sizes} from '../data/theme';
import { create } from 'react-test-renderer';

function EmptyState({createOrAdd, subject, onPressTo, navigation}) {
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: '#1E252A',
        marginTop: 14,
        borderRadius: 14,
      }}>
      <Text
        style={{
          ...styles.text.body2,
          color: 'white',
          textAlign: 'center',
        }}>
        You haven't {createOrAdd} any {subject}!
      </Text>
      <Pressable onPress={() => navigation.navigate(onPressTo)}>
        <View
          style={{
            padding: 16,
            backgroundColor: colors.orange,
            width: '75%',
            alignSelf: 'center',
            borderRadius: 16,
            marginTop: 16,
          }}>
          <Text
            style={{
              ...styles.text.body3,
              color: 'white',
              textAlign: 'center',
            }}>
            Add {subject}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default EmptyState;

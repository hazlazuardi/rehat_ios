import { BlurView } from '@react-native-community/blur';
import React from 'react';
import { View, StyleSheet } from 'react-native';

function BlurredEllipsesBackground({ children }) {
  return (
    <View style={styles.container}>
      <View style={styles.ellipseTopLeft} />
      <View style={styles.ellipseCenter} />
      <View style={styles.ellipseBottomRight} />
      <BlurView
        style={styles.absolute}
        // blurType="thickMaterial"
        blurAmount={50}
        reducedTransparencyFallbackColor="white"
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#0F1720'
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  ellipseTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 150,
    height: 150,
    borderRadius: 150,
    backgroundColor: '#0E8388', // Adjust color and styles as needed
  },
  ellipseCenter: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    transform: [{ translateX: -150 }, { translateY: -150 }],
    width: 300,
    height: 300,
    borderRadius: 300,
    backgroundColor: '#0E8388', // Adjust color and styles as needed
  },
  ellipseBottomRight: {
    position: 'absolute',
    top: 90,
    right: 0,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#0E8388', // Adjust color and styles as needed
  },
});

export default BlurredEllipsesBackground;

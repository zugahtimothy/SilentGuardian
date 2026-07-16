import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2500); // Holds the custom splash screen for 2.5 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.brandWrapper}>
        <Image 
          source={require('../../assets/silent-logo.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.titleText}>SILENT GUARDIAN</Text>
        <Text style={styles.subtitleText}>Your Safety, One Tap Away</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  logoImage: {
    width: 130,
    height: 130,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '900', 
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitleText: {
    fontSize: 20,
    fontWeight: '500', 
    color: '#053E85',
    textAlign: 'center',
  },
});
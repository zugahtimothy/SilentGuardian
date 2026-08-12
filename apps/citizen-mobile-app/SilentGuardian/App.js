import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreenController from 'expo-splash-screen';

// Import your custom screens & navigators
import AppNavigator from './src/navigation/AppNavigator';
import SplashScreen from './src/screens/SplashScreen'; 

// Keep the initial native splash screen visible while booting
SplashScreenController.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showCustomSplash, setShowCustomSplash] = useState(true);

  useEffect(() => {
    async function prepareApp() {
      try {
        setAppIsReady(true);
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreenController.hideAsync();
      }
    }

    prepareApp();
  }, []);

  // Render nothing while the app environment initializes
  if (!appIsReady) {
    return null;
  }

  // 1. Show custom designed Brand Splash Screen on boot
  if (showCustomSplash) {
    return <SplashScreen onFinish={() => setShowCustomSplash(false)} />;
  }

  // 2. Transition seamlessly to your App Navigation
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreenController from 'expo-splash-screen';
import { supabase } from './src/lib/supabase';

// Import your custom screens & navigators
import AppNavigator from './src/navigation/AppNavigator';
import SplashScreen from './src/screens/SplashScreen'; 

// Keep the initial native splash screen visible while booting
SplashScreenController.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showCustomSplash, setShowCustomSplash] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function prepareApp() {
      try {
        // Fetch current active Supabase auth session
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreenController.hideAsync();
      }
    }

    prepareApp();

    // Listen for auth state changes (LOGIN, LOGOUT, PASSWORD_RECOVERY, TOKEN_REFRESHED)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Render nothing while the app environment initializes
  if (!appIsReady) {
    return null;
  }

  // 1. Show custom designed Brand Splash Screen on boot
  if (showCustomSplash) {
    return <SplashScreen onFinish={() => setShowCustomSplash(false)} />;
  }

  // 2. Pass session into AppNavigator for Auth / Main stack switching
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator session={session} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
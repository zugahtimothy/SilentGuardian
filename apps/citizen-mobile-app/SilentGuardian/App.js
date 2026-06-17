import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

// Import our screens
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';

export default function App() {
  // Simple authentication preview state workflow
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentAuthScreen, setCurrentAuthScreen] = useState('Login');

  if (!isAuthenticated) {
    if (currentAuthScreen === 'Login') {
      return (
        <SafeAreaProvider>
          <LoginScreen 
            onNavigateToSignUp={() => setCurrentAuthScreen('SignUp')} 
            onLoginSuccess={() => setIsAuthenticated(true)}
          />
        </SafeAreaProvider>
      );
    }
    
    return (
      <SafeAreaProvider>
        <SignUpScreen 
          onNavigateToLogin={() => setCurrentAuthScreen('Login')} 
        />
      </SafeAreaProvider>
    );
  }

  // Once authenticated, load the main core navigation stack
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
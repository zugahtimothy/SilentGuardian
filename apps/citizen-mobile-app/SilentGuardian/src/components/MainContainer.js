import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen'; // Reaching out of components into screens
import CustomTabBar from './CustomTabBar';      // Sibling component in the same folder

// Simple placeholder screens for the other tabs until we build them
const ReportsScreen = () => <View style={styles.placeholder} />;
const ShareLocationScreen = () => <View style={styles.placeholder} />;
const CallSecurityScreen = () => <View style={styles.placeholder} />;
const RecentAlertScreen = () => <View style={styles.placeholder} />;

export default function MainContainer() {
  const [activeTab, setActiveTab] = useState('Home');

  // Dynamic screen switcher
  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen />;
      case 'Reports':
        return <ReportsScreen />;
      case 'ShareLocation':
        return <ShareLocationScreen />;
      case 'CallSecurity':
        return <CallSecurityScreen />;
      case 'RecentAlert':
        return <RecentAlertScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Active Screen content */}
      <View style={styles.screenContainer}>
        {renderScreen()}
      </View>

      {/* Floating Reusable Navigation Dock */}
      <CustomTabBar 
        activeTab={activeTab} 
        onTabPress={(tabId) => setActiveTab(tabId)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  screenContainer: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  }
});
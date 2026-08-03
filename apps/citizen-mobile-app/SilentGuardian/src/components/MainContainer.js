import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

// Screen Imports
import HomeScreen from '../screens/HomeScreen';
import ReportsScreen from '../screens/ReportsScreen';
import ShareLocationScreen from '../screens/ShareLocationScreen';
import CallSecurityScreen from '../screens/CallSecurityScreen';
import RecentAlertsScreen from '../screens/RecentAlertsScreen'; // <-- Real screen imported
import CustomTabBar from './CustomTabBar';

export default function MainContainer({ navigation }) {
  const [activeTab, setActiveTab] = useState('Home');

  // Dynamic screen switcher
  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen navigation={navigation} />;
      case 'Reports':
        return <ReportsScreen navigation={navigation} />;
      case 'ShareLocation':
        return <ShareLocationScreen navigation={navigation} />;
      case 'CallSecurity':
        return <CallSecurityScreen navigation={navigation} />;
      case 'RecentAlert':
        return <RecentAlertsScreen navigation={navigation} />; // <-- Connected!
      default:
        return <HomeScreen navigation={navigation} />;
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
});
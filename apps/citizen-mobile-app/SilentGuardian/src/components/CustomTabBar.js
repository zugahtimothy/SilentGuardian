import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

export default function CustomTabBar({ activeTab, onTabPress }) {
  // Define tab configuration for clean rendering
  const tabs = [
    {
      id: 'Home',
      label: 'Home',
      icon: require('../../assets/home-icon-1.png'),
      hasActiveCircle: true,
    },
    {
      id: 'Reports',
      label: 'Reports',
      icon: require('../../assets/reports-icon.png'),
    },
    {
      id: 'ShareLocation',
      label: 'Share location',
      icon: require('../../assets/share-location-icon.png'),
    },
    {
      id: 'CallSecurity',
      label: 'Call Security',
      icon: require('../../assets/call-security-icon.png'),
    },
    {
      id: 'RecentAlert',
      label: 'Recent Alert',
      icon: require('../../assets/recents.png'), // Note: Ensure this matches your local "recents.png" or "recents-icon.png" filename
    },
  ];

  return (
    <View style={styles.navBarWrapper}>
      <View style={styles.navBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <TouchableOpacity 
              key={tab.id}
              style={styles.navItem} 
              activeOpacity={0.8}
              onPress={() => onTabPress(tab.id)}
            >
              {/* If it's the active tab, wrap it in your custom semi-transparent circle */}
              {isActive && tab.hasActiveCircle ? (
                <View style={styles.activeTabCircle}>
                  <Image 
                    source={tab.icon} 
                    style={styles.navIconActive} 
                    resizeMode="contain"
                  />
                </View>
              ) : (
                <Image 
                  source={tab.icon} 
                  style={[
                    styles.navIcon, 
                    // Slight visual fade for inactive tabs to bring focus to the active tab
                    !isActive && { opacity: 0.7 } 
                  ]} 
                  resizeMode="contain"
                />
              )}
              
              <Text style={[styles.navText, isActive && styles.activeNavText]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navBarWrapper: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#053E85', 
    width: width * 0.94,
    height: 75,
    borderRadius: 35,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 12,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  activeTabCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  navIconActive: {
    width: 24,
    height: 24,
  },
  navIcon: {
    width: 22,
    height: 22,
    marginBottom: 4,
  },
  navText: {
    fontSize: 9.5,
    color: '#CDD2D6',
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '500',
  },
  activeNavText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
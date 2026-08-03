import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function CustomTabBar({ activeTab, onTabPress }) {
  // Define tab configuration for clean rendering
  const tabs = [
    {
      id: 'Home',
      label: 'Home',
      icon: require('../../assets/home-icon-1.png'),
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
      icon: require('../../assets/recents.png'),
    },
  ];

  return (
    <View style={styles.navBarWrapper} pointerEvents="box-none">
      <View style={styles.navBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <TouchableOpacity 
              key={tab.id}
              style={styles.navItem} 
              activeOpacity={0.7}
              onPress={() => {
                console.log('Tapped tab:', tab.id);
                if (onTabPress) {
                  onTabPress(tab.id);
                }
              }}
            >
              {/* Active tab displays semi-transparent highlighted circle background */}
              {isActive ? (
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
                  style={[styles.navIcon, { opacity: 0.7 }]} 
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
    zIndex: 999, // Guarantees the tab bar sits above screen content
    elevation: 12,
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
    height: '100%', // Maximize tap target area
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
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
  const settingsOptions = [
    {
      id: 'account',
      title: 'Account',
      subtitle: 'Manage Account',
      icon: 'person',
      iconType: 'ionicons',
      iconColor: '#5D2E2E', // Dark brown tone matching design
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Manage Notifications',
      icon: 'notifications',
      iconType: 'ionicons',
      iconColor: '#656A32', // Olive gold tone
    },
    {
      id: 'privacy',
      title: 'Privacy',
      subtitle: 'Privacy and permissions',
      icon: 'lock-closed',
      iconType: 'ionicons',
      iconColor: '#000000',
    },
    {
      id: 'emergency',
      title: 'Emergency',
      subtitle: 'Emergency settings',
      icon: 'shield-checkmark',
      iconType: 'ionicons',
      iconColor: '#2B62D9', // Bright blue
    },
    {
      id: 'appearance',
      title: 'Appearance',
      subtitle: 'Theme and display',
      icon: 'color-palette',
      iconType: 'ionicons',
      iconColor: '#000000',
    },
    {
      id: 'help',
      title: 'Help & Support',
      subtitle: 'Help, FAQ and more',
      icon: 'help-circle',
      iconType: 'ionicons',
      iconColor: '#A03223', // Reddish maroon
    },
    {
      id: 'about',
      title: 'About',
      subtitle: 'App information',
      icon: 'information-circle',
      iconType: 'ionicons',
      iconColor: '#295E50', // Teal/Forest green
    },
  ];

  const handleOptionPress = (option) => {
    if (option.id === 'account') {
      navigation && navigation.navigate && navigation.navigate('Profile');
    } else {
      Alert.alert(option.title, `Navigating to ${option.subtitle}...`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation && navigation.goBack && navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.optionsList}>
          {settingsOptions.map((item, index) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity
                style={styles.optionRow}
                activeOpacity={0.7}
                onPress={() => handleOptionPress(item)}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name={item.icon} size={28} color={item.iconColor} />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.optionTitle}>{item.title}</Text>
                  <Text style={styles.optionSubtitle}>{item.subtitle}</Text>
                </View>

                <Ionicons name="chevron-forward" size={20} color="#B0B0B0" />
              </TouchableOpacity>

              {index < settingsOptions.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#053E85',
  },
  headerSpacer: {
    width: 28,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  optionsList: {
    marginTop: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  iconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
  },
});
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ReportsScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Categories for incident reporting grid
  const incidentCategories = [
    { id: 'theft', title: 'Theft', icon: 'hand-left-outline', type: 'ion' },
    { id: 'assault', title: 'Assault', icon: 'shield-alert-outline', type: 'mci' },
    { id: 'medical', title: 'Medical', icon: 'medical-outline', type: 'ion' },
    { id: 'fire', title: 'Fire', icon: 'flame-outline', type: 'ion', color: '#FF5722' },
    { id: 'harassment', title: 'Harassment', icon: 'account-alert-outline', type: 'mci' },
    { id: 'other', title: 'Other', icon: 'ellipsis-horizontal-outline', type: 'ion' },
  ];

  // Dummy data for "My Reports" history list
  const reportsList = [
    {
      id: '1',
      title: 'Theft',
      location: 'Engineering Block',
      time: 'Today, 10:30 AM',
      status: 'In Progress',
    },
    {
      id: '2',
      title: 'Medical Emergency',
      location: 'Engineering Block',
      time: 'Today, 10:30 AM',
      status: 'Resolved',
    },
    {
      id: '3',
      title: 'Harassment',
      location: 'Engineering Block',
      time: 'Today, 10:30 AM',
      status: 'In Progress',
    },
  ];

  const renderIcon = (cat) => {
    const iconColor = cat.color || '#000000';
    if (cat.type === 'mci') {
      return <MaterialCommunityIcons name={cat.icon} size={36} color={iconColor} />;
    }
    return <Ionicons name={cat.icon} size={36} color={iconColor} />;
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
        <Text style={styles.headerTitle}>Reports</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search reports..."
            placeholderTextColor="#B0B0B0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Category Grid Section */}
        <Text style={styles.sectionTitle}>Report an Incident</Text>
        
        <View style={styles.gridContainer}>
          {incidentCategories.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.gridCard}
              activeOpacity={0.7}
              onPress={() => {
                // Action when an incident category is tapped
              }}
            >
              {renderIcon(item)}
              <Text style={styles.gridCardText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* My Reports List Section */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>My Reports</Text>
        
        <View style={styles.reportsList}>
          {reportsList.map((report) => (
            <View key={report.id} style={styles.reportItem}>
              <View style={styles.reportDetails}>
                <Text style={styles.reportTitle}>{report.title}</Text>
                <Text style={styles.reportSubtext}>{report.location}</Text>
                <Text style={styles.reportSubtext}>{report.time}</Text>
              </View>

              {/* Status Badge */}
              <View 
                style={[
                  styles.badge, 
                  report.status === 'Resolved' ? styles.badgeResolved : styles.badgeInProgress
                ]}
              >
                <Text 
                  style={[
                    styles.badgeText,
                    report.status === 'Resolved' ? styles.badgeTextResolved : styles.badgeTextInProgress
                  ]}
                >
                  {report.status}
                </Text>
              </View>
            </View>
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
    paddingBottom: 15,
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
    paddingBottom: 100, // Room for floating CustomTabBar
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    marginVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222222',
    marginVertical: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCard: {
    width: '31%',
    height: 100,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#053E85',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  gridCardText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
    color: '#222222',
  },
  reportsList: {
    marginTop: 4,
  },
  reportItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  reportDetails: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  reportSubtext: {
    fontSize: 12,
    color: '#777777',
    marginTop: 1,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeInProgress: {
    backgroundColor: '#FFF2B2',
  },
  badgeResolved: {
    backgroundColor: '#B2F8CC',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  badgeTextInProgress: {
    color: '#9A7200',
  },
  badgeTextResolved: {
    color: '#0D8A3C',
  },
});
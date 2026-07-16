import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
  Image
} from 'react-native';
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

// Custom tab bar import
import CustomTabBar from '../components/CustomTabBar';

export default function TrustedContactsActiveScreen({ onBack, onSave }) {
  const [activeTab, setActiveTab] = useState('Home');

  // Mock data matching the designer's list format
  const trustedList = [
    { id: '1', name: 'Daddy', phone: '+233 26 678 7654', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80' },
    { id: '2', name: 'Daddy', phone: '+233 26 678 7654', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80' },
    { id: '3', name: 'Daddy', phone: '+233 26 678 7654', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80' },
    { id: '4', name: 'Daddy', phone: '+233 26 678 7654', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= HEADER SECTION ================= */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#111111" />
          </TouchableOpacity>
          
          <View style={styles.headerTitleContainer}>
            <View style={styles.headerRow}>
              <MaterialCommunityIcons name="account-box-outline" size={32} color="#053E85" style={styles.headerIcon} />
              <Text style={styles.headerTitle}>Trusted Contacts</Text>
            </View>
            <Text style={styles.headerSubtitle}>Add people you trust</Text>
            <Text style={styles.headerSubDescription}>They will be notified in an emergency</Text>
          </View>
        </View>

        {/* ================= ADD CONTACT TRIGGER BUTTON ================= */}
        <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
          <Ionicons name="add" size={22} color="#4A4A4A" style={styles.addIcon} />
          <Text style={styles.addButtonText}>Add Contact</Text>
        </TouchableOpacity>

        {/* ================= TRUSTED CONTACTS LIST CONTAINER ================= */}
        <View style={styles.listContainer}>
          {trustedList.map((contact, index) => (
            <View key={index} style={styles.contactCard}>
              <View style={styles.cardLeftSection}>
                <Image source={{ uri: contact.avatar }} style={styles.avatar} />
                <View style={styles.textGroup}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactPhone}>{contact.phone}</Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.optionsButton} activeOpacity={0.6}>
                <Entypo name="dots-three-vertical" size={18} color="#A0AEC0" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* ================= FOOTER SUBMIT ACTION ================= */}
        <TouchableOpacity style={styles.saveButton} activeOpacity={0.9} onPress={onSave}>
          <MaterialCommunityIcons name="save-with-disk" size={20} color="#FFFFFF" style={styles.saveIcon} />
          <Text style={styles.saveButtonText}>Save and Continue</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* ================= REUSABLE BOTTOM TAB NAVIGATION ================= */}
      <CustomTabBar 
        activeTab={activeTab} 
        onTabPress={(tabId) => setActiveTab(tabId)} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingBottom: 110, 
    paddingHorizontal: 24,
  },

  // Header Layout Alignment
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 15,
    marginBottom: 25,
  },
  backButton: {
    padding: 4,
    marginLeft: -8,
    marginTop: 4,
  },
  headerTitleContainer: {
    marginLeft: 10,
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#053E85',
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  headerSubDescription: {
    fontSize: 13,
    color: '#4A4A4A',
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
    marginTop: 2,
  },

  // Add Contact Dotted/Border Button Component
  addButton: {
    width: '100%',
    height: 48,
    borderWidth: 1.5,
    borderColor: '#3B82F6',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
  },
  addIcon: {
    marginRight: 6,
  },
  addButtonText: {
    fontSize: 14,
    color: '#4A4A4A',
    fontWeight: '500',
  },

  // List Cards Styles Layout
  listContainer: {
    width: '100%',
    gap: 14,
    marginBottom: 40,
  },
  contactCard: {
    width: '100%',
    height: 76,
    borderWidth: 1.5,
    borderColor: '#3B82F6',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  cardLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#E2E8F0',
  },
  textGroup: {
    marginLeft: 14,
    justifyContent: 'center',
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  contactPhone: {
    fontSize: 13,
    color: '#718096',
    marginTop: 2,
  },
  optionsButton: {
    padding: 6,
    marginRight: -4,
  },

  // Dark Blue Accent "Save and Continue" Button
  saveButton: {
    backgroundColor: '#033169',
    width: '100%',
    height: 54,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  saveIcon: {
    marginRight: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
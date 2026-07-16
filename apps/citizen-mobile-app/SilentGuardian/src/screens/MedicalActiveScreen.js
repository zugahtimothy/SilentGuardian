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
  TextInput
} from 'react-native';
import { Ionicons, FontAwesome5, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';

// Custom tab bar import
import CustomTabBar from '../components/CustomTabBar';

export default function MedicalActiveScreen({ onBack }) {
  // Track the active tab locally for this screen
  const [activeTab, setActiveTab] = useState('Home');
  
  // State to track the active medical crisis type
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  
  // State for the medical info text input
  const [medicalNotes, setMedicalNotes] = useState('');

  const medicalTypes = [
    { id: 'bleeding', label: 'Severe Bleeding', icon: 'droplet', color: '#D10A0A', iconType: 'font-awesome5' },
    { id: 'heart', label: 'Heart Crisis', icon: 'heart-pulse', color: '#D35400', iconType: 'material-community' },
    { id: 'unconsciousness', label: 'Unconsciousness', icon: 'person-falling', color: '#8E44AD', iconType: 'font-awesome6' },
    { id: 'breathing', label: 'Breathing issue', icon: 'lungs', color: '#0B3C5D', iconType: 'font-awesome6' },
  ];

  const renderMedicalIcon = (item) => {
    if (item.iconType === 'material-community') {
      return <MaterialCommunityIcons name={item.icon} size={30} color={item.color} />;
    } else if (item.iconType === 'font-awesome6') {
      return <FontAwesome6 name={item.icon} size={26} color={item.color} />;
    }
    return <FontAwesome5 name={item.icon} size={26} color={item.color} />;
  };

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
              <FontAwesome5 name="user-md" size={24} color="#053E85" style={styles.headerIcon} />
              <Text style={styles.headerTitle}>Medical Team</Text>
            </View>
            <Text style={styles.headerSubtitle}>Emergency Medical Response</Text>
          </View>
        </View>

        {/* ================= SELECT MEDICAL EMERGENCY GRID ================= */}
        <View style={styles.sectionOutlineContainer}>
          <Text style={styles.sectionLabel}>SELECT THE MEDICAL{"\n"}EMERGENCY TYPE</Text>
          
          <View style={styles.gridContainer}>
            {medicalTypes.map((item) => {
              const isSelected = selectedEmergency === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedEmergency(item.id)}
                  style={[
                    styles.gridItem,
                    isSelected && { borderColor: item.color, borderWidth: 2, backgroundColor: 'rgba(0,0,0,0.02)' }
                  ]}
                >
                  <View style={styles.iconWrapper}>
                    {renderMedicalIcon(item)}
                  </View>
                  <Text style={styles.gridItemLabel}>{item.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ================= DIGITAL MEDICAL INFO BOX ================= */}
        <View style={styles.sectionOutlineContainer}>
          <Text style={styles.sectionLabel}>Digital Medical Info</Text>
          
          <View style={styles.infoInputCard}>
            <TextInput
              style={styles.textInput}
              placeholder="Type here............"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              multiline={true}
              numberOfLines={3}
              value={medicalNotes}
              onChangeText={setMedicalNotes}
              textAlignVertical="top"
            />
            
            <View style={styles.sendButtonWrapper}>
              <TouchableOpacity style={styles.sendButton} activeOpacity={0.8}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ================= ACTION BUTTONS STACK ================= */}
        <View style={styles.actionContainer}>
          {/* Request Ambulance */}
          <TouchableOpacity style={styles.ambulanceButton} activeOpacity={0.9}>
            <Text style={styles.ambulanceButtonText}>🚑 Request Ambulance</Text>
          </TouchableOpacity>

          {/* Call Emergency Service */}
          <TouchableOpacity style={styles.callButton} activeOpacity={0.8}>
            <FontAwesome5 name="phone-alt" size={16} color="#053E85" style={styles.callIcon} />
            <Text style={styles.callButtonText}>Call Emergency Service</Text>
          </TouchableOpacity>
        </View>

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

  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 25,
  },
  backButton: {
    padding: 4,
    marginLeft: -8,
  },
  headerTitleContainer: {
    marginLeft: 15,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#053E85',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
    fontWeight: '500',
  },

  // Section Outlines
  sectionOutlineContainer: {
    borderWidth: 1.5,
    borderColor: '#053E85',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    letterSpacing: 0.8,
    marginBottom: 15,
  },

  // FIXED: Forces 2 per row side-by-side distribution layout 
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  gridItem: {
    width: '48%', // Guarantees a side-by-side 2-column breakdown layout style
    height: 100,
    borderWidth: 1,
    borderColor: '#B0C4DE',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
  iconWrapper: {
    marginBottom: 8,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItemLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
  },

  // Medical Info Interactive Card Layout
  infoInputCard: {
    backgroundColor: '#0F738E',
    width: '100%',
    borderRadius: 10,
    padding: 12,
    minHeight: 110,
    justifyContent: 'space-between',
  },
  textInput: {
    color: '#FFFFFF',
    fontSize: 14,
    padding: 0, 
    margin: 0,
    height: 60,
  },
  sendButtonWrapper: {
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
  },
  sendButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 22,
    paddingVertical: 4,
  },
  sendButtonText: {
    color: '#0F738E',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Action Stack Layout
  actionContainer: {
    width: '100%',
    gap: 15,
    marginTop: 5,
  },
  ambulanceButton: {
    backgroundColor: '#D10A0A',
    width: '100%',
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D10A0A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  ambulanceButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  callButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#053E85',
    width: '100%',
    height: 54,
    borderRadius: 27,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callIcon: {
    marginRight: 10,
  },
  callButtonText: {
    color: '#053E85',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
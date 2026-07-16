import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

// Custom tab bar import
import CustomTabBar from '../components/CustomTabBar';

export default function SecurityActiveScreen({ onBack }) {
  // Track the active tab locally for this screen
  const [activeTab, setActiveTab] = useState('Home');
  
  // State to track the active threat type
  const [selectedThreat, setSelectedThreat] = useState(null);

  const threats = [
    { id: 'burglary', label: 'Burglary', icon: 'run-fast', color: '#D10A0A', iconType: 'material-community' },
    { id: 'intruder', label: 'Intruder', icon: 'user-secret', color: '#D35400', iconType: 'font-awesome-5' },
    { id: 'physical', label: 'Physical Threat', icon: 'account-alert', color: '#8E44AD', iconType: 'material-community' },
    { id: 'harassment', label: 'Harassment', icon: 'gesture-tap-box', color: '#0B3C5D', iconType: 'material-community' },
  ];

  const renderThreatIcon = (threat) => {
    if (threat.iconType === 'material-community') {
      return <MaterialCommunityIcons name={threat.icon} size={30} color={threat.color} />;
    }
    return <FontAwesome5 name={threat.icon} size={26} color={threat.color} />;
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
              <FontAwesome5 name="user-shield" size={24} color="#053E85" style={styles.headerIcon} />
              <Text style={styles.headerTitle}>Security Team</Text>
            </View>
            <Text style={styles.headerSubtitle}>Security Desk Response</Text>
          </View>
        </View>

        {/* ================= SELECT THREAT GRID SECTION ================= */}
        <View style={styles.sectionOutlineContainer}>
          <Text style={styles.sectionLabel}>SELECT THE NATURE{"\n"}OF THE THREAT</Text>
          
          <View style={styles.gridContainer}>
            {threats.map((threat) => {
              const isSelected = selectedThreat === threat.id;
              return (
                <TouchableOpacity
                  key={threat.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedThreat(threat.id)}
                  style={[
                    styles.gridItem,
                    isSelected && { borderColor: threat.color, borderWidth: 2, backgroundColor: 'rgba(0,0,0,0.02)' }
                  ]}
                >
                  <View style={styles.iconWrapper}>
                    {renderThreatIcon(threat)}
                  </View>
                  <Text style={styles.gridItemLabel}>{threat.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ================= QUICK MEDIA ATTACHMENTS ================= */}
        <View style={styles.sectionOutlineContainer}>
          <Text style={styles.sectionLabel}>QUICK MEDIA ATTACHMENT</Text>
          
          <View style={styles.mediaRow}>
            <TouchableOpacity style={styles.mediaButton} activeOpacity={0.85}>
              <FontAwesome name="camera" size={20} color="#FFFFFF" />
              <Text style={styles.mediaButtonText}>+ Attach Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mediaButton} activeOpacity={0.85}>
              <FontAwesome name="microphone" size={22} color="#FFFFFF" />
              <Text style={styles.mediaButtonText}>+ Record Audio</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= ACTION BUTTONS ================= */}
        <View style={styles.actionContainer}>
          {/* Dispatch Patrol */}
          <TouchableOpacity style={styles.dispatchButton} activeOpacity={0.9}>
            <Text style={styles.dispatchButtonText}>🚨 Dispatch Patrol Now</Text>
          </TouchableOpacity>

          {/* Call Directly */}
          <TouchableOpacity style={styles.callButton} activeOpacity={0.8}>
            <FontAwesome5 name="phone-alt" size={16} color="#053E85" style={styles.callIcon} />
            <Text style={styles.callButtonText}>Call Security Directly</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* ================= REUSABLE BOTTOM TAB BAR ================= */}
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

  // Outer Border Boxes (Threats & Media)
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

  // Centered 2x2 Selection Grid
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Distributes the pair evenly on each row
    width: '100%',
  },
  gridItem: {
    width: '48%', // Forces exactly 2 buttons per row (leaving a clean 4% space between)
    height: 100,
    borderWidth: 1,
    borderColor: '#B0C4DE',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 12, // Spacing beneath the first row of elements
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

  // Media Area
  mediaRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
    justifyContent: 'center',
  },
  mediaButton: {
    flex: 1,
    backgroundColor: '#0F738E',
    height: 52,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  mediaButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },

  // Action Buttons Stack
  actionContainer: {
    width: '100%',
    gap: 15,
    marginTop: 5,
  },
  dispatchButton: {
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
  dispatchButtonText: {
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
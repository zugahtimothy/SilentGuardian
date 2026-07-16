import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

// Import your reusable custom tab bar component
import CustomTabBar from '../components/CustomTabBar';

const { width } = Dimensions.get('window');

export default function SosActiveScreen({ onCancel, onSelectSecurity, onSelectMedical, onSelectContacts }) {
  // Track active tab state if the user interacts with the navigation dock while on this screen
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* 1. Background Image of the Siren/Ceiling Light */}
      <ImageBackground
        source={require('../../assets/emergency-background.jpg')} 
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      >
        {/* 2. Beautiful lighter royal blue transparent overlay */}
        <View style={styles.blueOverlay}>
          
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.mainContent}>
              
              {/* ================= HEADER ================= */}
              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                  Hello, Timothy <Text style={styles.waveEmoji}>👋</Text>
                </Text>
              </View>

              {/* ================= CIRCULAR SOS TRIGGER ================= */}
              <View style={styles.sosOuterRing}>
                <TouchableOpacity activeOpacity={0.95} style={styles.sosButton}>
                  <Text style={styles.sosTitle}>SOS</Text>
                  <Text style={styles.sosSub}>Tap for help!</Text>
                </TouchableOpacity>
              </View>

              {/* ================= RECIPIENT CHOICES ================= */}
              <View style={styles.cardContainer}>
                
                {/* 1. Security Team (Full Width Card) - Expanded, Centered, and Shield-Free */}
                <TouchableOpacity style={styles.fullCard} activeOpacity={0.9} onPress={onSelectSecurity}>
                  <View style={styles.iconCircleBlue}>
                    <FontAwesome5 name="user-shield" size={24} color="#FFFFFF" />
                  </View>
                  <Text style={styles.cardText}>Security Team</Text>
                </TouchableOpacity>

                {/* 2. Side-by-Side Double Column Cards - Shield-Free */}
                <View style={styles.halfCardRow}>
                  {/* Medical Team */}
                  <TouchableOpacity style={styles.halfCard} activeOpacity={0.9} onPress={onSelectMedical}>
                    <View style={styles.iconCircleBlue}>
                      <FontAwesome5 name="user-md" size={22} color="#FFFFFF" />
                    </View>
                    <Text style={styles.cardTextSmall}>Medical Team</Text>
                  </TouchableOpacity>

                  {/* Trusted Contacts */}
                  <TouchableOpacity style={styles.halfCard} activeOpacity={0.9} onPress={onSelectContacts}>
                    <View style={styles.iconCircleBlue}>
                      <MaterialIcons name="contact-phone" size={24} color="#FFFFFF" />
                    </View>
                    <Text style={styles.cardTextSmall}>Trusted Contacts</Text>
                  </TouchableOpacity>
                </View>

              </View>

              {/* ================= CANCEL BUTTON ================= */}
              <TouchableOpacity 
                style={styles.cancelButton} 
                activeOpacity={0.7}
                onPress={onCancel}
              >
                <Ionicons name="close-circle-outline" size={44} color="#FFFFFF" />
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

            </View>
          </SafeAreaView>

          {/* ================= BOTTOM CUSTOM NAVIGATION TAB BAR ================= */}
          <CustomTabBar 
            activeTab={activeTab} 
            onTabPress={(tabId) => setActiveTab(tabId)} 
          />

        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blueOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13, 78, 150, 0.50)', 
  },
  safeArea: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingBottom: 115, 
  },
  
  // Header Container & Spacing
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 55 : StatusBar.currentHeight + 25,
  },
  headerText: {
    fontSize: 26,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  waveEmoji: {
    fontSize: 26,
  },

  // SOS Concentric Button
  sosOuterRing: {
    width: 215,
    height: 215,
    borderRadius: 107.5,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  sosButton: {
    width: 195,
    height: 195,
    borderRadius: 97.5,
    backgroundColor: '#C50000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 15,
  },
  sosTitle: {
    fontSize: 52,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  sosSub: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    marginTop: -2,
  },

  // Target Card Styling
  cardContainer: {
    width: '100%',
    gap: 15,
  },
  fullCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    borderRadius: 24,
    height: 125, 
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  halfCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 15,
  },
  halfCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    height: 110,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  iconCircleBlue: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#053E85',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111111',
    marginLeft: 15, 
  },
  cardTextSmall: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
    textAlign: 'center',
    marginTop: 8,
  },

  // Cancel Area Styling
  cancelButton: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  cancelText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
});
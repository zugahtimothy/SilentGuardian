import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
  Modal
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Custom imports
import CustomTabBar from '../components/CustomTabBar'; 
import SosActiveScreen from './SosActiveScreen';
import SecurityActiveScreen from './SecurityActiveScreen'; 
import MedicalActiveScreen from './MedicalActiveScreen'; 
import TrustedContactsActiveScreen from './TrustedContactsActiveScreen';

const { width } = Dimensions.get('window');
const SAFETY_OVERLAY_HEIGHT = width * (268 / 712); 

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isSosActive, setIsSosActive] = useState(false);
  
  // Controls which view to display inside the Emergency Modal: 'choices', 'security', or 'medical'
  const [sosView, setSosView] = useState('choices');

  // Called when the red SOS button is pressed on the main Home screen
  const handleStartSos = () => {
    setSosView('choices'); // Reset to the selection screen
    setIsSosActive(true);
  };

  const renderModalContent = () => {
  switch (sosView) {
    case 'security':
      return <SecurityActiveScreen onBack={() => setSosView('choices')} />;
    case 'medical':
      return <MedicalActiveScreen onBack={() => setSosView('choices')} />;
    case 'contacts':
      return (
        <TrustedContactsActiveScreen 
          onBack={() => setSosView('choices')} 
          onResolve={() => setIsSosActive(false)} // Closes out the emergency state completely
        />
      );
    case 'choices':
    default:
      return (
        <SosActiveScreen 
          onCancel={() => setIsSosActive(false)} 
          onSelectSecurity={() => setSosView('security')}
          onSelectMedical={() => setSosView('medical')}
          onSelectContacts={() => setSosView('contacts')} // New trigger hooked up!
        />
      );
  }
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
          <View style={styles.userInfo}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80' }} 
              style={styles.avatar}
            />
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeText} numberOfLines={2}>
                Welcome!{'\n'}
                <Text style={styles.userName}>Timothy 👋</Text>
              </Text>
              <Text style={styles.subWelcomeText}>Your safety is our priority</Text>
            </View>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <Ionicons name="notifications" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <Ionicons name="settings" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= HERO IMAGE SECTION ================= */}
        <View style={styles.heroContainer}>
          <Image
            source={require('../../assets/knust-entrance.jpg')} 
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* ================= SOS TRIGGER SECTION ================= */}
        <View style={styles.sosSection}>
          <TouchableOpacity 
            activeOpacity={0.9} 
            style={styles.sosButtonShadow}
            onPress={handleStartSos}
          >
            <LinearGradient
              colors={['#A80000', '#7A0000']} 
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.sosButton}
            >
              <MaterialCommunityIcons name="bell-ring" size={26} color="#FFD700" style={styles.sosIcon} />
              <Text style={styles.sosText}>SOS</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.sosSubtext}>Tap in Emergency</Text>
        </View>

        {/* ================= EXPLORE FEATURES SECTION ================= */}
        <View style={styles.exploreSection}>
          <Text style={styles.sectionTitle}>Explore Features</Text>
          
          <TouchableOpacity activeOpacity={0.95} style={styles.safetyCard}>
            <Image
              source={require('../../assets/section-explore.png')} 
              style={styles.cardBgImage}
              resizeMode="cover"
            />

            <View style={styles.glassWrapper}>
              <Image 
                source={require('../../assets/background-safety.png')}
                style={StyleSheet.absoluteFillObject}
                resizeMode="stretch"
              />
              
              <View style={styles.glassContent}>
                <Image 
                  source={require('../../assets/shield-group.png')}
                  style={styles.shieldAsset}
                  resizeMode="contain"
                />
                
                <View style={styles.glassTextWrapper}>
                  <Text style={styles.glassTitle}>Safety</Text>
                  <Text style={styles.glassSubtitle}>
                    Protection powered by{'\n'}your location
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* ================= REUSABLE BOTTOM TAB NAVIGATION ================= */}
      <CustomTabBar 
        activeTab={activeTab} 
        onTabPress={(tabId) => setActiveTab(tabId)} 
      />

      {/* ================= ACTIVE EMERGENCY OVERLAY MODAL ================= */}
      <Modal
        visible={isSosActive}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsSosActive(false)}
      >
        {renderModalContent()}
      </Modal>

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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  welcomeTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#4A4A4A',
    lineHeight: 22,
  },
  userName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    color: '#0D4E96',
  },
  subWelcomeText: {
    fontSize: 13,
    color: '#7F8C8D',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
    flexShrink: 0,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#053E85',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContainer: {
    width: '100%',
    height: 230,
    position: 'relative',
    overflow: 'hidden',
    marginTop: 5,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  sosSection: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 20,
  },
  sosButtonShadow: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  sosButton: {
    flexDirection: 'row',
    width: 160,
    height: 52,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  sosIcon: {
    marginRight: 8,
  },
  sosText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  sosSubtext: {
    fontSize: 18,
    color: '#111111',
    fontWeight: '500',
    marginTop: 10,
  },
  exploreSection: {
    marginTop: 10,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  safetyCard: {
    width: '100%',
    height: 220,
    position: 'relative',
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
  },
  cardBgImage: {
    width: '100%',
    height: '100%',
  },
  glassWrapper: {
    position: 'absolute',
    bottom: '8%', 
    alignSelf: 'center', 
    width: '86%', 
    height: SAFETY_OVERLAY_HEIGHT,
  },
  glassContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  shieldAsset: {
    width: 80, 
    height: 95, 
    marginTop: -12, 
  },
  glassTextWrapper: {
    marginLeft: 12,
    flex: 1,
    justifyContent: 'center',
  },
  glassTitle: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 30,
    color: '#222222',
    lineHeight: 34,
  },
  glassSubtitle: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    color: '#333333',
    lineHeight: 18,
    marginTop: 2,
  },
});
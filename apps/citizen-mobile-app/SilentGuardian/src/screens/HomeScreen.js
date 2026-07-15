import React from 'react';
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
  Platform
} from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Precise calculations for the full-width edge-to-edge banner
const SAFETY_OVERLAY_WIDTH = width; // 100% of the screen width
const SAFETY_OVERLAY_HEIGHT = SAFETY_OVERLAY_WIDTH * (268 / 712); // Locks the 712x268 ratio perfectly

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Main Scrollable Content */}
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

        {/* ================= HERO IMAGE SECTION (KNUST ENTRANCE) ================= */}
        <View style={styles.heroContainer}>
          <Image
            source={require('../../assets/knust-entrance.jpg')} 
            style={styles.heroImage}
            resizeMode="cover"
          />
          {/* Custom Indicator Dots Overlaid on Hero Image */}
          <View style={styles.indicatorContainer}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* ================= SOS TRIGGER SECTION ================= */}
        <View style={styles.sosSection}>
          <TouchableOpacity activeOpacity={0.9} style={styles.sosButtonShadow}>
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
          {/* Section title is padded to match alignment */}
          <Text style={styles.sectionTitle}>Explore Features</Text>
          
          {/* Card stretches 100% full-width flush to screen edges */}
          <TouchableOpacity activeOpacity={0.95} style={styles.safetyCard}>
            {/* Background image: section-explore.jpg */}
            <Image
              source={require('../../assets/section-explore.png')} 
              style={styles.cardBgImage}
              resizeMode="cover"
            />

            {/* Safety Pill Overlay: background-safety.png stretching 100% wide */}
            <View style={styles.glassWrapper}>
              <Image 
                source={require('../../assets/background-safety.png')}
                style={StyleSheet.absoluteFillObject}
                resizeMode="stretch"
              />
              
              <View style={styles.glassContent}>
                {/* Shield Group: shield-group.png */}
                <Image 
                  source={require('../../assets/shield-group.png')}
                  style={styles.shieldAsset}
                  resizeMode="contain"
                />
                
                {/* Text Layout */}
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

      {/* ================= BOTTOM TAB NAVIGATION ================= */}
      <View style={styles.navBarWrapper}>
        <View style={styles.navBar}>
          {/* Home Tab (Active) */}
          <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
            <View style={styles.activeTabCircle}>
              <Image 
                source={require('../../assets/home-icon-1.png')} 
                style={styles.navIconActive} 
                resizeMode="contain"
              />
            </View>
            <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
          </TouchableOpacity>

          {/* Reports Tab */}
          <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
            <Image 
              source={require('../../assets/reports-icon.png')} 
              style={styles.navIcon} 
              resizeMode="contain"
            />
            <Text style={styles.navText}>Reports</Text>
          </TouchableOpacity>

          {/* Share Location Tab */}
          <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
            <Image 
              source={require('../../assets/share-location-icon.png')} 
              style={styles.navIcon} 
              resizeMode="contain"
            />
            <Text style={styles.navText}>Share location</Text>
          </TouchableOpacity>

          {/* Call Security Tab */}
          <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
            <Image 
              source={require('../../assets/call-security-icon.png')} 
              style={styles.navIcon} 
              resizeMode="contain"
            />
            <Text style={styles.navText}>Call Security</Text>
          </TouchableOpacity>

          {/* Recent Alert Tab */}
          <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
            <Image 
              source={require('../../assets/recents.png')} 
              style={styles.navIcon} 
              resizeMode="contain"
            />
            <Text style={styles.navText}>Recent Alert</Text>
          </TouchableOpacity>
        </View>
      </View>
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

  // Header Styling
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

  // Hero Section
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
  indicatorContainer: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 5,
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6C7A89',
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000000',
  },

  // SOS Section
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

  // Explore Section
  exploreSection: {
    marginTop: 10,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
    paddingHorizontal: 20, // Keeps the title aligned nicely with the other components
  },
  safetyCard: {
    width: '100%',
    height: 220,
    position: 'relative',
    backgroundColor: '#EAEAEA',
  },
  cardBgImage: {
    width: '100%',
    height: '100%',
  },
  glassWrapper: {
    position: 'absolute',
    bottom: 20, 
    left: 30, 
    right: 0, 
    height: SAFETY_OVERLAY_HEIGHT, // Perfect aspect-ratio scaling across screen widths
  },
  glassContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  shieldAsset: {
    width: 86, 
    height: 103, // Visually balanced ratio based on the 122x146 design specs
    marginTop: -32, // Sits beautifully overlapping the top line of the overlay banner
  },
  glassTextWrapper: {
    marginLeft: 15,
    flex: 1,
    justifyContent: 'center',
  },
  glassTitle: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 32,
    color: '#222222',
    lineHeight: 36,
  },
  glassSubtitle: {
    fontFamily: 'Poppins-Light',
    fontSize: 15,
    color: '#333333',
    lineHeight: 18,
    marginTop: 2,
  },

  // Bottom Nav Dock
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
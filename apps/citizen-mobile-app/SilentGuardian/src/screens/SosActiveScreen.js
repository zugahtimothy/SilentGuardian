import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function SosActiveScreen({ onCancel, onSelectSecurity, onSelectMedical, onSelectContacts }) {
  // SOS Workflow Steps: 'HOME' | 'CONFIRM' | 'COUNTDOWN' | 'ACTIVATED' | 'DISPATCHED'
  const [sosStep, setSosStep] = useState('HOME');
  const [countdown, setCountdown] = useState(3);

  // Countdown timer logic for Screen 2 -> Screen 3
  useEffect(() => {
    let timer;
    if (sosStep === 'COUNTDOWN') {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      } else {
        setSosStep('ACTIVATED');
      }
    }
    return () => clearTimeout(timer);
  }, [sosStep, countdown]);

  // Auto-transition from Screen 3 (ACTIVATED) -> Screen 4 (DISPATCHED) after actions complete
  useEffect(() => {
    let dispatchTimer;
    if (sosStep === 'ACTIVATED') {
      dispatchTimer = setTimeout(() => {
        setSosStep('DISPATCHED');
      }, 3000);
    }
    return () => clearTimeout(dispatchTimer);
  }, [sosStep]);

  // Reset to Home/Default state
  const handleReset = () => {
    setSosStep('HOME');
    setCountdown(3);
  };

  // Back Arrow Handler
  const handleBackPress = () => {
    if (sosStep === 'HOME') {
      if (onCancel) onCancel();
    } else if (sosStep === 'CONFIRM') {
      setSosStep('HOME');
    } else {
      handleReset();
    }
  };

  /* =========================================================================
     STEP 1: CONFIRMATION SCREEN (Emergency SOS - Are you in danger?)
     ========================================================================= */
  if (sosStep === 'CONFIRM') {
    return (
      <SafeAreaView style={styles.whiteScreenContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Header */}
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={handleBackPress} style={styles.headerBackButton}>
            <Ionicons name="chevron-back" size={28} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.topHeaderTitle}>sos</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.contentCenter}>
          {/* Bell Siren Icon Circle */}
          <View style={styles.sirenOuterRing}>
            <View style={styles.sirenInnerCircle}>
              <FontAwesome name="bell" size={72} color="#FBBF24" />
            </View>
          </View>

          <Text style={styles.confirmTitle}>Emergency SOS</Text>
          <Text style={styles.confirmSubtitle}>Are you in danger?</Text>
        </View>

        {/* Bottom Actions Stack */}
        <View style={styles.bottomActionStack}>
          <TouchableOpacity 
            style={styles.redPrimaryButton} 
            activeOpacity={0.85}
            onPress={() => {
              setCountdown(3);
              setSosStep('COUNTDOWN');
            }}
          >
            <Text style={styles.redPrimaryButtonText}>Activate SOS</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.whiteOutlineButton} 
            activeOpacity={0.7}
            onPress={handleReset}
          >
            <Text style={styles.whiteOutlineButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  /* =========================================================================
     STEP 2: COUNTDOWN SCREEN (3... 2... 1...)
     ========================================================================= */
  if (sosStep === 'COUNTDOWN') {
    return (
      <SafeAreaView style={styles.whiteScreenContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Header */}
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={handleBackPress} style={styles.headerBackButton}>
            <Ionicons name="chevron-back" size={28} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.topHeaderTitle}>sos</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.contentCenter}>
          <Text style={styles.countdownHeading}>SOS will be activated</Text>

          {/* Countdown Ring */}
          <View style={styles.countdownRingOuter}>
            <Text style={styles.countdownNumber}>{countdown}</Text>
          </View>

          <Text style={styles.countdownSublabel}>seconds</Text>
        </View>

        {/* Bottom Cancel Action */}
        <View style={styles.bottomActionStack}>
          <TouchableOpacity 
            style={styles.whiteOutlineButton} 
            activeOpacity={0.7}
            onPress={handleReset}
          >
            <Text style={styles.whiteOutlineButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  /* =========================================================================
     STEP 3: ACTIVATED SCREEN (Sharing location, Calling Security, etc.)
     ========================================================================= */
  if (sosStep === 'ACTIVATED') {
    return (
      <SafeAreaView style={styles.whiteScreenContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Header */}
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={handleBackPress} style={styles.headerBackButton}>
            <Ionicons name="chevron-back" size={28} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.topHeaderTitle}>sos</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={[styles.contentCenter, { alignItems: 'flex-start', paddingHorizontal: 30 }]}>
          <Text style={[styles.confirmTitle, { alignSelf: 'center', marginBottom: 40 }]}>
            SOS Activated
          </Text>

          {/* Checklist */}
          <View style={styles.checklistContainer}>
            <View style={styles.checkRow}>
              <Ionicons name="checkmark-circle-outline" size={32} color="#16A34A" />
              <Text style={styles.checkText}>Sharing location......</Text>
            </View>

            <View style={styles.checkRow}>
              <Ionicons name="checkmark-circle-outline" size={32} color="#16A34A" />
              <Text style={styles.checkText}>Calling Campus Security ......</Text>
            </View>

            <View style={styles.checkRow}>
              <Ionicons name="checkmark-circle-outline" size={32} color="#16A34A" />
              <Text style={styles.checkText}>Sending emergency SMS ......</Text>
            </View>

            <View style={styles.checkRow}>
              <Ionicons name="checkmark-circle-outline" size={32} color="#16A34A" />
              <Text style={styles.checkText}>Recording audio......</Text>
            </View>
          </View>
        </View>

        {/* Bottom Action */}
        <View style={styles.bottomActionStack}>
          <TouchableOpacity 
            style={styles.redPrimaryButton} 
            activeOpacity={0.85}
            onPress={handleReset}
          >
            <Text style={styles.redPrimaryButtonText}>Cancel SOS</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  /* =========================================================================
     STEP 4: DISPATCHED SCREEN (Officer Kwame is on the way!)
     ========================================================================= */
  if (sosStep === 'DISPATCHED') {
    return (
      <SafeAreaView style={styles.whiteScreenContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Header */}
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={handleBackPress} style={styles.headerBackButton}>
            <Ionicons name="chevron-back" size={28} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.topHeaderTitle}>sos</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.contentCenter}>
          {/* Shield Asset Image */}
          <Image 
            source={require('../../assets/stash-shield.png')} 
            style={styles.shieldImage}
            resizeMode="contain"
          />

          <Text style={styles.dispatchHeadline}>Help is on the way !</Text>
          <Text style={styles.officerName}>Officer Kwame</Text>
          <Text style={styles.officerSub}>is on the way</Text>

          <Text style={styles.etaText}>ETA : 3 mins</Text>
        </View>

        {/* Bottom Action Stack */}
        <View style={styles.bottomActionStack}>
          <TouchableOpacity 
            style={styles.bluePrimaryButton} 
            activeOpacity={0.85}
            onPress={handleReset}
          >
            <Text style={styles.bluePrimaryButtonText}>View on Map</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.redOutlineButton} 
            activeOpacity={0.7}
            onPress={() => alert('Update sent to Security Desk')}
          >
            <Text style={styles.redOutlineButtonText}>Send Update</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  /* =========================================================================
     DEFAULT STEP: HOME DASHBOARD
     ========================================================================= */
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* 1. Background Image of the Siren/Ceiling Light */}
      <ImageBackground
        source={require('../../assets/emergency-background.jpg')} 
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      >
        {/* 2. Transparent overlay */}
        <View style={styles.blueOverlay}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.mainContent}>
              
              {/* HEADER */}
              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                  Hello, Timothy <Text style={styles.waveEmoji}>👋</Text>
                </Text>
              </View>

              {/* CIRCULAR SOS TRIGGER */}
              <View style={styles.sosOuterRing}>
                <TouchableOpacity 
                  activeOpacity={0.9} 
                  style={styles.sosButton}
                  onPress={() => setSosStep('CONFIRM')}
                >
                  <Text style={styles.sosTitle}>SOS</Text>
                  <Text style={styles.sosSub}>Tap for help!</Text>
                </TouchableOpacity>
              </View>

              {/* RECIPIENT CHOICES */}
              <View style={styles.cardContainer}>
                {/* 1. Security Team (Full Width Card) */}
                <TouchableOpacity style={styles.fullCard} activeOpacity={0.9} onPress={onSelectSecurity}>
                  <View style={styles.iconCircleBlue}>
                    <FontAwesome5 name="user-shield" size={24} color="#FFFFFF" />
                  </View>
                  <Text style={styles.cardText}>Security Team</Text>
                </TouchableOpacity>

                {/* 2. Side-by-Side Double Column Cards */}
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

              {/* CANCEL BUTTON */}
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
    paddingBottom: 20,
  },
  
  // Dashboard Header
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

  // Recipient Cards
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

  // Cancel Button
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

  // =========================================================================
  // SHARED STYLES FOR STEPS 1-4 (White Background screens)
  // =========================================================================
  whiteScreenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headerBackButton: {
    padding: 4,
  },
  topHeaderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#053E85',
    textTransform: 'lowercase',
  },
  contentCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Screen 1: Confirmation
  sirenOuterRing: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  sirenInnerCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 6,
  },
  confirmSubtitle: {
    fontSize: 16,
    color: '#4B5563',
  },

  // Screen 2: Countdown
  countdownHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 50,
  },
  countdownRingOuter: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 6,
    borderColor: '#FCA5A5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  countdownNumber: {
    fontSize: 90,
    fontWeight: 'bold',
    color: '#B91C1C',
  },
  countdownSublabel: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },

  // Screen 3: Checklist
  checklistContainer: {
    gap: 22,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  checkText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },

  // Screen 4: Dispatched Officer
  shieldImage: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  dispatchHeadline: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#991B1B',
    marginBottom: 6,
  },
  officerName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#854D0E',
  },
  officerSub: {
    fontSize: 15,
    color: '#854D0E',
    marginTop: 2,
    marginBottom: 25,
  },
  etaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#034575',
  },

  // Action Buttons Stack (Matching rounded rectangle design)
  bottomActionStack: {
    width: '100%',
    gap: 12,
    marginBottom: 10,
  },
  redPrimaryButton: {
    backgroundColor: '#CD2121',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redPrimaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bluePrimaryButton: {
    backgroundColor: '#034575',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bluePrimaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  whiteOutlineButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#6B7280',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteOutlineButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  redOutlineButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#991B1B',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redOutlineButtonText: {
    color: '#991B1B',
    fontSize: 16,
    fontWeight: '600',
  },
});
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';

export default function HomeScreen() {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [emergencyType, setEmergencyType] = useState('Security'); // Security or Medical
  const [scaleValue] = useState(new Animated.Value(1));

  const triggerSOS = () => {
    if (!isEmergencyActive) {
      // Start pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue, { toValue: 1.1, duration: 600, useNativeDriver: true }),
          Animated.timing(scaleValue, { toValue: 1, duration: 600, useNativeDriver: true }),
        ])
      ).start();
      
      setIsEmergencyActive(true);
      console.log(`🚨 SOS DISPATCHED: Type: ${emergencyType}. Fetching coordinates...`);
    } else {
      // Cancel SOS state
      scaleValue.setValue(1);
      setIsEmergencyActive(false);
      console.log('✅ Emergency cancelled by user.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <Text style={styles.headerTitle}>Silent Guardian</Text>
      <Text style={styles.headerSubtitle}>
        {isEmergencyActive ? 'HELP IS ON THE WAY' : 'System Ready • Secure Connection'}
      </Text>

      {/* Emergency Mode Toggles (Hidden when SOS is live to prevent distraction) */}
      {!isEmergencyActive && (
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleButton, emergencyType === 'Security' && styles.activeSecurityToggle]}
            onPress={() => setEmergencyType('Security')}
          >
            <Text style={[styles.toggleText, emergencyType === 'Security' && styles.activeToggleText]}>🛡️ Security</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.toggleButton, emergencyType === 'Medical' && styles.activeMedicalToggle]}
            onPress={() => setEmergencyType('Medical')}
          >
            <Text style={[styles.toggleText, emergencyType === 'Medical' && styles.activeToggleText]}>❤️ Medical</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Massive Central Panic Button */}
      <View style={styles.buttonOuterRing}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity 
            style={[
              styles.panicButton, 
              isEmergencyActive ? styles.buttonActiveMode : (emergencyType === 'Medical' ? styles.buttonMedicalMode : styles.buttonSecurityMode)
            ]} 
            onPress={triggerSOS}
            activeOpacity={0.8}
          >
            <Text style={styles.panicButtonText}>
              {isEmergencyActive ? 'CANCEL\nSOS' : 'TAP TO\nSIGNAL'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Live Status Board */}
      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>CURRENT STATUS</Text>
        <Text style={[styles.statusValue, isEmergencyActive ? styles.statusAlertMode : styles.statusSafeMode]}>
          {isEmergencyActive ? '📡 Broadcasting GPS & Alerting Responders...' : '🟢 Safe & Monitored'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111214', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 60, paddingHorizontal: 24 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#FFF', letterSpacing: 0.5 },
  headerSubtitle: { fontSize: 14, color: '#8E8E93', marginTop: 4, fontWeight: '500', textTransform: 'uppercase' },
  
  toggleContainer: { flexDirection: 'row', backgroundColor: '#1C1C1E', borderRadius: 12, padding: 4, width: '100%', marginTop: 20 },
  toggleButton: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 10 },
  toggleText: { fontSize: 16, color: '#AEAEB2', fontWeight: '600' },
  activeSecurityToggle: { backgroundColor: '#3A3A3C' },
  activeMedicalToggle: { backgroundColor: '#3A3A3C' },
  activeToggleText: { color: '#FFF' },

  buttonOuterRing: { width: 260, height: 260, borderRadius: 130, backgroundColor: 'rgba(255, 255, 255, 0.03)', alignItems: 'center', justifyContent: 'center' },
  panicButton: { width: 220, height: 220, borderRadius: 110, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.5, shadowRadius: 12, elevation: 10 },
  buttonSecurityMode: { backgroundColor: '#E63946' },
  buttonMedicalMode: { backgroundColor: '#007AFF' },
  buttonActiveMode: { backgroundColor: '#1C1C1E', borderWidth: 3, borderColor: '#FF453A' },
  panicButtonText: { color: '#FFF', fontSize: 22, fontWeight: '900', textAlign: 'center', letterSpacing: 1, lineHeight: 28 },

  statusCard: { backgroundColor: '#1C1C1E', width: '100%', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#2C2C2E' },
  statusLabel: { fontSize: 12, color: '#8E8E93', fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
  statusValue: { fontSize: 15, fontWeight: '600', lineHeight: 20 },
  statusSafeMode: { color: '#30D158' },
  statusAlertMode: { color: '#FF453A' }
});
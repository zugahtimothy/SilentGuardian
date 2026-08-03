import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function CallSecurityScreen({ navigation }) {
  // Main emergency campus security number
  const campusSecurityNumber = '0241234567';

  // List of other emergency service numbers
  const otherNumbers = [
    {
      id: 'clinic',
      title: 'Campus Clinic',
      number: '024 123 4567',
      rawNumber: '0241234567',
      icon: 'hospital-building',
      iconType: 'mci',
      bgColor: '#E2E8F0',
      iconColor: '#053E85',
    },
    {
      id: 'police',
      title: 'Police',
      number: '191',
      rawNumber: '191',
      icon: 'police-badge',
      iconType: 'mci',
      bgColor: '#053E85',
      iconColor: '#FFFFFF',
    },
    {
      id: 'fire',
      title: 'Fire Service',
      number: '192',
      rawNumber: '192',
      icon: 'fire',
      iconType: 'mci',
      bgColor: '#FF9800',
      iconColor: '#FFFFFF',
    },
    {
      id: 'ambulance',
      title: 'Ambulance',
      number: '193',
      rawNumber: '193',
      icon: 'ambulance',
      iconType: 'fa5',
      bgColor: '#E53935',
      iconColor: '#FFFFFF',
    },
  ];

  // Utility to trigger native phone call prompt
  const handleMakeCall = (phoneNumber, name) => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Phone Call Not Supported', `Cannot place calls on this device to ${phoneNumber}`);
        } else {
          return Linking.openURL(phoneUrl);
        }
      })
      .catch((err) => console.error('An error occurred calling number:', err));
  };

  const renderItemIcon = (item) => {
    if (item.iconType === 'mci') {
      return <MaterialCommunityIcons name={item.icon} size={22} color={item.iconColor} />;
    }
    return <FontAwesome5 name={item.icon} size={18} color={item.iconColor} />;
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
        <Text style={styles.headerTitle}>Call Security</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Prominent Red Emergency Call Card */}
        <View style={styles.emergencyCard}>
          <Text style={styles.emergencyTitle}>Emergency Call</Text>
          <Text style={styles.emergencySubtext}>Get help from campus security</Text>

          <TouchableOpacity
            style={styles.mainCallButton}
            activeOpacity={0.85}
            onPress={() => handleMakeCall(campusSecurityNumber, 'Campus Security')}
          >
            <Ionicons name="call" size={22} color="#FFFFFF" style={styles.callIcon} />
            <Text style={styles.mainCallButtonText}>Call Campus Security</Text>
          </TouchableOpacity>
        </View>

        {/* Other Emergency Numbers List Card */}
        <Text style={styles.sectionTitle}>Other Numbers</Text>
        <View style={styles.numbersCard}>
          {otherNumbers.map((item, index) => (
            <React.Fragment key={item.id}>
              <View style={styles.numberRow}>
                <View style={styles.numberLeft}>
                  <View style={[styles.iconCircle, { backgroundColor: item.bgColor }]}>
                    {renderItemIcon(item)}
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemNumber}>{item.number}</Text>
                  </View>
                </View>

                {/* Call Action Trigger */}
                <TouchableOpacity
                  style={styles.callIconButton}
                  activeOpacity={0.7}
                  onPress={() => handleMakeCall(item.rawNumber, item.title)}
                >
                  <Ionicons name="call-outline" size={22} color="#000000" />
                </TouchableOpacity>
              </View>

              {/* Divider for all except last item */}
              {index < otherNumbers.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>

        {/* Live Chat Banner */}
        <TouchableOpacity
          style={styles.chatBanner}
          activeOpacity={0.8}
          onPress={() => {
            Alert.alert('Live Chat', 'Connecting to security dispatch chat...');
          }}
        >
          <View style={styles.chatTextContainer}>
            <Text style={styles.chatTitle}>Live chat</Text>
            <Text style={styles.chatSubtext}>Chat with security now</Text>
          </View>

          <View style={styles.chatRightContainer}>
            <View style={styles.chatIconBadge}>
              <Ionicons name="chatbubble" size={16} color="#FFFFFF" />
            </View>
            <Ionicons name="chevron-forward" size={18} color="#053E85" style={{ marginLeft: 8 }} />
          </View>
        </TouchableOpacity>
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
    paddingBottom: 100, // Room for bottom tab bar dock
  },
  emergencyCard: {
    backgroundColor: '#FDE8E8',
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E53935',
    marginBottom: 4,
  },
  emergencySubtext: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 18,
  },
  mainCallButton: {
    backgroundColor: '#FF2A2A',
    borderRadius: 14,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#FF2A2A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  callIcon: {
    marginRight: 10,
  },
  mainCallButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
    marginBottom: 12,
  },
  numbersCard: {
    borderWidth: 1.5,
    borderColor: '#0070F3',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  numberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  numberLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  textContainer: {
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  itemNumber: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
    fontWeight: '500',
  },
  callIconButton: {
    padding: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  chatBanner: {
    backgroundColor: '#C5D8F6',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  chatTextContainer: {
    flex: 1,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#053E85',
  },
  chatSubtext: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
  },
  chatRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#053E85',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
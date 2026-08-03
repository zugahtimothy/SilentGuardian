import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const profileDetails = [
    {
      id: 'email',
      label: 'Email',
      value: 'timothy@student.knust.edu.gh',
    },
    {
      id: 'phone',
      label: 'Phone',
      value: '+233 24 123 4567',
    },
    {
      id: 'residence',
      label: 'Residence',
      value: 'Unity Hall',
    },
    {
      id: 'bloodGroup',
      label: 'Blood Group',
      value: 'O+',
    },
    {
      id: 'emergencyContact',
      label: 'Emergency Contact',
      value: 'Mother - +233 24 987 6543',
    },
  ];

  const handleEditDetail = (detail) => {
    Alert.alert(`Edit ${detail.label}`, `Modify ${detail.value}`);
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
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card / Avatar */}
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80' }}
            style={styles.avatar}
          />
          <View style={styles.profileTextInfo}>
            <Text style={styles.userName}>Timothy</Text>
            <Text style={styles.userDept}>Computer Science</Text>
            <Text style={styles.userId}>Student ID: 219104532</Text>
          </View>
        </View>

        {/* Profile Details List */}
        <View style={styles.detailsList}>
          {profileDetails.map((item, index) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity
                style={styles.detailRow}
                activeOpacity={0.7}
                onPress={() => handleEditDetail(item)}
              >
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>{item.label}</Text>
                  <Text style={styles.detailValue}>{item.value}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#B0B0B0" />
              </TouchableOpacity>

              {index < profileDetails.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
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
    paddingBottom: 20,
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
    paddingBottom: 100,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileTextInfo: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  userDept: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 2,
  },
  userId: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 1,
  },
  detailsList: {
    marginTop: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  detailValue: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 3,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
  },
});
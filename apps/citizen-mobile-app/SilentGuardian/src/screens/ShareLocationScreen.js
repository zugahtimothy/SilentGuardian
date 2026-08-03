import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';

export default function ShareLocationScreen({ navigation }) {
  // Initial region defaulted to KNUST / Kotei coordinates
  const [region, setRegion] = useState({
    latitude: 6.6749,
    longitude: -1.5716,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState('30min');

  const [recipients, setRecipients] = useState({
    campusSecurity: true,
    emergencyContacts: true,
    friends: false,
  });

  const durationOptions = [
    { id: '15min', label: '15min' },
    { id: '30min', label: '30min' },
    { id: '1hour', label: '1 hour' },
    { id: 'untilStop', label: 'Until i stop' },
  ];

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  const fetchCurrentLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please allow location access to share coordinates.');
        setLoading(false);
        return;
      }

      // 1. Force HIGHEST accuracy level (utilizes hardware GPS chip for precise Kotei spot)
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      if (currentLocation && currentLocation.coords) {
        const { latitude, longitude } = currentLocation.coords;

        setLocation({ latitude, longitude });

        // Update map camera view to pinpoint exact user spot
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        });

        // 2. Reverse geocode precise address
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (reverseGeocode && reverseGeocode.length > 0) {
          setAddress(reverseGeocode[0]);
        }
      }
    } catch (error) {
      console.warn('Location fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRecipient = (key) => {
    setRecipients((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleShareToggle = () => {
    if (!isSharing) {
      setIsSharing(true);
      Alert.alert(
        'Location Sharing Active',
        `Live location is now being broadcast for ${selectedDuration}.`
      );
    } else {
      setIsSharing(false);
      Alert.alert('Location Sharing Stopped', 'Live location broadcast ended.');
    }
  };

  const getLocationTitle = () => {
    if (address) {
      // Prioritize precise subregion/district or street name
      return address.district || address.name || address.street || 'Kotei';
    }
    return 'Kotei';
  };

  const getLocationSubtext = () => {
    if (address) {
      const sub = address.subregion || address.city || 'Kumasi';
      const reg = address.region || 'Ashanti';
      return `${sub} , ${reg}`;
    }
    return 'Kumasi , Ashanti';
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
        <Text style={styles.headerTitle}>Share Location</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={fetchCurrentLocation}>
          <Ionicons name="refresh" size={20} color="#053E85" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Location Card */}
        <View style={styles.locationCard}>
          <View style={styles.locationHeader}>
            <Text style={styles.locationLabel}>Current Location</Text>
            
            {loading ? (
              <ActivityIndicator color="#053E85" size="small" style={{ marginVertical: 8 }} />
            ) : (
              <>
                <Text style={styles.locationName}>{getLocationTitle()}</Text>
                <Text style={styles.locationSubName}>{getLocationSubtext()}</Text>
              </>
            )}

            <View style={styles.statusRow}>
              <View style={[styles.greenDot, isSharing && styles.pulsingDot]} />
              <Text style={styles.statusText}>
                {isSharing ? 'Live Broadcasting Active' : 'Updated. Just Now'}
              </Text>
            </View>
          </View>

          {/* Interactive Map View */}
          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_DEFAULT}
              style={styles.mapView}
              region={region}
              scrollEnabled={true} // Keeps view focused nicely inside card
              zoomEnabled={true}
              pitchEnabled={true}
              rotateEnabled={true}
              showsUserLocation={true}
            >
              {location && (
                <Marker 
                  coordinate={location}
                  title="Current Position"
                  description={getLocationTitle()}
                />
              )}
            </MapView>

            {location && (
              <View style={styles.coordsBadge}>
                <Text style={styles.coordsText}>
                  {location.latitude.toFixed(4)}°, {location.longitude.toFixed(4)}°
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Share Duration Section */}
        <Text style={styles.sectionTitle}>Share for</Text>
        <View style={styles.durationRow}>
          {durationOptions.map((item) => {
            const isSelected = selectedDuration === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.durationPill,
                  isSelected ? styles.durationPillActive : styles.durationPillInactive,
                ]}
                activeOpacity={0.8}
                onPress={() => setSelectedDuration(item.id)}
              >
                <Text
                  style={[
                    styles.durationText,
                    isSelected ? styles.durationTextActive : styles.durationTextInactive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Share With Section */}
        <Text style={styles.sectionTitle}>Share with</Text>
        <View style={styles.recipientsCard}>
          <TouchableOpacity
            style={styles.recipientRow}
            activeOpacity={0.7}
            onPress={() => toggleRecipient('campusSecurity')}
          >
            <Text style={styles.recipientText}>Campus Security</Text>
            <Ionicons
              name={recipients.campusSecurity ? 'checkbox' : 'square-outline'}
              size={24}
              color={recipients.campusSecurity ? '#053E85' : '#B0B0B0'}
            />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.recipientRow}
            activeOpacity={0.7}
            onPress={() => toggleRecipient('emergencyContacts')}
          >
            <Text style={styles.recipientText}>Emergency Contacts</Text>
            <Ionicons
              name={recipients.emergencyContacts ? 'checkbox' : 'square-outline'}
              size={24}
              color={recipients.emergencyContacts ? '#053E85' : '#B0B0B0'}
            />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.recipientRow}
            activeOpacity={0.7}
            onPress={() => toggleRecipient('friends')}
          >
            <Text style={styles.recipientText}>Friends</Text>
            <Ionicons
              name={recipients.friends ? 'checkbox' : 'square-outline'}
              size={24}
              color={recipients.friends ? '#053E85' : '#B0B0B0'}
            />
          </TouchableOpacity>
        </View>

        {/* Action Button */}
        <TouchableOpacity 
          style={[styles.shareButton, isSharing && styles.stopButton]} 
          activeOpacity={0.85}
          onPress={handleShareToggle}
        >
          <Ionicons 
            name={isSharing ? "stop-circle-outline" : "location-sharp"} 
            size={22} 
            color="#FFFFFF" 
            style={styles.btnIcon} 
          />
          <Text style={styles.shareButtonText}>
            {isSharing ? 'Stop Location Sharing' : 'Share Live Location'}
          </Text>
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
  refreshButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#053E85',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  locationCard: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
  },
  locationHeader: {
    padding: 16,
  },
  locationLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '600',
    marginBottom: 4,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  locationSubName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  pulsingDot: {
    backgroundColor: '#059669',
  },
  statusText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  mapContainer: {
    height: 160,
    position: 'relative',
  },
  mapView: {
    width: '100%',
    height: '100%',
  },
  coordsBadge: {
    position: 'absolute',
    bottom: 8,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  coordsText: {
    fontSize: 11,
    color: '#1E293B',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginTop: 18,
    marginBottom: 12,
  },
  durationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  durationPill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#053E85',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
  },
  durationPillActive: {
    backgroundColor: '#053E85',
  },
  durationPillInactive: {
    backgroundColor: '#FFFFFF',
  },
  durationText: {
    fontSize: 12,
    fontWeight: '600',
  },
  durationTextActive: {
    color: '#FFFFFF',
  },
  durationTextInactive: {
    color: '#111827',
  },
  recipientsCard: {
    borderWidth: 1.5,
    borderColor: '#053E85',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  recipientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  recipientText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  shareButton: {
    backgroundColor: '#053E85',
    borderRadius: 28,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
    elevation: 4,
  },
  stopButton: {
    backgroundColor: '#DC2626',
  },
  btnIcon: {
    marginRight: 8,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
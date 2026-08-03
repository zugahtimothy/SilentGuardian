import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function RecentAlertsScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filterOptions = ['All', 'Emergency', 'Warning', 'Info'];

  const alertsData = [
    {
      id: '1',
      title: 'Robbery Reported',
      subtitle: 'New Engineering Block',
      time: '5 mins ago',
      category: 'Emergency',
      icon: 'lightning-bolt-outline',
      iconType: 'mci',
      iconColor: '#5269FF',
      bgColor: '#EBEFFE',
      badge: true,
    },
    {
      id: '2',
      title: 'Heavy Rain Warning',
      subtitle: 'Avoid low areas on campus',
      time: '30 mins ago',
      category: 'Warning',
      icon: 'weather-rainy',
      iconType: 'mci',
      iconColor: '#E53935',
      bgColor: '#FDE8E8',
      badge: false,
    },
    {
      id: '3',
      title: 'Fire Drill',
      subtitle: 'Tomorrow, 10:00 AM',
      time: '2 hours ago',
      category: 'Info',
      icon: 'fire',
      iconType: 'mci',
      iconColor: '#FF9800',
      bgColor: '#FFEEDD',
      badge: false,
    },
    {
      id: '4',
      title: 'Road Closed',
      subtitle: 'Main Gate closed',
      time: 'Today , 08:30 AM',
      category: 'Warning',
      icon: 'road',
      iconType: 'fa5',
      iconColor: '#E53935',
      bgColor: '#E2E8F0',
      badge: false,
    },
    {
      id: '5',
      title: 'Robbery Reported',
      subtitle: 'New Engineering Block',
      time: '5 mins ago',
      category: 'Emergency',
      icon: 'lightning-bolt-outline',
      iconType: 'mci',
      iconColor: '#5269FF',
      bgColor: '#EBEFFE',
      badge: false,
    },
    {
      id: '6',
      title: 'Fire Drill',
      subtitle: 'Tomorrow, 10:00 AM',
      time: '2 hours ago',
      category: 'Info',
      icon: 'fire',
      iconType: 'mci',
      iconColor: '#FF9800',
      bgColor: '#FFEEDD',
      badge: false,
    },
  ];

  // Filter items based on active pill filter
  const filteredAlerts = activeFilter === 'All'
    ? alertsData
    : alertsData.filter((item) => item.category === activeFilter);

  const renderIcon = (item) => {
    if (item.iconType === 'mci') {
      return <MaterialCommunityIcons name={item.icon} size={28} color={item.iconColor} />;
    }
    return <FontAwesome5 name={item.icon} size={22} color={item.iconColor} />;
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
        <Text style={styles.headerTitle}>Recent Alerts</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="funnel" size={20} color="#000000" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Filter Pills */}
        <View style={styles.filterRow}>
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterPill,
                  isActive ? styles.filterPillActive : styles.filterPillInactive,
                ]}
                activeOpacity={0.8}
                onPress={() => setActiveFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    isActive ? styles.filterTextActive : styles.filterTextInactive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Alerts List */}
        <View style={styles.alertsList}>
          {filteredAlerts.map((item, index) => (
            <React.Fragment key={item.id + index}>
              <TouchableOpacity style={styles.alertItem} activeOpacity={0.7}>
                <View style={[styles.iconCircle, { backgroundColor: item.bgColor }]}>
                  {renderIcon(item)}
                </View>

                <View style={styles.alertDetails}>
                  <View style={styles.titleRow}>
                    <Text style={styles.alertTitle}>{item.title}</Text>
                    {item.badge && <View style={styles.topBadge} />}
                  </View>
                  <Text style={styles.alertSubtext}>{item.subtitle}</Text>
                  <Text style={styles.alertTime}>{item.time}</Text>
                </View>
              </TouchableOpacity>

              {index < filteredAlerts.length - 1 && <View style={styles.divider} />}
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
    paddingBottom: 15,
  },
  backButton: {
    padding: 4,
  },
  filterButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#053E85',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Space above bottom navigation dock
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  filterPill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
  },
  filterPillActive: {
    backgroundColor: '#053E85',
  },
  filterPillInactive: {
    backgroundColor: '#F1F5F9',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  filterTextInactive: {
    color: '#475569',
  },
  alertsList: {
    marginTop: 10,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  alertDetails: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  topBadge: {
    width: 32,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E2E8F0',
  },
  alertSubtext: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  alertTime: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
});
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
  Image,
  Modal,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

// Phone number auto-formatter helper
const formatPhoneNumber = (text) => {
  // Retain + if present at start, strip all other non-digits
  const hasPlus = text.startsWith('+');
  const cleaned = text.replace(/\D/g, '');

  if (!cleaned) return hasPlus ? '+' : '';

  // Format into chunks: +XXX XX XXX XXXX
  let formatted = hasPlus ? `+${cleaned}` : cleaned;

  if (hasPlus) {
    // International pattern like +233 24 123 4567
    const parts = [];
    if (cleaned.length > 0) parts.push('+' + cleaned.slice(0, 3));
    if (cleaned.length > 3) parts.push(cleaned.slice(3, 5));
    if (cleaned.length > 5) parts.push(cleaned.slice(5, 8));
    if (cleaned.length > 8) parts.push(cleaned.slice(8, 12));
    formatted = parts.join(' ');
  } else {
    // Local pattern like 024 123 4567
    const parts = [];
    if (cleaned.length > 0) parts.push(cleaned.slice(0, 3));
    if (cleaned.length > 3) parts.push(cleaned.slice(3, 6));
    if (cleaned.length > 6) parts.push(cleaned.slice(6, 10));
    formatted = parts.join(' ');
  }

  return formatted;
};

export default function TrustedContactsActiveScreen({ onBack, onSave }) {
  // Contact list state with local Jenifer.jpg asset
  const [contacts, setContacts] = useState([
    { id: '1', name: 'Daddy', phone: '+233 26 678 7654', avatar: require('../../assets/Jenifer.jpg') },
    { id: '2', name: 'Mom', phone: '+233 24 123 4567', avatar: require('../../assets/Jenifer.jpg') },
  ]);

  // Modal State for Add/Edit Form
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingContactId, setEditingContactId] = useState(null);
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');

  // Options Menu State
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Open Form for Adding a New Contact
  const handleOpenAddModal = () => {
    setEditingContactId(null);
    setFormName('');
    setFormPhone('');
    setActiveMenuId(null);
    setIsModalVisible(true);
  };

  // Open Form for Editing an Existing Contact
  const handleOpenEditModal = (contact) => {
    setEditingContactId(contact.id);
    setFormName(contact.name);
    setFormPhone(contact.phone);
    setActiveMenuId(null);
    setIsModalVisible(true);
  };

  // Handle phone input typing with auto-formatting
  const handlePhoneChange = (text) => {
    setFormPhone(formatPhoneNumber(text));
  };

  // Save Contact (Create or Update)
  const handleSaveContact = () => {
    if (!formName.trim() || !formPhone.trim()) return;

    const formattedPhone = formatPhoneNumber(formPhone.trim());

    if (editingContactId) {
      setContacts(prev =>
        prev.map(item =>
          item.id === editingContactId
            ? { ...item, name: formName.trim(), phone: formattedPhone }
            : item
        )
      );
    } else {
      const newContact = {
        id: Date.now().toString(),
        name: formName.trim(),
        phone: formattedPhone,
        avatar: require('../../assets/Jenifer.jpg'),
      };
      setContacts(prev => [...prev, newContact]);
    }

    setIsModalVisible(false);
  };

  // Delete Contact
  const handleDeleteContact = (id) => {
    setContacts(prev => prev.filter(item => item.id !== id));
    setActiveMenuId(null);
  };

  return (
    <TouchableWithoutFeedback onPress={() => setActiveMenuId(null)}>
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

            <View style={styles.headerContentContainer}>
              <View style={styles.headerRow}>
                <MaterialCommunityIcons name="account-box-outline" size={32} color="#053E85" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Trusted Contacts</Text>
              </View>
              <Text style={styles.headerSubtitle}>Add people you trust</Text>
              <Text style={styles.headerSubDescription}>They will be notified in an emergency</Text>
            </View>

            <View style={styles.headerSpacer} />
          </View>

          {/* ================= ADD CONTACT TRIGGER BUTTON ================= */}
          <TouchableOpacity 
            style={styles.addButton} 
            activeOpacity={0.8}
            onPress={handleOpenAddModal}
          >
            <Ionicons name="add" size={22} color="#4A4A4A" style={styles.addIcon} />
            <Text style={styles.addButtonText}>Add Contact</Text>
          </TouchableOpacity>

          {/* ================= TRUSTED CONTACTS LIST ================= */}
          <View style={styles.listContainer}>
            {contacts.map((contact, index) => {
              const isMenuActive = activeMenuId === contact.id;

              return (
                <View 
                  key={contact.id} 
                  style={[
                    styles.contactCardWrapper, 
                    { zIndex: isMenuActive ? 1000 : contacts.length - index }
                  ]}
                >
                  <View style={styles.contactCard}>
                    <View style={styles.cardLeftSection}>
                      <Image source={contact.avatar} style={styles.avatar} resizeMode="cover" />
                      <View style={styles.textGroup}>
                        <Text style={styles.contactName}>{contact.name}</Text>
                        <Text style={styles.contactPhone}>{contact.phone}</Text>
                      </View>
                    </View>
                    
                    <TouchableOpacity 
                      style={styles.optionsButton} 
                      activeOpacity={0.6}
                      onPress={() => setActiveMenuId(isMenuActive ? null : contact.id)}
                    >
                      <Entypo name="dots-three-vertical" size={18} color="#A0AEC0" />
                    </TouchableOpacity>
                  </View>

                  {/* Inline Action Menu Popover */}
                  {isMenuActive && (
                    <View style={styles.popoverMenu}>
                      <TouchableOpacity 
                        style={styles.menuItem} 
                        onPress={() => handleOpenEditModal(contact)}
                      >
                        <Ionicons name="pencil-outline" size={16} color="#053E85" />
                        <Text style={styles.menuItemText}>Modify</Text>
                      </TouchableOpacity>
                      
                      <View style={styles.menuDivider} />

                      <TouchableOpacity 
                        style={styles.menuItem} 
                        onPress={() => handleDeleteContact(contact.id)}
                      >
                        <Ionicons name="trash-outline" size={16} color="#D10A0A" />
                        <Text style={[styles.menuItemText, { color: '#D10A0A' }]}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          {/* ================= FOOTER SUBMIT ACTION ================= */}
          <TouchableOpacity style={styles.saveButton} activeOpacity={0.9} onPress={onSave}>
            <MaterialCommunityIcons name="content-save" size={20} color="#FFFFFF" style={styles.saveIcon} />
            <Text style={styles.saveButtonText}>Save and Continue</Text>
          </TouchableOpacity>

        </ScrollView>

        {/* ================= ADD / EDIT CONTACT FORM MODAL ================= */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalCard}>
                  <Text style={styles.modalTitle}>
                    {editingContactId ? 'Modify Contact' : 'Add Trusted Contact'}
                  </Text>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Full Name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. John Doe"
                      value={formName}
                      onChangeText={setFormName}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Phone Number</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. +233 20 000 0000"
                      keyboardType="phone-pad"
                      value={formPhone}
                      onChangeText={handlePhoneChange}
                    />
                  </View>

                  <View style={styles.modalActions}>
                    <TouchableOpacity 
                      style={styles.cancelModalButton}
                      onPress={() => setIsModalVisible(false)}
                    >
                      <Text style={styles.cancelModalText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={styles.submitModalButton}
                      onPress={handleSaveContact}
                    >
                      <Text style={styles.submitModalText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    paddingBottom: 30,
    paddingHorizontal: 24,
  },

  // Header Layout Alignment
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 15,
    marginBottom: 25,
    width: '100%',
  },
  backButton: {
    padding: 4,
    marginLeft: -8,
    marginTop: 2,
    zIndex: 10,
  },
  headerContentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#053E85',
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },
  headerSubDescription: {
    fontSize: 13,
    color: '#4A4A4A',
    textAlign: 'center',
    marginTop: 2,
  },
  headerSpacer: {
    width: 28,
  },

  // Add Contact Button
  addButton: {
    width: '100%',
    height: 48,
    borderWidth: 1.5,
    borderColor: '#3B82F6',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
  },
  addIcon: {
    marginRight: 6,
  },
  addButtonText: {
    fontSize: 14,
    color: '#4A4A4A',
    fontWeight: '500',
  },

  // List Cards Layout
  listContainer: {
    width: '100%',
    gap: 14,
    marginBottom: 40,
  },
  contactCardWrapper: {
    position: 'relative',
  },
  contactCard: {
    width: '100%',
    height: 76,
    borderWidth: 1.5,
    borderColor: '#3B82F6',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  cardLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#E2E8F0',
  },
  textGroup: {
    marginLeft: 14,
    justifyContent: 'center',
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  contactPhone: {
    fontSize: 13,
    color: '#718096',
    marginTop: 2,
  },
  optionsButton: {
    padding: 8,
    marginRight: -4,
  },

  // Popover Menu Styles
  popoverMenu: {
    position: 'absolute',
    right: 16,
    top: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 12,
    zIndex: 9999,
    width: 115,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    gap: 8,
  },
  menuItemText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#053E85',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#EDF2F7',
  },

  // Footer Submit Action
  saveButton: {
    backgroundColor: '#033169',
    width: '100%',
    height: 54,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  saveIcon: {
    marginRight: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Modal Form Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#053E85',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4A4A4A',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 14,
    color: '#1E293B',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 10,
  },
  cancelModalButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelModalText: {
    color: '#64748B',
    fontWeight: '600',
  },
  submitModalButton: {
    backgroundColor: '#053E85',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  submitModalText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
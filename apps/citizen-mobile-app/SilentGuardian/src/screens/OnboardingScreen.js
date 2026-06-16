import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';

export default function OnboardingScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [nokName, setNokName] = useState('');
  const [nokRelationship, setNokRelationship] = useState('');
  const [nokPhone, setNokPhone] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [allergies, setAllergies] = useState('');
  const [conditions, setConditions] = useState('');

  const handleNext = () => {
    if (step === 1) {
      if (!nokName || !nokPhone) {
        alert('Please fill in the contact name and phone number.');
        return;
      }
      setStep(2);
    } else {
      console.log('Onboarding Data:', {
        nok: { name: nokName, relationship: nokRelationship, phone: nokPhone },
        medical: { bloodType, allergies, conditions }
      });
      navigation.navigate('Home');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.stepIndicator}>Step {step} of 2</Text>
        
        {step === 1 ? (
          <View style={styles.formContainer}>
            <Text style={styles.title}>Emergency Contact</Text>
            <Text style={styles.subtitle}>Who should we notify in case of an emergency?</Text>

            <Text style={styles.label}>Full Name</Text>
            <TextInput style={styles.input} placeholder="e.g., Jane Doe" value={nokName} onChangeText={setNokName} />

            <Text style={styles.label}>Relationship</Text>
            <TextInput style={styles.input} placeholder="e.g., Mother, Spouse" value={nokRelationship} onChangeText={setNokRelationship} />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput style={styles.input} placeholder="e.g., +1234567890" keyboardType="phone-pad" value={nokPhone} onChangeText={setNokPhone} />
          </View>
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.title}>Medical Profile</Text>
            <Text style={styles.subtitle}>This details will be shared securely with arriving medical staff.</Text>

            <Text style={styles.label}>Blood Type</Text>
            <TextInput style={styles.input} placeholder="e.g., O+, A-" autoCapitalize="characters" maxLength={3} value={bloodType} onChangeText={setBloodType} />

            <Text style={styles.label}>Severe Allergies</Text>
            <TextInput style={[styles.input, styles.textArea]} placeholder="e.g., Penicillin" multiline={true} numberOfLines={3} value={allergies} onChangeText={setAllergies} />

            <Text style={styles.label}>Chronic Conditions / Medications</Text>
            <TextInput style={[styles.input, styles.textArea]} placeholder="e.g., Asthma" multiline={true} numberOfLines={3} value={conditions} onChangeText={setConditions} />
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>{step === 1 ? 'Continue' : 'Complete Setup'}</Text>
        </TouchableOpacity>

        {step === 2 && (
          <TouchableOpacity style={styles.backButton} onPress={() => setStep(1)}>
            <Text style={styles.backButtonText}>Back to Contact Info</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  scrollContainer: { padding: 24, paddingTop: 60, flexGrow: 1, justifyContent: 'center' },
  stepIndicator: { fontSize: 14, color: '#888', fontWeight: '600', marginBottom: 8, textTransform: 'uppercase' },
  formContainer: { marginBottom: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 24, lineHeight: 22 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 16, color: '#333' },
  textArea: { height: 80, textAlignVertical: 'top' },
  button: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  backButton: { marginTop: 16, alignItems: 'center' },
  backButtonText: { color: '#666', fontSize: 16 }
});
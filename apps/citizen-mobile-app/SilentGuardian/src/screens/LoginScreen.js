import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Temporary testing validation routing function
  const handleLoginPress = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Validation Check', 'Please enter any email and password to proceed.');
      return;
    }

    // Direct routing using navigation stack context
    navigation.navigate('Home');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" transparent backgroundColor="transparent" />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Gradient Section */}
        <LinearGradient colors={['#7FAEE3', '#5289C7']} style={styles.headerBackground}>
          <View style={styles.logoWrapper}>
            <Image
              source={require('../../assets/logo-white-no-bg.png')}
              style={styles.logo}
              resizeMode="cover"
            />
          </View>
        </LinearGradient>

        {/* Lower White Card Container */}
        <View style={styles.cardContainer}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Welcome back , let's get started</Text>

          {/* Email Input */}
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputWrapper}>
            <Feather name="mail" size={20} color="#3B82F6" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="example@email.com"
              placeholderTextColor="#A0A0A0"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password Input */}
          <Text style={styles.inputLabel}>Enter Password</Text>
          <View style={styles.inputWrapper}>
            <Feather name="lock" size={20} color="#3B82F6" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPasswordContainer} activeOpacity={0.7}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Action Button */}
          <TouchableOpacity onPress={handleLoginPress} activeOpacity={0.8} style={styles.buttonShadow}>
            <LinearGradient
              colors={['#005BE3', '#002554']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Navigation link */}
          <TouchableOpacity 
            style={styles.footerLink} 
            onPress={() => navigation.navigate('SignUp')}
            activeOpacity={0.7}
          >
            <Text style={styles.footerLinkText}>
              New user? <Text style={styles.footerLinkBold}>Create Account</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContainer: { flexGrow: 1, backgroundColor: '#FFFFFF' },
  headerBackground: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
  },
  logoWrapper: { width: 100, height: 100, overflow: 'hidden', justifyContent: 'center', alignItems: 'flex-start' },
  logo: { width: 190, height: 100, marginLeft: -5 },
  cardContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: -45,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    paddingTop: 35,
    paddingBottom: 30,
  },
  title: { fontSize: 32, fontWeight: 'bold', color: '#00479E', textAlign: 'center', textDecorationLine: 'underline', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#4A4A4A', textAlign: 'center', marginBottom: 35 },
  inputLabel: { fontSize: 16, fontWeight: '600', color: '#1A1A1A', marginBottom: 8 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#4A90E2',
    borderRadius: 20,
    height: 55,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: '#000000', height: '100%' },
  forgotPasswordContainer: { alignSelf: 'flex-end', marginBottom: 30 },
  forgotPasswordText: { color: '#1A1A1A', fontSize: 14, fontWeight: '500' },
  buttonShadow: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 8,
    marginBottom: 35,
  },
  buttonGradient: { height: 55, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  footerLink: { marginTop: 10, alignItems: 'center' },
  footerLinkText: { fontSize: 15, color: '#4A4A4A' },
  footerLinkBold: { color: '#00479E', fontWeight: 'bold' }
});
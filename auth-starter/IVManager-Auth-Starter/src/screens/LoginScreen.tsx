import React, {useState} from 'react';
import {ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {useAuth} from '../context/AuthContext';

export default function LoginScreen() {
  const {signIn} = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = async () => {
    if (!identifier.trim() || !password) return Alert.alert('Missing details', 'Enter your staff ID/email and password.');
    try {
      setLoading(true);
      await signIn(identifier.trim(), password);
    } catch (error) {
      Alert.alert('Sign in failed', error instanceof Error ? error.message : 'Please try again');
    } finally {
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.page} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.brand}><Text style={styles.logo}>✚</Text><Text style={styles.title}>IV Management</Text><Text style={styles.subtitle}>Secure staff sign in</Text></View>
      <View style={styles.card}>
        <Text style={styles.heading}>Welcome back</Text>
        <Text style={styles.label}>Staff ID or Email</Text>
        <TextInput style={styles.input} placeholder="Enter staff ID or email" placeholderTextColor="#8A9AA4" autoCapitalize="none" value={identifier} onChangeText={setIdentifier} />
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="Enter password" placeholderTextColor="#8A9AA4" secureTextEntry value={password} onChangeText={setPassword} />
        <Pressable accessibilityRole="button" disabled={loading} style={[styles.button, loading && {opacity: 0.6}]} onPress={submit}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign In</Text>}
        </Pressable>
        <Text style={styles.note}>Your dashboard is selected automatically based on your assigned staff role.</Text>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: '#F3F8F9', justifyContent: 'center', padding: 22},
  brand: {alignItems: 'center', marginBottom: 28}, logo: {fontSize: 38, color: '#117A83'},
  title: {fontSize: 27, fontWeight: '800', color: '#17333B'}, subtitle: {fontSize: 14, color: '#647A83', marginTop: 5},
  card: {backgroundColor: '#FFFFFF', padding: 24, borderRadius: 18, elevation: 3},
  heading: {fontSize: 20, fontWeight: '700', color: '#17333B', marginBottom: 24},
  label: {fontSize: 13, color: '#344B54', fontWeight: '600', marginBottom: 8},
  input: {borderWidth: 1, borderColor: '#D5E2E5', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 20, color: '#17333B'},
  button: {backgroundColor: '#117A83', borderRadius: 10, height: 48, alignItems: 'center', justifyContent: 'center'},
  buttonText: {color: '#FFFFFF', fontWeight: '700', fontSize: 16},
  note: {textAlign: 'center', fontSize: 12, lineHeight: 18, color: '#738891', marginTop: 18},
});

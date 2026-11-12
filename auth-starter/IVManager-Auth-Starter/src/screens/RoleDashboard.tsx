import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useAuth} from '../context/AuthContext';
import {Role} from '../services/authService';

const data: Record<Role, {heading: string; modules: string[]}> = {
  NURSE: {heading: 'Nurse Dashboard', modules: ['My Beds', 'IV Alerts', 'Schedule']},
  DOCTOR: {heading: 'Doctor Dashboard', modules: ['Patients', 'Prescriptions', 'Reviews']},
  PHARMACIST: {heading: 'Pharmacy Dashboard', modules: ['Ward Requests', 'Stock Inventory', 'Issue History']},
};
export default function RoleDashboard() {
  const {user, signOut} = useAuth();
  if (!user) return null;
  const info = data[user.role];
  return <View style={styles.page}>
    <View style={styles.header}><Text style={styles.headerTitle}>{info.heading}</Text><Text style={styles.headerSub}>Hello, {user.name}</Text></View>
    <Text style={styles.label}>Your modules</Text>
    {info.modules.map(module => <View key={module} style={styles.card}><Text style={styles.cardText}>{module}</Text><Text style={styles.arrow}>›</Text></View>)}
    <Text style={styles.note}>Module cards are placeholders for upcoming screens.</Text>
    <Pressable style={styles.logout} onPress={signOut}><Text style={styles.logoutText}>Log Out</Text></Pressable>
  </View>;
}
const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: '#F3F8F9', padding: 18},
  header: {backgroundColor: '#117A83', padding: 22, borderRadius: 14, marginBottom: 25},
  headerTitle: {color: '#FFFFFF', fontSize: 23, fontWeight: '700'}, headerSub: {color: '#D6F0F1', marginTop: 6},
  label: {color: '#223C44', fontWeight: '700', fontSize: 16, marginBottom: 14},
  card: {backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between'},
  cardText: {color: '#243C44', fontWeight: '600'}, arrow: {fontSize: 22, color: '#117A83'},
  note: {color: '#6D8188', fontSize: 12, marginTop: 4},
  logout: {marginTop: 30, borderWidth: 1, borderColor: '#117A83', borderRadius: 10, padding: 14, alignItems: 'center'},
  logoutText: {color: '#117A83', fontWeight: '700'},
});

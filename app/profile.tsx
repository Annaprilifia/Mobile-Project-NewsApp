import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Profile', headerShown: true }} />
      <Text style={styles.title}>Nama Kelompok: PUKUPAW</Text>
      <Text style={styles.subtitle}>Anggota:</Text>
      <Text style={styles.member}>- ANNA ALIFIA APRILIANI</Text>
      <Text style={styles.member}>- NISKALA DIAN PRAMANK</Text>
      <Text style={styles.member}>- SISKA APRILIANTI</Text>
      <Text style={styles.member}>- RESA MUSAROPAH</Text>
      <Text style={styles.subtitle}>Kelas: SI.5A</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkGrey,
    marginTop: 10,
  },
  member: {
    fontSize: 14,
    color: Colors.black,
    marginLeft: 10,
  },
});

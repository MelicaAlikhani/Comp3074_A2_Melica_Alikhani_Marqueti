// app/(tabs)/explore.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About This App</Text>

      <Text style={styles.label}>Student Name:</Text>
      <Text style={styles.value}>Melica Alikhani-Marqueti</Text>

      <Text style={styles.label}>Student ID:</Text>
      <Text style={styles.value}>101360798</Text>

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>
        This React Native application converts an amount from one currency to
        another using live exchange rates from FreeCurrencyAPI. The user can
        enter a base currency, destination currency, and amount. The app
        validates the input, fetches the rate, and displays the converted value
        and the exchange rate used.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#ffffff" },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
  value: { fontSize: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 8,
  },
  description: { fontSize: 16, lineHeight: 22 },
});

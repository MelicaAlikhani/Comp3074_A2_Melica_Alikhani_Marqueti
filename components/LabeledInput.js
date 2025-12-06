// components/LabeledInput.js
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function LabeledInput({ label, ...inputProps }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...inputProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
});

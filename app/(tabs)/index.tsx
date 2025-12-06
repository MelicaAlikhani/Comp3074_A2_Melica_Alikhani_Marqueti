// app/(tabs)/index.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import LabeledInput from "../../components/LabeledInput";

const API_URL = "https://api.freecurrencyapi.com/v1/latest";
const API_KEY = "fca_live_om4OBigVZbeN2BiIQqYW8gI0dCGCzmLlgfTl8NE5";

export default function MainScreen() {
  const [baseCurrency, setBaseCurrency] = useState("CAD");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [amount, setAmount] = useState("1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  const validateInput = () => {
    const currencyRegex = /^[A-Z]{3}$/;

    if (!currencyRegex.test(baseCurrency)) {
      return "Base currency must be a 3-letter uppercase code (e.g. CAD).";
    }
    if (!currencyRegex.test(targetCurrency)) {
      return "Destination currency must be a 3-letter uppercase code (e.g. USD).";
    }

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return "Amount must be a positive number.";
    }

    return "";
  };

  const handleConvert = async () => {
    const validationError = validateInput();
    if (validationError) {
      setError(validationError);
      setConvertedAmount(null);
      setExchangeRate(null);
      return;
    }

    setError("");
    setLoading(true);
    setConvertedAmount(null);
    setExchangeRate(null);

    try {
      const url = `${API_URL}?apikey=${API_KEY}&base_currency=${baseCurrency.toUpperCase()}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Network error: ${response.status} ${response.statusText}`
        );
      }

      const json = await response.json();

      if (!json || !json.data) {
        throw new Error("Unexpected API response format.");
      }

      const rates = json.data as Record<string, number>;
      const rate = rates[targetCurrency.toUpperCase()];

      if (!rate) {
        throw new Error(
          `Currency "${targetCurrency.toUpperCase()}" not found in API response.`
        );
      }

      const numericAmount = Number(amount);
      const converted = numericAmount * rate;

      setExchangeRate(rate);
      setConvertedAmount(converted);
    } catch (err: any) {
      console.error(err);
      setError(
        err.message ||
          "Something went wrong while fetching exchange rates. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Currency Converter</Text>

        <LabeledInput
          label="Base Currency (3-letter code)"
          value={baseCurrency}
          onChangeText={(text) => setBaseCurrency(text.toUpperCase())}
          placeholder="CAD"
          autoCapitalize="characters"
        />

        <LabeledInput
          label="Destination Currency (3-letter code)"
          value={targetCurrency}
          onChangeText={(text) => setTargetCurrency(text.toUpperCase())}
          placeholder="USD"
          autoCapitalize="characters"
        />

        <LabeledInput
          label="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="1"
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {loading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : null}

        <View style={styles.buttonContainer}>
          <Button title="Convert" onPress={handleConvert} disabled={loading} />
        </View>

        {convertedAmount !== null && exchangeRate !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              {amount} {baseCurrency.toUpperCase()} ={" "}
              {convertedAmount.toFixed(2)} {targetCurrency.toUpperCase()}
            </Text>
            <Text style={styles.rateText}>
              Exchange rate used: 1 {baseCurrency.toUpperCase()} ={" "}
              {exchangeRate} {targetCurrency.toUpperCase()}
            </Text>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  loader: { marginVertical: 10 },
  resultContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#e8f5e9",
    marginBottom: 16,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  rateText: { fontSize: 16 },
  errorText: { color: "red", marginTop: 4, marginBottom: 8 },
});

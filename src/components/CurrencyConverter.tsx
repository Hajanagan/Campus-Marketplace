import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Currency, formatCurrencyAmount, getExchangeRate } from "../currency";

export function CurrencyConverter({
  currency,
  exchangeRate,
  onCurrencyChange,
  onExchangeRateChange,
}: {
  currency: Currency;
  exchangeRate: string;
  onCurrencyChange: (currency: Currency) => void;
  onExchangeRateChange: (rate: string) => void;
}) {
  const [amount, setAmount] = useState("1000");
  const fromCurrency = currency === "USD" ? "LKR" : "USD";
  const numericAmount = Number(amount);
  const numericRate = Number(exchangeRate);
  const hasValidInput =
    amount.trim() !== "" &&
    exchangeRate.trim() !== "" &&
    Number.isFinite(numericAmount) &&
    numericAmount >= 0 &&
    Number.isFinite(numericRate) &&
    numericRate > 0;
  const convertedAmount = hasValidInput
    ? fromCurrency === "LKR"
      ? numericAmount / getExchangeRate(exchangeRate)
      : numericAmount * getExchangeRate(exchangeRate)
    : null;

  return (
    <View style={styles.container}>
      <View style={styles.headingRow}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>⇄</Text>
        </View>
        <View style={styles.headingCopy}>
          <Text style={styles.title}>Currency Converter</Text>
          <Text style={styles.subtitle}>Set the currency used for prices</Text>
        </View>
      </View>

      <View style={styles.segment} accessibilityRole="tablist">
        {(["USD", "LKR"] as const).map((option) => (
          <Pressable
            key={option}
            accessibilityRole="tab"
            accessibilityState={{ selected: currency === option }}
            onPress={() => onCurrencyChange(option)}
            style={[
              styles.segmentOption,
              currency === option && styles.segmentOptionActive,
            ]}
          >
            <Text
              style={[
                styles.segmentText,
                currency === option && styles.segmentTextActive,
              ]}
            >
              Show {option} prices
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>AMOUNT ({fromCurrency})</Text>
          <TextInput
            accessibilityLabel={`Amount in ${fromCurrency}`}
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter amount"
            placeholderTextColor="#98A39B"
            style={styles.input}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>LKR PER USD</Text>
          <TextInput
            accessibilityLabel="Exchange rate in LKR per USD"
            keyboardType="decimal-pad"
            value={exchangeRate}
            onChangeText={onExchangeRateChange}
            placeholder="Exchange rate"
            placeholderTextColor="#98A39B"
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.result}>
        <Text style={styles.resultLabel}>CONVERTED AMOUNT</Text>
        <Text style={styles.resultValue}>
          {convertedAmount === null
            ? "Enter valid amounts"
            : formatCurrencyAmount(convertedAmount, currency)}
        </Text>
        <Text style={styles.rateNote}>
          {hasValidInput
            ? "Using your entered exchange rate"
            : "Amount must be non-negative and rate must be above zero"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E7EDE7",
    padding: 16,
  },
  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#E8F4EB",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    color: "#286247",
    fontSize: 23,
    fontWeight: "700",
  },
  headingCopy: {
    flex: 1,
  },
  title: {
    color: "#294838",
    fontSize: 13,
    fontWeight: "800",
  },
  subtitle: {
    color: "#849087",
    fontSize: 10,
    marginTop: 5,
  },
  segment: {
    flexDirection: "row",
    backgroundColor: "#F0F5F0",
    borderRadius: 10,
    padding: 3,
    marginTop: 16,
  },
  segmentOption: {
    flex: 1,
    minHeight: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  segmentOptionActive: {
    backgroundColor: "#205B45",
  },
  segmentText: {
    color: "#627269",
    fontSize: 11,
    fontWeight: "700",
  },
  segmentTextActive: {
    color: "#FFFFFF",
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  inputGroup: {
    flex: 1,
    minWidth: 0,
  },
  inputLabel: {
    color: "#718078",
    fontSize: 9,
    fontWeight: "800",
    marginBottom: 7,
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: "#DDE6DE",
    borderRadius: 9,
    paddingHorizontal: 10,
    color: "#294838",
    fontSize: 14,
    fontWeight: "700",
  },
  result: {
    backgroundColor: "#F3F8F3",
    borderRadius: 11,
    padding: 13,
    marginTop: 15,
  },
  resultLabel: {
    color: "#718078",
    fontSize: 9,
    fontWeight: "800",
  },
  resultValue: {
    color: "#205B45",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 5,
  },
  rateNote: {
    color: "#849087",
    fontSize: 10,
    marginTop: 3,
  },
});
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

/**
 * Date input component with native picker
 * @param {Date} value - Selected date
 * @param {function} onChange - Callback when date changes (receives Date object)
 * @param {string} label - Label above input
 * @param {string} placeholder - Placeholder text
 * @param {Date} minimumDate - Minimum selectable date
 * @param {Date} maximumDate - Maximum selectable date
 * @param {object} style - Additional styles
 */
export default function DateInput({
  value,
  onChange,
  label = "",
  placeholder = "Select date",
  minimumDate,
  maximumDate,
  style,
}) {
  const [show, setShow] = useState(false);

  const handleChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShow(false);
    }
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const formatDate = (date) => {
    if (!date) return null;
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TouchableOpacity style={styles.input} onPress={() => setShow(true)}>
        <Text style={[styles.inputText, !value && styles.placeholder]}>
          {value ? formatDate(value) : placeholder}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          style={styles.picker}
        />
      )}

      {Platform.OS === "ios" && show && (
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => setShow(false)}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#232526",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: "#414345",
  },
  inputText: {
    fontSize: 18,
    color: "#fff",
  },
  placeholder: {
    color: "#666",
  },
  picker: {
    backgroundColor: "#232526",
    marginTop: 8,
  },
  doneButton: {
    backgroundColor: "#FF5858",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 8,
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

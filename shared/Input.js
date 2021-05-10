import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
const Input = ({
  placeholder,
  keyboardType,
  value,
  onChange,
  show = false,
}) => {
  return (
    <View style={styles.input}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"#5A5A5A"}
        style={{ paddingLeft: 10, width: "90%" }}
        keyboardType={keyboardType}
        value={value}
        onChangeText={(text) => onChange(text)}
        secureTextEntry={show}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginTop: 30,
    width: "100%",
    borderColor: "#F1F1F1",
    borderWidth: 1,
    borderRadius: 10,
  },
});

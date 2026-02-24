import React from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';

export default function TextInput(props) {
  return <RNTextInput {...props} style={[styles.input, props.style]} />;
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    width: '100%',
  },
});
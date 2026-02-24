import React from 'react';
import { Text as RNText } from 'react-native';

export default function Text({ children, style }) {
  return <RNText style={style}>{children}</RNText>;
}
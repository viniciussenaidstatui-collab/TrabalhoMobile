import React from 'react';
import { View as RNView } from 'react-native';

export default function View({ children, style }) {
  return <RNView style={style}>{children}</RNView>;
}
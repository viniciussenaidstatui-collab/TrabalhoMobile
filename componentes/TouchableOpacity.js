import React from 'react';
import { TouchableOpacity as RNTouchable } from 'react-native';

export default function TouchableOpacity({ children, style, onPress }) {
  return <RNTouchable style={style} onPress={onPress}>{children}</RNTouchable>;
}
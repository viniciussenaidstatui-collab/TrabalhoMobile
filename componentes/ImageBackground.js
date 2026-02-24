import React from 'react';
import { ImageBackground as RNImgBg, StyleSheet } from 'react-native';

export default function ImageBackground({ children, source, style }) {
  return (
    <RNImgBg source={source} style={[styles.bg, style]} resizeMode="cover">
      {children}
    </RNImgBg>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width: '100%', height: '100%' },
});
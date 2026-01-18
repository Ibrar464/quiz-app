import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  style?: TextStyle;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  style,
}) => {
  const getTextStyle = () => {
    switch (variant) {
      case 'h1':
        return styles.h1;
      case 'h2':
        return styles.h2;
      case 'h3':
        return styles.h3;
      case 'caption':
        return styles.caption;
      default:
        return styles.body;
    }
  };

  return <Text style={[getTextStyle(), style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },
  body: {
    fontSize: 16,
    color: '#333333',
  },
  caption: {
    fontSize: 14,
    color: '#666666',
  },
});

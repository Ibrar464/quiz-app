import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface OptionButtonProps {
  option: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  onPress: () => void;
  showResult?: boolean;
  disabled?: boolean;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  option,
  index,
  isSelected,
  isCorrect,
  onPress,
  showResult = false,
  disabled = false,
}) => {
  const getButtonStyle = (): ViewStyle => {
    if (disabled || showResult) {
      if (showResult && isCorrect) {
        return [styles.button, styles.correct];
      }
      if (showResult && isSelected && !isCorrect) {
        return [styles.button, styles.incorrect];
      }
    }
    if (isSelected) {
      return [styles.button, styles.selected];
    }
    return styles.button;
  };

  const getTextStyle = () => {
    if (isSelected || (showResult && isCorrect)) {
      return [styles.text, styles.textSelected];
    }
    return styles.text;
  };

  const getOptionLabel = () => {
    const labels = ['A', 'B', 'C', 'D'];
    return labels[index] || '';
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.optionLabel}>{getOptionLabel()}.</Text>
      <Text style={getTextStyle()}>{option}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
    minHeight: 56,
  },
  selected: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  correct: {
    borderColor: '#34C759',
    backgroundColor: '#D4F4DD',
  },
  incorrect: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFE5E5',
  },
  text: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  textSelected: {
    fontWeight: '600',
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666666',
    marginRight: 12,
    minWidth: 20,
  },
});

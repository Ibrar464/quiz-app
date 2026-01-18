import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../../atoms/Card';
import { Typography } from '../../atoms/Typography';
import { OptionButton } from '../OptionButton/OptionButton';
import { Question } from '../../types';

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: number;
  onAnswerSelect: (answerIndex: number) => void;
  showResult?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showResult = false,
}) => {
  return (
    <Card style={styles.container}>
      <Typography variant="h3" style={styles.question}>
        {question.question}
      </Typography>
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            option={option}
            index={index}
            isSelected={selectedAnswer === index}
            isCorrect={index === question.correctAnswer}
            onPress={() => onAnswerSelect(index)}
            showResult={showResult}
            disabled={showResult}
          />
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  question: {
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 12,
  },
});

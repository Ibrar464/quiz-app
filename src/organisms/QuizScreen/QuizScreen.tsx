import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Typography } from '../../atoms/Typography';
import { QuestionCard } from '../../molecules/QuestionCard';
import { Button } from '../../atoms/Button';
import { QuizResult } from '../../types';
import { RootStackParamList, NavigationProp } from '../../navigation/AppNavigator';

type QuizScreenRouteProp = RouteProp<RootStackParamList, 'Quiz'>;

export const QuizScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<QuizScreenRouteProp>();
  const { quiz } = route.params;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, number>>(new Map());

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedAnswer = answers.get(currentQuestion.id);
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = new Map(answers);
    newAnswers.set(currentQuestion.id, answerIndex);
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      calculateResult();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const calculateResult = () => {
    let correctAnswers = 0;
    const answerDetails: QuizResult['answers'] = [];

    quiz.questions.forEach((question) => {
      const selectedAnswerIndex = answers.get(question.id) ?? -1;
      const isCorrect = selectedAnswerIndex === question.correctAnswer;

      if (isCorrect) {
        correctAnswers++;
      }

      answerDetails.push({
        questionId: question.id,
        selectedAnswer: selectedAnswerIndex,
        isCorrect,
      });
    });

    const score = Math.round((correctAnswers / quiz.questions.length) * 100);

    const result: QuizResult = {
      quizId: quiz.id,
      totalQuestions: quiz.questions.length,
      correctAnswers,
      score,
      answers: answerDetails,
    };

    navigation.navigate('Result', { result });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Typography variant="body" style={styles.backText}>
            ← Back
          </Typography>
        </TouchableOpacity>
        <Typography variant="h3" style={styles.headerTitle}>
          {quiz.title}
        </Typography>
        <View style={styles.progressContainer}>
          <Typography variant="caption" style={styles.progressText}>
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </Typography>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
                },
              ]}
            />
          </View>
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
        />
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.buttonRow}>
          <Button
            title="Previous"
            onPress={handlePrevious}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            style={styles.button}
          />
          <Button
            title={isLastQuestion ? 'Finish' : 'Next'}
            onPress={handleNext}
            disabled={selectedAnswer === undefined}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginBottom: 8,
  },
  backText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  headerTitle: {
    marginBottom: 12,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressText: {
    marginBottom: 4,
    color: '#666666',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
  },
});

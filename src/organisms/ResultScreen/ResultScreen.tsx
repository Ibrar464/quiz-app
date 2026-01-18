import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Typography } from '../../atoms/Typography';
import { Card } from '../../atoms/Card';
import { Button } from '../../atoms/Button';
import { QuestionCard } from '../../molecules/QuestionCard';
import { quizzes } from '../../data/quizzes';
import { RootStackParamList, NavigationProp } from '../../navigation/AppNavigator';

type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

export const ResultScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ResultScreenRouteProp>();
  const { result } = route.params;

  const quiz = quizzes.find((q) => q.id === result.quizId);

  if (!quiz) {
    return null;
  }

  const handleRetake = () => {
    navigation.goBack();
  };

  const handleBackToQuizzes = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'QuizList' }],
    });
  };

  const getScoreColor = () => {
    if (result.score >= 80) return '#34C759';
    if (result.score >= 60) return '#FF9500';
    return '#FF3B30';
  };

  const getScoreMessage = () => {
    if (result.score === 100) return 'Perfect Score! 🎉';
    if (result.score >= 80) return 'Excellent! 🌟';
    if (result.score >= 60) return 'Good Job! 👍';
    return 'Keep Practicing! 💪';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Typography variant="h1" style={styles.title}>
            Quiz Results
          </Typography>
          <Typography variant="h2" style={styles.quizTitle}>
            {quiz.title}
          </Typography>
        </View>

        <Card style={styles.resultCard}>
          <View style={styles.scoreContainer}>
            <Typography variant="h1" style={[styles.score, { color: getScoreColor() }]}>
              {result.score}%
            </Typography>
            <Typography variant="h3" style={styles.scoreMessage}>
              {getScoreMessage()}
            </Typography>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Typography variant="h2" style={styles.statValue}>
                {result.correctAnswers}
              </Typography>
              <Typography variant="caption" style={styles.statLabel}>
                Correct
              </Typography>
            </View>
            <View style={styles.stat}>
              <Typography variant="h2" style={styles.statValue}>
                {result.totalQuestions - result.correctAnswers}
              </Typography>
              <Typography variant="caption" style={styles.statLabel}>
                Incorrect
              </Typography>
            </View>
            <View style={styles.stat}>
              <Typography variant="h2" style={styles.statValue}>
                {result.totalQuestions}
              </Typography>
              <Typography variant="caption" style={styles.statLabel}>
                Total
              </Typography>
            </View>
          </View>
        </Card>

        <Typography variant="h3" style={styles.reviewTitle}>
          Review Answers
        </Typography>

        {quiz.questions.map((question, index) => {
          const answerDetail = result.answers.find(
            (a) => a.questionId === question.id,
          );
          return (
            <QuestionCard
              key={question.id}
              question={question}
              selectedAnswer={answerDetail?.selectedAnswer}
              onAnswerSelect={() => {}}
              showResult={true}
            />
          );
        })}

        <View style={styles.buttonContainer}>
          <Button
            title="Retake Quiz"
            onPress={handleRetake}
            variant="outline"
            style={styles.button}
          />
          <Button
            title="Back to Quizzes"
            onPress={handleBackToQuizzes}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  quizTitle: {
    textAlign: 'center',
    color: '#666666',
  },
  resultCard: {
    marginBottom: 24,
    alignItems: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  score: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scoreMessage: {
    color: '#666666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    marginBottom: 4,
  },
  statLabel: {
    color: '#666666',
  },
  reviewTitle: {
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 24,
    gap: 12,
  },
  button: {
    marginBottom: 12,
  },
});

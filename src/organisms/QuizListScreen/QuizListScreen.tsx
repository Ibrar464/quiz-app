import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Typography } from '../../atoms/Typography';
import { Card } from '../../atoms/Card';
import { Button } from '../../atoms/Button';
import { quizzes } from '../../data/quizzes';
import { NavigationProp } from '../../navigation/AppNavigator';
import { removeStoredToken } from '../../hooks/useAuth';

interface QuizListScreenProps {
  onLogout?: () => void;
}

export const QuizListScreen: React.FC<QuizListScreenProps> = ({
  onLogout,
}) => {
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await removeStoredToken();
            onLogout?.();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
          },
        },
      ],
    );
  };

  const handleQuizSelect = (quiz: typeof quizzes[0]) => {
    navigation.navigate('Quiz', { quiz });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h1" style={styles.title}>
          Quiz App
        </Typography>
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
        />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Typography variant="body" style={styles.subtitle}>
          Choose a quiz to start
        </Typography>
        {quizzes.map((quiz) => (
          <TouchableOpacity
            key={quiz.id}
            onPress={() => handleQuizSelect(quiz)}
            activeOpacity={0.7}
          >
            <Card style={styles.quizCard}>
              <Typography variant="h2" style={styles.quizTitle}>
                {quiz.title}
              </Typography>
              <Typography variant="body" style={styles.quizDescription}>
                {quiz.description}
              </Typography>
              <Typography variant="caption" style={styles.quizInfo}>
                {quiz.questions.length} questions
              </Typography>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    flex: 1,
  },
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 36,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  subtitle: {
    marginBottom: 24,
    textAlign: 'center',
    color: '#666666',
  },
  quizCard: {
    marginBottom: 16,
  },
  quizTitle: {
    marginBottom: 8,
  },
  quizDescription: {
    marginBottom: 8,
    color: '#666666',
  },
  quizInfo: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

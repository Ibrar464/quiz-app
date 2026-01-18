import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Typography } from '../../atoms/Typography';
import { LoginForm } from '../../molecules/LoginForm';
import { SignUpForm } from '../../molecules/SignUpForm';
import { NavigationProp } from '../../navigation/AppNavigator';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const navigation = useNavigation<NavigationProp>();
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthSuccess = () => {
    onAuthSuccess();
    navigation.reset({
      index: 0,
      routes: [{ name: 'QuizList' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Typography variant="h1" style={styles.title}>
            Quiz App
          </Typography>
          <Typography variant="body" style={styles.subtitle}>
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </Typography>
          <></>
        </View>
        <View style={styles.formContainer}>
          {isLogin ? (
            <LoginForm
              onSuccess={handleAuthSuccess}
              onSwitchToSignUp={() => setIsLogin(false)}
            />
          ) : (
            <SignUpForm
              onSuccess={handleAuthSuccess}
              onSwitchToLogin={() => setIsLogin(true)}
            />
          )}
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666666',
  },
  formContainer: {
    width: '100%',
  },
});

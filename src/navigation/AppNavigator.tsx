import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthScreen } from '../organisms/AuthScreen';
import { QuizListScreen } from '../organisms/QuizListScreen';
import { QuizScreen } from '../organisms/QuizScreen';
import { ResultScreen } from '../organisms/ResultScreen';
import { getStoredToken } from '../hooks/useAuth';
import { Quiz, QuizResult } from '../types';

export type RootStackParamList = {
  Auth: undefined;
  QuizList: undefined;
  Quiz: { quiz: Quiz };
  Result: { result: QuizResult };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AppNavigator: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = await getStoredToken();
    setIsAuthenticated(!!token);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    // Loading state
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
        initialRouteName={isAuthenticated ? 'QuizList' : 'Auth'}
      >
        <Stack.Screen name="Auth">
          {() => <AuthScreen onAuthSuccess={handleAuthSuccess} />}
        </Stack.Screen>
        <Stack.Screen name="QuizList">
          {() => <QuizListScreen onLogout={handleLogout} />}
        </Stack.Screen>
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/api';
import { LoginRequest, SignUpRequest } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@quiz_app_token';

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: async (data) => {
      await AsyncStorage.setItem(TOKEN_KEY, data.access_token);
    },
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: (userData: SignUpRequest) => authService.signUp(userData),
    onSuccess: async (data) => {
      await AsyncStorage.setItem(TOKEN_KEY, data.token);
    },
  });
};

export const getStoredToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export const removeStoredToken = async (): Promise<void> => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};

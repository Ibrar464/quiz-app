import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { useLogin } from '../../hooks/useAuth';

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToSignUp: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onSwitchToSignUp,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const loginMutation = useLogin();

  const validateForm = () => {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await loginMutation.mutateAsync({ email, password });
      onSuccess();
    } catch (error: any) {
      if (error.response?.data?.error) {
        setErrors({ password: error.response.data.error });
      } else {
        setErrors({ password: 'Login failed. Please try again.' });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
        error={errors.password}
      />
      <Button
        title="Login"
        onPress={handleLogin}
        loading={loginMutation.isPending}
        style={styles.button}
      />
      <Button
        title="Don't have an account? Sign Up"
        onPress={onSwitchToSignUp}
        variant="outline"
        style={styles.switchButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    marginTop: 8,
  },
  switchButton: {
    marginTop: 12,
  },
});

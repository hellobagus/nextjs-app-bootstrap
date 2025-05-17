import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { CustomButton } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';
import { testCredentials } from '../../types/auth';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login, isLoading, error } = useAuth();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login({ email, password });
  };

  const handleTestLogin = (userType: keyof typeof testCredentials) => {
    const credentials = testCredentials[userType];
    setEmail(credentials.email);
    setPassword(credentials.password);
    login(credentials);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium">Welcome Back</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Sign in to continue
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        {error && (
          <Text variant="bodySmall" style={[styles.error, { color: theme.colors.error }]}>
            {error}
          </Text>
        )}

        <CustomButton
          mode="contained"
          onPress={handleLogin}
          loading={isLoading}
          style={styles.button}
        >
          Sign In
        </CustomButton>

        <View style={styles.registerSection}>
          <Text variant="bodyMedium">Don't have an account? </Text>
          <CustomButton
            mode="text"
            onPress={() => navigation.navigate('Register')}
            style={styles.registerButton}
          >
            Register
          </CustomButton>
        </View>

        <View style={styles.testAccountsSection}>
          <Text variant="titleMedium" style={styles.testAccountsTitle}>
            Test Accounts
          </Text>
          <Text variant="bodySmall" style={styles.testAccountsDescription}>
            Use these accounts to test different user roles:
          </Text>

          <View style={styles.testButtons}>
            <CustomButton
              mode="outlined"
              onPress={() => handleTestLogin('member')}
              style={styles.testButton}
            >
              Member Login
              {'\n'}
              <Text variant="bodySmall">member@nu.or.id / member123</Text>
            </CustomButton>

            <CustomButton
              mode="outlined"
              onPress={() => handleTestLogin('adminPusat')}
              style={styles.testButton}
            >
              Admin Pusat Login
              {'\n'}
              <Text variant="bodySmall">adminpusat@nu.or.id / adminpusat123</Text>
            </CustomButton>

            <CustomButton
              mode="outlined"
              onPress={() => handleTestLogin('adminCabang')}
              style={styles.testButton}
            >
              Admin Cabang Login
              {'\n'}
              <Text variant="bodySmall">admincabang@nu.or.id / admincabang123</Text>
            </CustomButton>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
    gap: 8,
  },
  subtitle: {
    opacity: 0.7,
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: '#fff',
  },
  error: {
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
  },
  registerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  registerButton: {
    marginLeft: -8,
  },
  testAccountsSection: {
    marginTop: 40,
    gap: 16,
  },
  testAccountsTitle: {
    textAlign: 'center',
  },
  testAccountsDescription: {
    textAlign: 'center',
    opacity: 0.7,
  },
  testButtons: {
    gap: 12,
  },
  testButton: {
    borderRadius: 8,
  },
});

export default LoginScreen;

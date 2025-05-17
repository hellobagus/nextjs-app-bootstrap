import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { CustomButton } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { register, isLoading, error } = useAuth();
  const theme = useTheme();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    }

    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      const { confirmPassword, ...registerData } = formData;
      register(registerData);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium">Create Account</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Join the NU community
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Full Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          error={!!formErrors.name}
          style={styles.input}
        />
        {formErrors.name && (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {formErrors.name}
          </Text>
        )}

        <TextInput
          label="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          autoCapitalize="none"
          keyboardType="email-address"
          error={!!formErrors.email}
          style={styles.input}
        />
        {formErrors.email && (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {formErrors.email}
          </Text>
        )}

        <TextInput
          label="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
          error={!!formErrors.password}
          style={styles.input}
        />
        {formErrors.password && (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {formErrors.password}
          </Text>
        )}

        <TextInput
          label="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          secureTextEntry
          error={!!formErrors.confirmPassword}
          style={styles.input}
        />
        {formErrors.confirmPassword && (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {formErrors.confirmPassword}
          </Text>
        )}

        <TextInput
          label="Phone Number"
          value={formData.phoneNumber}
          onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
          keyboardType="phone-pad"
          error={!!formErrors.phoneNumber}
          style={styles.input}
        />
        {formErrors.phoneNumber && (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {formErrors.phoneNumber}
          </Text>
        )}

        <TextInput
          label="Address"
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
          multiline
          numberOfLines={3}
          error={!!formErrors.address}
          style={styles.input}
        />
        {formErrors.address && (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {formErrors.address}
          </Text>
        )}

        {error && (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {error}
          </Text>
        )}

        <CustomButton
          mode="contained"
          onPress={handleRegister}
          loading={isLoading}
          style={styles.button}
        >
          Register
        </CustomButton>

        <View style={styles.loginSection}>
          <Text variant="bodyMedium">Already have an account? </Text>
          <CustomButton
            mode="text"
            onPress={() => navigation.navigate('Login')}
            style={styles.loginButton}
          >
            Sign In
          </CustomButton>
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
  errorText: {
    fontSize: 12,
    marginTop: -12,
    marginLeft: 4,
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
  },
  loginSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginButton: {
    marginLeft: -8,
  },
});

export default RegisterScreen;

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { CustomButton } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';
import { Formik } from 'formik';
import * as Yup from 'yup';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  name: Yup.string().required('Name is required'),
  ktpNumber: Yup.string()
    .matches(/^\d{16}$/, 'KTP number must be 16 digits')
    .required('KTP number is required'),
  kkNumber: Yup.string()
    .matches(/^\d{16}$/, 'KK number must be 16 digits')
    .required('KK number is required'),
});

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { register, isLoading, error } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Create Account</Text>
      
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          name: '',
          ktpNumber: '',
          kkNumber: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={async (values) => {
          await register({
            email: values.email,
            password: values.password,
            name: values.name,
            ktpNumber: values.ktpNumber,
            kkNumber: values.kkNumber,
          });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <TextInput
              label="Full Name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              error={touched.name && !!errors.name}
              style={styles.input}
            />
            {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}

            <TextInput
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email && !!errors.email}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput
              label="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
              error={touched.password && !!errors.password}
              style={styles.input}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TextInput
              label="Confirm Password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              secureTextEntry
              error={touched.confirmPassword && !!errors.confirmPassword}
              style={styles.input}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            <TextInput
              label="KTP Number"
              value={values.ktpNumber}
              onChangeText={handleChange('ktpNumber')}
              onBlur={handleBlur('ktpNumber')}
              error={touched.ktpNumber && !!errors.ktpNumber}
              style={styles.input}
              keyboardType="numeric"
              maxLength={16}
            />
            {touched.ktpNumber && errors.ktpNumber && (
              <Text style={styles.errorText}>{errors.ktpNumber}</Text>
            )}

            <TextInput
              label="KK Number"
              value={values.kkNumber}
              onChangeText={handleChange('kkNumber')}
              onBlur={handleBlur('kkNumber')}
              error={touched.kkNumber && !!errors.kkNumber}
              style={styles.input}
              keyboardType="numeric"
              maxLength={16}
            />
            {touched.kkNumber && errors.kkNumber && (
              <Text style={styles.errorText}>{errors.kkNumber}</Text>
            )}

            {error && <Text style={styles.errorText}>{error}</Text>}

            <CustomButton
              mode="contained"
              onPress={() => handleSubmit()}
              loading={isLoading}
              style={styles.button}
            >
              Register
            </CustomButton>

            <CustomButton
              mode="text"
              onPress={() => navigation.navigate('Login')}
              style={styles.button}
            >
              Already have an account? Login
            </CustomButton>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  form: {
    padding: 20,
    gap: 15,
  },
  input: {
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 10,
  },
  errorText: {
    color: '#B00020',
    fontSize: 12,
  },
});

export default RegisterScreen;

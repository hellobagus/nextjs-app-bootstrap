import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, SegmentedButtons } from 'react-native-paper';
import { CustomButton } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { UserRole } from '../../types/auth';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  role: Yup.string().oneOf(['member', 'adminPusat', 'adminCabang'] as UserRole[]).required('Role is required'),
});

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login, isLoading, error } = useAuth();

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Welcome Back</Text>
      
      <Formik
        initialValues={{ email: '', password: '', role: 'member' as UserRole }}
        validationSchema={LoginSchema}
        onSubmit={async (values) => {
          await login({
            email: values.email,
            password: values.password,
            role: values.role as UserRole
          });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
          <View style={styles.form}>
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

            <SegmentedButtons
              value={values.role}
              onValueChange={(value) => setFieldValue('role', value)}
              buttons={[
                { value: 'member', label: 'Member' },
                { value: 'adminPusat', label: 'Admin Pusat' },
                { value: 'adminCabang', label: 'Admin Cabang' },
              ]}
              style={styles.roleSelector}
            />

            {error && <Text style={styles.errorText}>{error}</Text>}

            <CustomButton
              mode="contained"
              onPress={() => handleSubmit()}
              loading={isLoading}
              style={styles.button}
            >
              Login
            </CustomButton>

            <CustomButton
              mode="text"
              onPress={() => navigation.navigate('Register')}
              style={styles.button}
            >
              Don't have an account? Register
            </CustomButton>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 50,
  },
  form: {
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
  roleSelector: {
    marginTop: 10,
  },
});

export default LoginScreen;

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Text, useTheme } from 'react-native-paper';
import { CustomButton } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MemberStackParamList } from '../../types/navigation';
import { Formik } from 'formik';
import * as Yup from 'yup';

type Props = NativeStackScreenProps<MemberStackParamList, 'EditProfile'>;

const EditProfileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10,13}$/, 'Phone number must be between 10-13 digits')
    .required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  currentPassword: Yup.string().min(8, 'Password must be at least 8 characters'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .when('currentPassword', {
      is: (val: string) => val && val.length > 0,
      then: (schema) => schema.required('New password is required when changing password'),
    }),
  confirmNewPassword: Yup.string()
    .when('newPassword', {
      is: (val: string) => val && val.length > 0,
      then: (schema) => schema
        .required('Please confirm your new password')
        .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
    }),
});

const EditProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const theme = useTheme();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleUpdateProfile = async (values: any) => {
    setIsLoading(true);
    try {
      // TODO: Implement profile update logic
      console.log('Update profile with:', values);
      navigation.goBack();
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          name: user?.name || '',
          email: user?.email || '',
          phone: '',
          address: '',
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        }}
        validationSchema={EditProfileSchema}
        onSubmit={handleUpdateProfile}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.content}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Personal Information
            </Text>

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
              label="Phone Number"
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              error={touched.phone && !!errors.phone}
              style={styles.input}
              keyboardType="phone-pad"
            />
            {touched.phone && errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}

            <TextInput
              label="Address"
              value={values.address}
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              error={touched.address && !!errors.address}
              style={styles.input}
              multiline
              numberOfLines={3}
            />
            {touched.address && errors.address && (
              <Text style={styles.errorText}>{errors.address}</Text>
            )}

            <Text variant="titleMedium" style={[styles.sectionTitle, styles.passwordSection]}>
              Change Password
            </Text>

            <TextInput
              label="Current Password"
              value={values.currentPassword}
              onChangeText={handleChange('currentPassword')}
              onBlur={handleBlur('currentPassword')}
              error={touched.currentPassword && !!errors.currentPassword}
              style={styles.input}
              secureTextEntry
            />
            {touched.currentPassword && errors.currentPassword && (
              <Text style={styles.errorText}>{errors.currentPassword}</Text>
            )}

            <TextInput
              label="New Password"
              value={values.newPassword}
              onChangeText={handleChange('newPassword')}
              onBlur={handleBlur('newPassword')}
              error={touched.newPassword && !!errors.newPassword}
              style={styles.input}
              secureTextEntry
            />
            {touched.newPassword && errors.newPassword && (
              <Text style={styles.errorText}>{errors.newPassword}</Text>
            )}

            <TextInput
              label="Confirm New Password"
              value={values.confirmNewPassword}
              onChangeText={handleChange('confirmNewPassword')}
              onBlur={handleBlur('confirmNewPassword')}
              error={touched.confirmNewPassword && !!errors.confirmNewPassword}
              style={styles.input}
              secureTextEntry
            />
            {touched.confirmNewPassword && errors.confirmNewPassword && (
              <Text style={styles.errorText}>{errors.confirmNewPassword}</Text>
            )}

            <View style={styles.actions}>
              <CustomButton
                mode="contained"
                onPress={() => handleSubmit()}
                loading={isLoading}
                style={styles.button}
              >
                Save Changes
              </CustomButton>

              <CustomButton
                mode="outlined"
                onPress={() => navigation.goBack()}
                style={styles.button}
              >
                Cancel
              </CustomButton>
            </View>
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
  content: {
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  passwordSection: {
    marginTop: 24,
  },
  input: {
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  errorText: {
    color: '#B00020',
    fontSize: 12,
    marginBottom: 8,
  },
  actions: {
    marginTop: 24,
    gap: 12,
  },
  button: {
    borderRadius: 8,
  },
});

export default EditProfileScreen;

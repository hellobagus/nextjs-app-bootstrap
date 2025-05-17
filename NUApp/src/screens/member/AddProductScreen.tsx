import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, SegmentedButtons, useTheme } from 'react-native-paper';
import { CustomButton } from '../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MemberStackParamList } from '../../types/navigation';
import { ProductCategory, ProductFormData } from '../../types/marketplace';
import { Formik } from 'formik';
import * as Yup from 'yup';

type Props = NativeStackScreenProps<MemberStackParamList, 'AddProduct'>;

const categories: { value: ProductCategory; label: string }[] = [
  { value: 'food', label: 'Food' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'craft', label: 'Craft' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'health', label: 'Health' },
  { value: 'other', label: 'Other' },
];

const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Product name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number()
    .required('Price is required')
    .min(1000, 'Price must be at least Rp 1.000'),
  category: Yup.string().required('Category is required'),
});

const AddProductScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: ProductFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement API call to create product
      console.log('Creating product:', values);
      navigation.navigate('MyProducts');
    } catch (error) {
      console.error('Failed to create product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          name: '',
          description: '',
          price: '',
          category: 'other' as ProductCategory,
          images: [],
        }}
        validationSchema={ProductSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <View style={styles.content}>
            <TextInput
              label="Product Name"
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
              label="Description"
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              error={touched.description && !!errors.description}
              style={styles.input}
              multiline
              numberOfLines={4}
            />
            {touched.description && errors.description && (
              <Text style={styles.errorText}>{errors.description}</Text>
            )}

            <TextInput
              label="Price (Rp)"
              value={values.price}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, '');
                setFieldValue('price', numericValue);
              }}
              onBlur={handleBlur('price')}
              error={touched.price && !!errors.price}
              style={styles.input}
              keyboardType="numeric"
            />
            {touched.price && errors.price && (
              <Text style={styles.errorText}>{errors.price}</Text>
            )}

            <Text variant="bodyMedium" style={styles.label}>Category</Text>
            <SegmentedButtons
              value={values.category}
              onValueChange={(value) => setFieldValue('category', value)}
              buttons={categories.map((cat) => ({
                value: cat.value,
                label: cat.label,
              }))}
              style={styles.categoryButtons}
            />
            {touched.category && errors.category && (
              <Text style={styles.errorText}>{errors.category}</Text>
            )}

            <Text variant="bodyMedium" style={styles.label}>Product Images</Text>
            <CustomButton
              mode="outlined"
              onPress={() => {
                // TODO: Implement image upload
                console.log('Upload images');
              }}
              style={styles.uploadButton}
            >
              Upload Images
            </CustomButton>

            <View style={styles.actions}>
              <CustomButton
                mode="contained"
                onPress={() => handleSubmit()}
                loading={isSubmitting}
                style={styles.submitButton}
              >
                Create Product
              </CustomButton>

              <CustomButton
                mode="outlined"
                onPress={() => navigation.goBack()}
                style={styles.cancelButton}
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
    padding: 16,
    gap: 16,
  },
  input: {
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 8,
  },
  categoryButtons: {
    flexWrap: 'wrap',
  },
  uploadButton: {
    marginTop: 8,
  },
  errorText: {
    color: '#B00020',
    fontSize: 12,
    marginTop: -8,
  },
  actions: {
    marginTop: 24,
    gap: 12,
  },
  submitButton: {
    borderRadius: 8,
  },
  cancelButton: {
    borderRadius: 8,
  },
});

export default AddProductScreen;

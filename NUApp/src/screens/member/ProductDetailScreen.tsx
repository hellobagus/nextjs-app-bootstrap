import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, useTheme, Divider } from 'react-native-paper';
import { CustomButton } from '../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MemberStackParamList } from '../../types/navigation';
import { Product } from '../../types/marketplace';

type Props = NativeStackScreenProps<MemberStackParamList, 'ProductDetail'>;

const mockProduct: Product = {
  id: '1',
  name: 'Kue Basah Traditional',
  description: 'Kue basah homemade dengan berbagai varian. Dibuat dengan bahan-bahan berkualitas dan resep tradisional yang sudah turun temurun. Tersedia dalam berbagai varian rasa seperti pandan, coklat, dan vanilla.',
  price: 50000,
  images: ['https://example.com/image1.jpg'],
  category: 'food',
  seller: {
    id: '1',
    name: 'Ibu Siti',
    rating: 4.5,
  },
  createdAt: '2024-01-20T00:00:00Z',
  status: 'active',
};

const ProductDetailScreen: React.FC<Props> = ({ route }) => {
  const { productId } = route.params;
  const theme = useTheme();
  const [isContacting, setIsContacting] = React.useState(false);

  const handleContactSeller = () => {
    setIsContacting(true);
    // TODO: Implement contact seller functionality
    setTimeout(() => {
      setIsContacting(false);
    }, 1000);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.imageCard}>
        <Card.Cover
          source={{ uri: mockProduct.images[0] }}
          style={styles.productImage}
        />
      </Card>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="headlineSmall">{mockProduct.name}</Text>
          <Text variant="headlineMedium" style={{ color: theme.colors.primary }}>
            Rp {mockProduct.price.toLocaleString('id-ID')}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.sellerSection}>
          <Text variant="titleMedium">Seller Information</Text>
          <View style={styles.sellerInfo}>
            <Text variant="bodyLarge">{mockProduct.seller.name}</Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
              Rating: {mockProduct.seller.rating} ⭐️
            </Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.descriptionSection}>
          <Text variant="titleMedium">Description</Text>
          <Text variant="bodyMedium" style={styles.description}>
            {mockProduct.description}
          </Text>
        </View>

        <View style={styles.detailsSection}>
          <Text variant="titleMedium">Details</Text>
          <View style={styles.detailRow}>
            <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
              Category
            </Text>
            <Text variant="bodyMedium">
              {mockProduct.category.charAt(0).toUpperCase() + mockProduct.category.slice(1)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
              Listed on
            </Text>
            <Text variant="bodyMedium">
              {new Date(mockProduct.createdAt).toLocaleDateString('id-ID')}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <CustomButton
          mode="contained"
          onPress={handleContactSeller}
          loading={isContacting}
          style={styles.contactButton}
        >
          Contact Seller
        </CustomButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageCard: {
    elevation: 0,
  },
  productImage: {
    height: Dimensions.get('window').width * 0.8,
  },
  content: {
    padding: 16,
    gap: 24,
  },
  header: {
    gap: 8,
  },
  divider: {
    backgroundColor: '#e0e0e0',
  },
  sellerSection: {
    gap: 12,
  },
  sellerInfo: {
    gap: 4,
  },
  descriptionSection: {
    gap: 12,
  },
  description: {
    lineHeight: 24,
  },
  detailsSection: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  footer: {
    padding: 16,
    paddingTop: 0,
  },
  contactButton: {
    borderRadius: 8,
  },
});

export default ProductDetailScreen;

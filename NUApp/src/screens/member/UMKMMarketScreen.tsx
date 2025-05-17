import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Card, Searchbar, Chip, useTheme } from 'react-native-paper';
import { CustomButton } from '../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MemberStackParamList } from '../../types/navigation';
import { Product, ProductCategory, MarketplaceFilters } from '../../types/marketplace';

type Props = NativeStackScreenProps<MemberStackParamList, 'UMKMMarket'>;

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Kue Basah Traditional',
    description: 'Kue basah homemade dengan berbagai varian',
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
  },
  {
    id: '2',
    name: 'Batik Tulis Modern',
    description: 'Batik tulis dengan motif kontemporer',
    price: 350000,
    images: ['https://example.com/image2.jpg'],
    category: 'fashion',
    seller: {
      id: '2',
      name: 'Pak Ahmad',
      rating: 4.8,
    },
    createdAt: '2024-01-19T00:00:00Z',
    status: 'active',
  },
];

const categories: ProductCategory[] = [
  'food',
  'fashion',
  'craft',
  'electronics',
  'health',
  'other',
];

const UMKMMarketScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | undefined>();
  const [filters, setFilters] = useState<MarketplaceFilters>({});

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  const handleCategorySelect = (category: ProductCategory) => {
    setSelectedCategory(category === selectedCategory ? undefined : category);
    setFilters(prev => ({ 
      ...prev, 
      category: category === selectedCategory ? undefined : category 
    }));
  };

  const filteredProducts = mockProducts.filter(product => {
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    if (filters.searchQuery && !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>UMKM Market</Text>
        <Searchbar
          placeholder="Search products..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <Chip
            key={category}
            selected={category === selectedCategory}
            onPress={() => handleCategorySelect(category)}
            style={styles.categoryChip}
            mode="outlined"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Chip>
        ))}
      </ScrollView>

      <View style={styles.content}>
        <View style={styles.actionButtons}>
          <CustomButton
            mode="contained"
            onPress={() => navigation.navigate('AddProduct')}
            style={styles.addButton}
          >
            Add Product
          </CustomButton>
          <CustomButton
            mode="outlined"
            onPress={() => navigation.navigate('MyProducts')}
            style={styles.myProductsButton}
          >
            My Products
          </CustomButton>
        </View>

        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              style={styles.productCard}
              onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
            >
              <Card.Cover 
                source={{ uri: product.images[0] }}
                style={styles.productImage}
              />
              <Card.Content>
                <Text variant="titleMedium" numberOfLines={1}>
                  {product.name}
                </Text>
                <Text variant="bodyMedium" style={{ color: theme.colors.primary }}>
                  Rp {product.price.toLocaleString('id-ID')}
                </Text>
                <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                  by {product.seller.name}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  searchBar: {
    elevation: 0,
    backgroundColor: '#f5f5f5',
  },
  categoriesContainer: {
    marginVertical: 8,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    marginRight: 8,
  },
  content: {
    padding: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  addButton: {
    flex: 1,
  },
  myProductsButton: {
    flex: 1,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  productCard: {
    width: '47%',
    elevation: 2,
  },
  productImage: {
    height: 120,
  },
});

export default UMKMMarketScreen;

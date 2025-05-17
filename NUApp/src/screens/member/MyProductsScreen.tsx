import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Chip, useTheme, Menu } from 'react-native-paper';
import { CustomButton } from '../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MemberStackParamList } from '../../types/navigation';
import { Product } from '../../types/marketplace';

type Props = NativeStackScreenProps<MemberStackParamList, 'MyProducts'>;

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
      id: '1',
      name: 'Ibu Siti',
      rating: 4.5,
    },
    createdAt: '2024-01-19T00:00:00Z',
    status: 'active',
  },
];

const MyProductsScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [menuVisible, setMenuVisible] = React.useState<string | null>(null);

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'active':
        return theme.colors.primary;
      case 'sold':
        return theme.colors.tertiary;
      case 'inactive':
        return theme.colors.error;
      default:
        return theme.colors.outline;
    }
  };

  const handleEditProduct = (productId: string) => {
    setMenuVisible(null);
    // TODO: Implement edit functionality
    console.log('Edit product:', productId);
  };

  const handleDeleteProduct = (productId: string) => {
    setMenuVisible(null);
    // TODO: Implement delete functionality
    console.log('Delete product:', productId);
  };

  const handleMarkAsSold = (productId: string) => {
    setMenuVisible(null);
    // TODO: Implement mark as sold functionality
    console.log('Mark as sold:', productId);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <CustomButton
          mode="contained"
          onPress={() => navigation.navigate('AddProduct')}
          style={styles.addButton}
        >
          Add New Product
        </CustomButton>
      </View>

      <View style={styles.content}>
        {mockProducts.map((product) => (
          <Card
            key={product.id}
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
          >
            <Card.Cover source={{ uri: product.images[0] }} style={styles.productImage} />
            <Card.Content style={styles.cardContent}>
              <View style={styles.productInfo}>
                <Text variant="titleMedium" numberOfLines={1}>
                  {product.name}
                </Text>
                <Text variant="bodyLarge" style={{ color: theme.colors.primary }}>
                  Rp {product.price.toLocaleString('id-ID')}
                </Text>
                <Chip
                  mode="outlined"
                  textStyle={{ color: getStatusColor(product.status) }}
                  style={[styles.statusChip, { borderColor: getStatusColor(product.status) }]}
                >
                  {product.status.toUpperCase()}
                </Chip>
              </View>

              <Menu
                visible={menuVisible === product.id}
                onDismiss={() => setMenuVisible(null)}
                anchor={
                  <CustomButton
                    mode="text"
                    onPress={() => setMenuVisible(product.id)}
                    style={styles.menuButton}
                  >
                    •••
                  </CustomButton>
                }
              >
                <Menu.Item
                  onPress={() => handleEditProduct(product.id)}
                  title="Edit"
                />
                <Menu.Item
                  onPress={() => handleMarkAsSold(product.id)}
                  title="Mark as Sold"
                />
                <Menu.Item
                  onPress={() => handleDeleteProduct(product.id)}
                  title="Delete"
                  titleStyle={{ color: theme.colors.error }}
                />
              </Menu>
            </Card.Content>
          </Card>
        ))}
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
  addButton: {
    borderRadius: 8,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  productCard: {
    elevation: 2,
  },
  productImage: {
    height: 200,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 16,
  },
  productInfo: {
    flex: 1,
    gap: 4,
  },
  statusChip: {
    alignSelf: 'flex-start',
    marginTop: 8,
    backgroundColor: 'transparent',
  },
  menuButton: {
    margin: -8,
    marginTop: -12,
  },
});

export default MyProductsScreen;

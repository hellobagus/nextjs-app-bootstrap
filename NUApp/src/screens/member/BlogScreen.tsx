import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Card, Searchbar, Chip, useTheme } from 'react-native-paper';
import { CustomButton } from '../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MemberStackParamList } from '../../types/navigation';
import { BlogPost } from '../../types/content';

type Props = NativeStackScreenProps<MemberStackParamList, 'Blog'>;

const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Program Pemberdayaan UMKM NU 2024',
    content: 'Lorem ipsum...',
    excerpt: 'Nahdlatul Ulama meluncurkan program pemberdayaan UMKM untuk meningkatkan kesejahteraan anggota...',
    author: {
      id: '1',
      name: 'KH. Ahmad Shodiq',
      role: 'adminPusat',
    },
    featuredImage: 'https://example.com/image1.jpg',
    category: ['Program', 'UMKM'],
    tags: ['pemberdayaan', 'ekonomi', 'umkm'],
    publishDate: '2024-01-20T08:00:00Z',
    lastModified: '2024-01-20T08:00:00Z',
    status: 'published',
    viewCount: 156,
    comments: [],
  },
  {
    id: '2',
    title: 'Pentingnya Pendidikan Karakter dalam Era Digital',
    content: 'Lorem ipsum...',
    excerpt: 'Di era digital yang penuh tantangan, pendidikan karakter menjadi kunci dalam membentuk generasi muda...',
    author: {
      id: '2',
      name: 'Prof. Dr. Hj. Siti Aminah',
      role: 'adminPusat',
    },
    featuredImage: 'https://example.com/image2.jpg',
    category: ['Pendidikan', 'Teknologi'],
    tags: ['pendidikan', 'karakter', 'digital'],
    publishDate: '2024-01-19T10:30:00Z',
    lastModified: '2024-01-19T10:30:00Z',
    status: 'published',
    viewCount: 243,
    comments: [],
  },
];

const BlogScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const allCategories = Array.from(
    new Set(mockPosts.flatMap((post) => post.category))
  );

  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          Blog & Artikel
        </Text>
        <Searchbar
          placeholder="Cari artikel..."
          onChangeText={setSearchQuery}
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
        {allCategories.map((category) => (
          <Chip
            key={category}
            selected={category === selectedCategory}
            onPress={() => setSelectedCategory(
              category === selectedCategory ? null : category
            )}
            style={styles.categoryChip}
            mode="outlined"
          >
            {category}
          </Chip>
        ))}
      </ScrollView>

      <View style={styles.content}>
        {filteredPosts.map((post) => (
          <Card
            key={post.id}
            style={styles.postCard}
            onPress={() => navigation.navigate('BlogPost', { id: post.id })}
          >
            <Card.Cover source={{ uri: post.featuredImage }} />
            <Card.Content style={styles.postContent}>
              <View style={styles.categoryRow}>
                {post.category.map((cat) => (
                  <Chip
                    key={cat}
                    compact
                    mode="outlined"
                    style={styles.smallChip}
                  >
                    {cat}
                  </Chip>
                ))}
              </View>

              <Text variant="titleLarge" style={styles.postTitle}>
                {post.title}
              </Text>

              <Text variant="bodyMedium" style={styles.excerpt} numberOfLines={3}>
                {post.excerpt}
              </Text>

              <View style={styles.postMeta}>
                <View>
                  <Text variant="bodySmall" style={{ color: theme.colors.primary }}>
                    {post.author.name}
                  </Text>
                  <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                    {formatDate(post.publishDate)}
                  </Text>
                </View>
                <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                  {post.viewCount} views
                </Text>
              </View>
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
    gap: 16,
  },
  title: {
    marginBottom: 8,
  },
  searchBar: {
    elevation: 0,
    backgroundColor: '#f5f5f5',
  },
  categoriesContainer: {
    marginBottom: 16,
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
    gap: 16,
  },
  postCard: {
    elevation: 2,
  },
  postContent: {
    gap: 12,
    paddingTop: 16,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  smallChip: {
    height: 24,
  },
  postTitle: {
    marginTop: 4,
  },
  excerpt: {
    color: '#666',
    lineHeight: 20,
  },
  postMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
  },
});

export default BlogScreen;

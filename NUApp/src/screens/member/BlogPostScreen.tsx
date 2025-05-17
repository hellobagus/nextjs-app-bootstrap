import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Card, useTheme, Divider, TextInput, Avatar } from 'react-native-paper';
import { CustomButton } from '../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MemberStackParamList } from '../../types/navigation';
import { BlogPost, Comment } from '../../types/content';
import { useAuth } from '../../contexts/AuthContext';

type Props = NativeStackScreenProps<MemberStackParamList, 'BlogPost'>;

const mockPost: BlogPost = {
  id: '1',
  title: 'Program Pemberdayaan UMKM NU 2024',
  content: `Nahdlatul Ulama meluncurkan program pemberdayaan UMKM untuk meningkatkan kesejahteraan anggota. Program ini merupakan bagian dari upaya NU dalam mengembangkan ekonomi umat.

Program ini akan fokus pada beberapa aspek utama:

1. Pelatihan Kewirausahaan
- Manajemen usaha dasar
- Pemasaran digital
- Pengelolaan keuangan

2. Pendampingan Usaha
- Mentoring oleh pengusaha sukses
- Konsultasi bisnis
- Networking

3. Akses Permodalan
- Kerjasama dengan lembaga keuangan
- Sistem pembiayaan syariah
- Pendampingan pengajuan modal

Melalui program ini, NU berharap dapat membantu anggotanya mengembangkan usaha yang berkelanjutan dan berdaya saing.`,
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
  comments: [
    {
      id: '1',
      postId: '1',
      userId: '2',
      userName: 'H. Mahmud',
      content: 'Program yang sangat bagus, semoga bisa membantu banyak UMKM.',
      createdAt: '2024-01-20T10:00:00Z',
      status: 'approved',
    },
  ],
};

const BlogPostScreen: React.FC<Props> = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleSubmitComment = async () => {
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      // TODO: Implement comment submission
      console.log('Submitting comment:', comment);
      setComment('');
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: mockPost.featuredImage }}
        style={styles.coverImage}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.categories}>
            {mockPost.category.map((category) => (
              <Text
                key={category}
                style={[styles.category, { color: theme.colors.primary }]}
              >
                {category}
              </Text>
            ))}
          </View>

          <Text variant="headlineSmall" style={styles.title}>
            {mockPost.title}
          </Text>

          <View style={styles.meta}>
            <View style={styles.authorInfo}>
              <Avatar.Text
                size={40}
                label={mockPost.author.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              />
              <View style={styles.authorMeta}>
                <Text variant="bodyMedium">{mockPost.author.name}</Text>
                <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                  {formatDate(mockPost.publishDate)}
                </Text>
              </View>
            </View>
            <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
              {mockPost.viewCount} views
            </Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        <Text variant="bodyLarge" style={styles.content}>
          {mockPost.content}
        </Text>

        <View style={styles.tags}>
          {mockPost.tags.map((tag) => (
            <Text
              key={tag}
              style={[styles.tag, { color: theme.colors.primary }]}
            >
              #{tag}
            </Text>
          ))}
        </View>

        <Divider style={styles.divider} />

        <View style={styles.commentsSection}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Comments ({mockPost.comments.length})
          </Text>

          {user && (
            <Card style={styles.commentForm}>
              <Card.Content>
                <TextInput
                  label="Write a comment"
                  value={comment}
                  onChangeText={setComment}
                  multiline
                  numberOfLines={3}
                  style={styles.commentInput}
                />
                <CustomButton
                  mode="contained"
                  onPress={handleSubmitComment}
                  loading={isSubmitting}
                  disabled={!comment.trim() || isSubmitting}
                  style={styles.submitButton}
                >
                  Submit
                </CustomButton>
              </Card.Content>
            </Card>
          )}

          {mockPost.comments.map((comment) => (
            <Card key={comment.id} style={styles.commentCard}>
              <Card.Content>
                <View style={styles.commentHeader}>
                  <Avatar.Text
                    size={32}
                    label={comment.userName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  />
                  <View style={styles.commentMeta}>
                    <Text variant="bodyMedium">{comment.userName}</Text>
                    <Text
                      variant="bodySmall"
                      style={{ color: theme.colors.outline }}
                    >
                      {formatDate(comment.createdAt)}
                    </Text>
                  </View>
                </View>
                <Text variant="bodyMedium" style={styles.commentContent}>
                  {comment.content}
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
  coverImage: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  header: {
    gap: 12,
  },
  categories: {
    flexDirection: 'row',
    gap: 8,
  },
  category: {
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    lineHeight: 32,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  authorMeta: {
    gap: 4,
  },
  divider: {
    marginVertical: 24,
  },
  postContent: {
    lineHeight: 24,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 24,
  },
  tag: {
    fontSize: 14,
  },
  commentsSection: {
    gap: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  commentForm: {
    elevation: 2,
  },
  commentInput: {
    backgroundColor: '#fff',
  },
  submitButton: {
    marginTop: 12,
    borderRadius: 8,
  },
  commentCard: {
    elevation: 1,
    marginBottom: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  commentMeta: {
    gap: 4,
  },
  commentContent: {
    lineHeight: 20,
  },
});

export default BlogPostScreen;

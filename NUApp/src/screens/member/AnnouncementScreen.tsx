import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Chip, useTheme, Divider } from 'react-native-paper';
import { CustomButton } from '../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MemberStackParamList } from '../../types/navigation';
import { Announcement } from '../../types/content';

type Props = NativeStackScreenProps<MemberStackParamList, 'Announcements'>;

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Pertemuan Anggota Tahunan 2024',
    content: 'Dengan hormat, kami mengundang seluruh anggota untuk hadir dalam Pertemuan Anggota Tahunan yang akan diadakan pada:\n\nTanggal: 15 Februari 2024\nWaktu: 09.00 WIB\nTempat: Aula Utama NU Center\n\nAgenda:\n1. Laporan Tahunan\n2. Pemilihan Pengurus\n3. Rencana Kerja 2024',
    priority: 'high',
    targetAudience: ['member', 'adminPusat', 'adminCabang'],
    publishDate: '2024-01-15T08:00:00Z',
    expiryDate: '2024-02-15T23:59:59Z',
    attachments: [
      {
        name: 'Undangan.pdf',
        url: 'https://example.com/undangan.pdf',
        type: 'application/pdf',
      },
    ],
    status: 'published',
  },
  {
    id: '2',
    title: 'Program Beasiswa NU 2024 Dibuka',
    content: 'Program Beasiswa NU untuk tahun akademik 2024/2025 telah dibuka. Program ini menyediakan beasiswa untuk jenjang S1, S2, dan S3.',
    priority: 'medium',
    targetAudience: ['member'],
    publishDate: '2024-01-10T10:00:00Z',
    expiryDate: '2024-03-31T23:59:59Z',
    status: 'published',
  },
];

const AnnouncementScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();

  const getPriorityColor = (priority: Announcement['priority']) => {
    switch (priority) {
      case 'urgent':
        return theme.colors.error;
      case 'high':
        return theme.colors.primary;
      case 'medium':
        return theme.colors.tertiary;
      default:
        return theme.colors.outline;
    }
  };

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
        <Text variant="headlineSmall">Announcements</Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
          Stay updated with important information
        </Text>
      </View>

      <View style={styles.content}>
        {mockAnnouncements.map((announcement) => (
          <Card
            key={announcement.id}
            style={styles.announcementCard}
            onPress={() => navigation.navigate('AnnouncementDetail', { id: announcement.id })}
          >
            <Card.Content>
              <View style={styles.cardHeader}>
                <Chip
                  mode="outlined"
                  textStyle={{ color: getPriorityColor(announcement.priority) }}
                  style={[
                    styles.priorityChip,
                    { borderColor: getPriorityColor(announcement.priority) },
                  ]}
                >
                  {announcement.priority.toUpperCase()}
                </Chip>
                <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                  {formatDate(announcement.publishDate)}
                </Text>
              </View>

              <Text variant="titleLarge" style={styles.title}>
                {announcement.title}
              </Text>

              <Text
                variant="bodyMedium"
                style={styles.excerpt}
                numberOfLines={3}
              >
                {announcement.content}
              </Text>

              {announcement.attachments && announcement.attachments.length > 0 && (
                <>
                  <Divider style={styles.divider} />
                  <View style={styles.attachments}>
                    <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                      Attachments:
                    </Text>
                    {announcement.attachments.map((attachment) => (
                      <CustomButton
                        key={attachment.name}
                        mode="text"
                        onPress={() => {}}
                        style={styles.attachmentButton}
                      >
                        {attachment.name}
                      </CustomButton>
                    ))}
                  </View>
                </>
              )}

              {announcement.expiryDate && (
                <Text
                  variant="bodySmall"
                  style={[
                    styles.expiryDate,
                    { color: theme.colors.error },
                  ]}
                >
                  Expires: {formatDate(announcement.expiryDate)}
                </Text>
              )}
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
    padding: 20,
    gap: 4,
  },
  content: {
    padding: 20,
    paddingTop: 0,
    gap: 16,
  },
  announcementCard: {
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priorityChip: {
    backgroundColor: 'transparent',
  },
  title: {
    marginBottom: 8,
  },
  excerpt: {
    color: '#666',
    lineHeight: 20,
  },
  divider: {
    marginVertical: 16,
  },
  attachments: {
    gap: 8,
  },
  attachmentButton: {
    alignSelf: 'flex-start',
    marginLeft: -8,
  },
  expiryDate: {
    marginTop: 16,
    textAlign: 'right',
  },
});

export default AnnouncementScreen;

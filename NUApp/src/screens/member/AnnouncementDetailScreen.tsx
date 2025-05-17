import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Chip, useTheme, Divider } from 'react-native-paper';
import { CustomButton } from '../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MemberStackParamList } from '../../types/navigation';
import { Announcement } from '../../types/content';

type Props = NativeStackScreenProps<MemberStackParamList, 'AnnouncementDetail'>;

const mockAnnouncement: Announcement = {
  id: '1',
  title: 'Pertemuan Anggota Tahunan 2024',
  content: 'Dengan hormat, kami mengundang seluruh anggota untuk hadir dalam Pertemuan Anggota Tahunan yang akan diadakan pada:\n\nTanggal: 15 Februari 2024\nWaktu: 09.00 WIB\nTempat: Aula Utama NU Center\n\nAgenda:\n1. Laporan Tahunan\n2. Pemilihan Pengurus\n3. Rencana Kerja 2024\n\nDiharapkan kehadiran seluruh anggota tepat waktu. Acara ini sangat penting untuk perkembangan organisasi kita ke depan.\n\nUntuk konfirmasi kehadiran, silakan mengisi form yang terlampir.',
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
    {
      name: 'Form_Kehadiran.docx',
      url: 'https://example.com/form.docx',
      type: 'application/docx',
    },
  ],
  status: 'published',
};

const AnnouncementDetailScreen: React.FC<Props> = () => {
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
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDownload = (attachment: NonNullable<Announcement['attachments']>[number]) => {
    // TODO: Implement file download
    console.log('Downloading:', attachment.name);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Chip
            mode="outlined"
            textStyle={{ color: getPriorityColor(mockAnnouncement.priority) }}
            style={[
              styles.priorityChip,
              { borderColor: getPriorityColor(mockAnnouncement.priority) },
            ]}
          >
            {mockAnnouncement.priority.toUpperCase()}
          </Chip>

          <Text variant="headlineSmall" style={styles.title}>
            {mockAnnouncement.title}
          </Text>

          <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
            Published: {formatDate(mockAnnouncement.publishDate)}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <Text variant="bodyLarge" style={styles.content}>
          {mockAnnouncement.content}
        </Text>

        {mockAnnouncement.attachments && mockAnnouncement.attachments.length > 0 && (
          <>
            <Divider style={styles.divider} />
            <View style={styles.attachmentsSection}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Attachments
              </Text>
              <View style={styles.attachmentsList}>
                {mockAnnouncement.attachments.map((attachment) => (
                  <Card
                    key={attachment.name}
                    style={styles.attachmentCard}
                    onPress={() => handleDownload(attachment)}
                  >
                    <Card.Content style={styles.attachmentContent}>
                      <Text variant="bodyMedium">{attachment.name}</Text>
                      <CustomButton
                        mode="text"
                        onPress={() => handleDownload(attachment)}
                        style={styles.downloadButton}
                      >
                        Download
                      </CustomButton>
                    </Card.Content>
                  </Card>
                ))}
              </View>
            </View>
          </>
        )}

        {mockAnnouncement.expiryDate && (
          <View style={styles.expirySection}>
            <Text
              variant="bodySmall"
              style={[styles.expiryText, { color: theme.colors.error }]}
            >
              This announcement will expire on:
              {'\n'}
              {formatDate(mockAnnouncement.expiryDate)}
            </Text>
          </View>
        )}
      </View>
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
  header: {
    gap: 12,
  },
  priorityChip: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
  },
  title: {
    lineHeight: 32,
  },
  divider: {
    marginVertical: 24,
  },
  announcementContent: {
    lineHeight: 24,
  },
  attachmentsSection: {
    gap: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  attachmentsList: {
    gap: 12,
  },
  attachmentCard: {
    elevation: 1,
  },
  attachmentContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  downloadButton: {
    marginRight: -8,
  },
  expirySection: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#fff5f5',
    borderRadius: 8,
  },
  expiryText: {
    textAlign: 'center',
  },
});

export default AnnouncementDetailScreen;

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { CustomButton } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MemberStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<MemberStackParamList, 'MemberHome'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const theme = useTheme();

  const menuItems = [
    {
      title: 'Profile',
      description: 'View and edit your profile information',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      title: 'QRIS Payment',
      description: 'Pay using QRIS',
      onPress: () => navigation.navigate('QRIS'),
    },
    {
      title: 'Iuran',
      description: 'View and manage your contributions',
      onPress: () => navigation.navigate('Iuran'),
    },
    {
      title: 'UMKM Market',
      description: 'Buy and sell products from NU members',
      onPress: () => navigation.navigate('UMKMMarket'),
    },
    {
      title: 'Donations',
      description: 'Contribute to zakat, infaq, wakaf, and sedekah',
      onPress: () => navigation.navigate('Donation'),
    },
    {
      title: 'Cooperative',
      description: 'Access savings and loan services',
      onPress: () => navigation.navigate('Cooperative'),
    },
    {
      title: 'Announcements',
      description: 'View important announcements',
      onPress: () => navigation.navigate('Announcements'),
    },
    {
      title: 'Blog',
      description: 'Read latest news and articles',
      onPress: () => navigation.navigate('Blog'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall">Welcome Back, {user?.name}</Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
          Member ID: {user?.id}
        </Text>
      </View>

      <View style={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <Card
            key={index}
            style={styles.menuCard}
            onPress={item.onPress}
          >
            <Card.Content>
              <Text variant="titleMedium">{item.title}</Text>
              <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                {item.description}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      <View style={styles.infoSection}>
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text variant="titleMedium">Quick Actions</Text>
            <View style={styles.actionButtons}>
              <CustomButton
                mode="contained"
                onPress={() => navigation.navigate('QRIS')}
                style={styles.actionButton}
              >
                Make Payment
              </CustomButton>
              <CustomButton
                mode="outlined"
                onPress={() => navigation.navigate('Donation')}
                style={styles.actionButton}
              >
                Donate
              </CustomButton>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.infoCard}>
          <Card.Content>
            <Text variant="titleMedium">Latest Updates</Text>
            <Text variant="bodySmall" style={styles.updateText}>
              Stay tuned for the latest news and updates from NU.
            </Text>
            <View style={styles.updateActions}>
              <CustomButton
                mode="text"
                onPress={() => navigation.navigate('Announcements')}
                style={styles.updateButton}
              >
                View Announcements
              </CustomButton>
              <CustomButton
                mode="text"
                onPress={() => navigation.navigate('Blog')}
                style={styles.updateButton}
              >
                View Blog
              </CustomButton>
            </View>
          </Card.Content>
        </Card>
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
  menuGrid: {
    padding: 10,
    gap: 10,
  },
  menuCard: {
    marginHorizontal: 10,
    marginBottom: 10,
    elevation: 2,
  },
  infoSection: {
    padding: 20,
    gap: 16,
  },
  infoCard: {
    elevation: 2,
  },
  actionButtons: {
    marginTop: 16,
    gap: 12,
  },
  actionButton: {
    borderRadius: 8,
  },
  updateText: {
    marginTop: 8,
  },
  updateActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 8,
    gap: 16,
  },
  updateButton: {
    marginLeft: -8,
  },
});

export default HomeScreen;

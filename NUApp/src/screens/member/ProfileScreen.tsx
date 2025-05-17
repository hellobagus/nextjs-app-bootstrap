import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Avatar, Divider, useTheme } from 'react-native-paper';
import { CustomButton } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MemberStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<MemberStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const theme = useTheme();

  const profileSections = [
    {
      title: 'Personal Information',
      data: [
        { label: 'Name', value: user?.name },
        { label: 'Email', value: user?.email },
        { label: 'Member ID', value: user?.id },
      ],
    },
    {
      title: 'Membership Details',
      data: [
        { label: 'Status', value: 'Active' },
        { label: 'Join Date', value: '01 January 2024' },
        { label: 'Last Payment', value: '15 January 2024' },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text 
          size={80} 
          label={user?.name?.substring(0, 2)?.toUpperCase() || 'NU'} 
        />
        <Text variant="headlineSmall" style={styles.name}>{user?.name}</Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
          Member
        </Text>
      </View>

      <View style={styles.content}>
        {profileSections.map((section, sectionIndex) => (
          <Card key={sectionIndex} style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                {section.title}
              </Text>
              {section.data.map((item, itemIndex) => (
                <View key={itemIndex}>
                  <View style={styles.infoRow}>
                    <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
                      {item.label}
                    </Text>
                    <Text variant="bodyMedium">{item.value}</Text>
                  </View>
                  {itemIndex < section.data.length - 1 && <Divider style={styles.divider} />}
                </View>
              ))}
            </Card.Content>
          </Card>
        ))}

        <View style={styles.actions}>
          <CustomButton
            mode="contained"
            onPress={() => navigation.navigate('EditProfile')}
            style={styles.button}
          >
            Edit Profile
          </CustomButton>

          <CustomButton
            mode="outlined"
            onPress={logout}
            style={styles.button}
            textColor={theme.colors.error}
          >
            Logout
          </CustomButton>
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
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  name: {
    marginTop: 16,
    marginBottom: 4,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  divider: {
    marginVertical: 8,
  },
  actions: {
    gap: 12,
    marginTop: 8,
  },
  button: {
    borderRadius: 8,
  },
});

export default ProfileScreen;

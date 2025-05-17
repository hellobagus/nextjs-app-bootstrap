import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, useTheme, ProgressBar, Chip } from 'react-native-paper';
import { CustomButton } from '../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MemberStackParamList } from '../../types/navigation';
import { DonationProgram, DonationType } from '../../types/donation';

type Props = NativeStackScreenProps<MemberStackParamList, 'Donation'>;

const donationTypes: { type: DonationType; label: string; description: string }[] = [
  {
    type: 'zakat',
    label: 'Zakat',
    description: 'Fulfill your obligation of zakat to purify your wealth',
  },
  {
    type: 'infaq',
    label: 'Infaq',
    description: 'Contribute to community development and social welfare',
  },
  {
    type: 'wakaf',
    label: 'Wakaf',
    description: 'Make lasting contributions through endowments',
  },
  {
    type: 'sedekah',
    label: 'Sedekah',
    description: 'Give voluntary charity to help those in need',
  },
];

const mockPrograms: DonationProgram[] = [
  {
    id: '1',
    type: 'zakat',
    title: 'Zakat Distribution Program 2024',
    description: 'Help distribute zakat to eligible recipients in your community',
    targetAmount: 500000000,
    currentAmount: 275000000,
    deadline: '2024-12-31',
    imageUrl: 'https://example.com/zakat.jpg',
    status: 'active',
  },
  {
    id: '2',
    type: 'wakaf',
    title: 'Masjid Construction Fund',
    description: 'Support the construction of a new masjid in your area',
    targetAmount: 2000000000,
    currentAmount: 850000000,
    deadline: '2024-06-30',
    imageUrl: 'https://example.com/masjid.jpg',
    status: 'active',
  },
];

const DonationScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [selectedType, setSelectedType] = React.useState<DonationType | null>(null);

  const filteredPrograms = selectedType
    ? mockPrograms.filter(program => program.type === selectedType)
    : mockPrograms;

  const formatAmount = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min(current / target, 1);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          Make a Difference
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
          Choose how you want to contribute to the community
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.typesContainer}
        contentContainerStyle={styles.typesContent}
      >
        {donationTypes.map((item) => (
          <Card
            key={item.type}
            style={[
              styles.typeCard,
              selectedType === item.type && {
                borderColor: theme.colors.primary,
                borderWidth: 2,
              },
            ]}
            onPress={() => setSelectedType(
              selectedType === item.type ? null : item.type
            )}
          >
            <Card.Content>
              <Text variant="titleMedium">{item.label}</Text>
              <Text
                variant="bodySmall"
                style={{ color: theme.colors.outline }}
                numberOfLines={2}
              >
                {item.description}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <View style={styles.programsContainer}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Active Programs
        </Text>

        {filteredPrograms.map((program) => (
          <Card
            key={program.id}
            style={styles.programCard}
            onPress={() => navigation.navigate('DonationDetail', {
              type: program.type,
            })}
          >
            <Card.Cover source={{ uri: program.imageUrl }} />
            <Card.Content style={styles.programContent}>
              <Chip
                mode="outlined"
                style={styles.typeChip}
              >
                {program.type.toUpperCase()}
              </Chip>
              
              <Text variant="titleMedium" style={styles.programTitle}>
                {program.title}
              </Text>
              
              <Text
                variant="bodySmall"
                style={styles.programDescription}
                numberOfLines={2}
              >
                {program.description}
              </Text>

              <View style={styles.progressContainer}>
                <View style={styles.progressHeader}>
                  <Text variant="bodyMedium" style={{ color: theme.colors.primary }}>
                    {formatAmount(program.currentAmount)}
                  </Text>
                  <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                    dari {formatAmount(program.targetAmount)}
                  </Text>
                </View>
                
                <ProgressBar
                  progress={calculateProgress(program.currentAmount, program.targetAmount)}
                  style={styles.progressBar}
                />
                
                {program.deadline && (
                  <Text variant="bodySmall" style={styles.deadline}>
                    Berakhir: {new Date(program.deadline).toLocaleDateString('id-ID')}
                  </Text>
                )}
              </View>

              <CustomButton
                mode="contained"
                onPress={() => navigation.navigate('DonationDetail', {
                  type: program.type,
                })}
                style={styles.donateButton}
              >
                Donate Now
              </CustomButton>
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
  title: {
    marginBottom: 8,
  },
  typesContainer: {
    marginBottom: 20,
  },
  typesContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  typeCard: {
    width: 200,
    marginRight: 12,
  },
  programsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  programCard: {
    marginBottom: 20,
    elevation: 2,
  },
  programContent: {
    gap: 12,
    paddingTop: 16,
  },
  typeChip: {
    alignSelf: 'flex-start',
  },
  programTitle: {
    marginTop: 4,
  },
  programDescription: {
    color: '#666',
  },
  progressContainer: {
    gap: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  deadline: {
    color: '#666',
    textAlign: 'right',
  },
  donateButton: {
    marginTop: 8,
    borderRadius: 8,
  },
});

export default DonationScreen;

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Card, useTheme, TextInput, ProgressBar, Divider } from 'react-native-paper';
import { CustomButton } from '../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MemberStackParamList } from '../../types/navigation';
import { DonationProgram } from '../../types/donation';
import { useAuth } from '../../contexts/AuthContext';

type Props = NativeStackScreenProps<MemberStackParamList, 'DonationDetail'>;

const mockProgram: DonationProgram = {
  id: '1',
  type: 'zakat',
  title: 'Zakat Distribution Program 2024',
  description: 'Help distribute zakat to eligible recipients in your community. Your contribution will help provide essential support to those in need, including food, education, and healthcare assistance.',
  targetAmount: 500000000,
  currentAmount: 275000000,
  deadline: '2024-12-31',
  imageUrl: 'https://example.com/zakat.jpg',
  status: 'active',
};

const DonationDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const predefinedAmounts = [50000, 100000, 250000, 500000];

  const handleDonate = async () => {
    setIsProcessing(true);
    try {
      // TODO: Implement donation processing
      console.log('Processing donation:', {
        amount,
        isAnonymous,
        message,
        programId: mockProgram.id,
        type: route.params.type,
      });
      navigation.navigate('QRIS');
    } catch (error) {
      console.error('Donation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatAmount = (value: number) => {
    return `Rp ${value.toLocaleString('id-ID')}`;
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min(current / target, 1);
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: mockProgram.imageUrl }}
        style={styles.coverImage}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="headlineSmall">{mockProgram.title}</Text>
          <Text variant="bodyMedium" style={styles.description}>
            {mockProgram.description}
          </Text>
        </View>

        <Card style={styles.progressCard}>
          <Card.Content>
            <View style={styles.progressInfo}>
              <View>
                <Text variant="titleLarge" style={{ color: theme.colors.primary }}>
                  {formatAmount(mockProgram.currentAmount)}
                </Text>
                <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                  dari target {formatAmount(mockProgram.targetAmount)}
                </Text>
              </View>
              <View>
                <Text variant="titleMedium">
                  {Math.round(calculateProgress(mockProgram.currentAmount, mockProgram.targetAmount) * 100)}%
                </Text>
                <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                  Tercapai
                </Text>
              </View>
            </View>
            <ProgressBar
              progress={calculateProgress(mockProgram.currentAmount, mockProgram.targetAmount)}
              style={styles.progressBar}
            />
            {mockProgram.deadline && (
              <Text variant="bodySmall" style={styles.deadline}>
                Berakhir: {new Date(mockProgram.deadline).toLocaleDateString('id-ID')}
              </Text>
            )}
          </Card.Content>
        </Card>

        <Divider style={styles.divider} />

        <View style={styles.donationSection}>
          <Text variant="titleMedium">Make a Donation</Text>
          
          <View style={styles.predefinedAmounts}>
            {predefinedAmounts.map((presetAmount) => (
              <CustomButton
                key={presetAmount}
                mode={amount === presetAmount.toString() ? 'contained' : 'outlined'}
                onPress={() => setAmount(presetAmount.toString())}
                style={styles.amountButton}
              >
                {formatAmount(presetAmount)}
              </CustomButton>
            ))}
          </View>

          <TextInput
            label="Custom Amount (Rp)"
            value={amount}
            onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            label="Message (Optional)"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={3}
            style={styles.input}
          />

          <CustomButton
            mode="contained"
            onPress={handleDonate}
            loading={isProcessing}
            disabled={!amount || isProcessing}
            style={styles.donateButton}
          >
            Proceed to Payment
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
  coverImage: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 20,
  },
  header: {
    gap: 8,
    marginBottom: 20,
  },
  description: {
    lineHeight: 24,
    color: '#666',
  },
  progressCard: {
    elevation: 2,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  deadline: {
    marginTop: 8,
    textAlign: 'right',
    color: '#666',
  },
  divider: {
    marginVertical: 24,
  },
  donationSection: {
    gap: 16,
  },
  predefinedAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  amountButton: {
    flex: 1,
    minWidth: '48%',
  },
  input: {
    backgroundColor: '#fff',
  },
  donateButton: {
    marginTop: 8,
    borderRadius: 8,
  },
});

export default DonationDetailScreen;

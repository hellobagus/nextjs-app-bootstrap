import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, TextInput, useTheme } from 'react-native-paper';
import { CustomButton } from '../../components';
import QRCode from 'react-native-qrcode-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MemberStackParamList } from '../../types/navigation';
import { useAuth } from '../../contexts/AuthContext';

type Props = NativeStackScreenProps<MemberStackParamList, 'QRIS'>;

const QRISScreen: React.FC<Props> = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const [amount, setAmount] = React.useState('');
  const [qrValue, setQrValue] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerateQR = () => {
    setIsGenerating(true);
    // In a real app, this would make an API call to generate a QRIS code
    // For demo purposes, we'll create a mock QRIS string
    const mockQrisData = {
      userId: user?.id,
      amount: amount,
      timestamp: new Date().toISOString(),
    };
    
    setQrValue(JSON.stringify(mockQrisData));
    setIsGenerating(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.qrCard}>
          <Card.Content style={styles.qrContent}>
            <Text variant="titleLarge" style={styles.title}>
              QRIS Payment
            </Text>
            
            <View style={styles.amountSection}>
              <TextInput
                label="Amount (Rp)"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              
              <CustomButton
                mode="contained"
                onPress={handleGenerateQR}
                loading={isGenerating}
                disabled={!amount}
                style={styles.generateButton}
              >
                Generate QR Code
              </CustomButton>
            </View>

            {qrValue ? (
              <View style={styles.qrContainer}>
                <QRCode
                  value={qrValue}
                  size={200}
                  backgroundColor="white"
                />
                <Text style={styles.amountText}>
                  Rp {parseInt(amount).toLocaleString('id-ID')}
                </Text>
              </View>
            ) : (
              <View style={styles.placeholderContainer}>
                <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
                  Enter an amount and generate QR code to make a payment
                </Text>
              </View>
            )}
          </Card.Content>
        </Card>

        <Card style={styles.instructionCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.instructionTitle}>
              How to Pay
            </Text>
            <View style={styles.instructionList}>
              <Text style={styles.instructionText}>
                1. Enter the amount you want to pay
              </Text>
              <Text style={styles.instructionText}>
                2. Click "Generate QR Code" button
              </Text>
              <Text style={styles.instructionText}>
                3. Open your mobile banking or e-wallet app
              </Text>
              <Text style={styles.instructionText}>
                4. Scan the QR code using your app's QRIS scanner
              </Text>
              <Text style={styles.instructionText}>
                5. Confirm the payment in your app
              </Text>
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
  content: {
    padding: 20,
    gap: 20,
  },
  qrCard: {
    elevation: 2,
  },
  qrContent: {
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
  },
  amountSection: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  generateButton: {
    width: '100%',
  },
  qrContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
  },
  amountText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholderContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  instructionCard: {
    elevation: 2,
  },
  instructionTitle: {
    marginBottom: 12,
  },
  instructionList: {
    gap: 8,
  },
  instructionText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default QRISScreen;

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, TextInput, useTheme, DataTable } from 'react-native-paper';
import { CustomButton } from '../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MemberStackParamList } from '../../types/navigation';
import { LoanCalculation } from '../../types/cooperative';

type Props = NativeStackScreenProps<MemberStackParamList, 'LoanCalculator'>;

const LoanCalculatorScreen: React.FC<Props> = () => {
  const theme = useTheme();
  const [amount, setAmount] = useState('');
  const [tenure, setTenure] = useState('12');
  const [interestRate, setInterestRate] = useState('0.8');
  const [calculation, setCalculation] = useState<LoanCalculation | null>(null);

  const calculateLoan = () => {
    const principal = parseFloat(amount);
    const months = parseInt(tenure);
    const monthlyRate = parseFloat(interestRate) / 100;

    if (isNaN(principal) || isNaN(months) || isNaN(monthlyRate)) {
      return;
    }

    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const schedule = [];
    let remainingBalance = principal;
    let totalInterest = 0;

    for (let month = 1; month <= months; month++) {
      const interest = remainingBalance * monthlyRate;
      const principalPart = monthlyPayment - interest;
      remainingBalance -= principalPart;
      totalInterest += interest;

      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPart,
        interest,
        remainingBalance: Math.max(0, remainingBalance),
      });
    }

    setCalculation({
      amount: principal,
      tenure: months,
      interestRate: monthlyRate * 100,
      monthlyPayment,
      totalInterest,
      totalPayment: monthlyPayment * months,
      schedule,
    });
  };

  const formatAmount = (value: number) => {
    return `Rp ${Math.round(value).toLocaleString('id-ID')}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.inputCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Simulasi Pinjaman
            </Text>

            <TextInput
              label="Jumlah Pinjaman (Rp)"
              value={amount}
              onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              style={styles.input}
            />

            <TextInput
              label="Jangka Waktu (Bulan)"
              value={tenure}
              onChangeText={setTenure}
              keyboardType="numeric"
              style={styles.input}
            />

            <TextInput
              label="Suku Bunga (% per bulan)"
              value={interestRate}
              onChangeText={setInterestRate}
              keyboardType="numeric"
              style={styles.input}
            />

            <CustomButton
              mode="contained"
              onPress={calculateLoan}
              disabled={!amount || !tenure || !interestRate}
              style={styles.calculateButton}
            >
              Hitung
            </CustomButton>
          </Card.Content>
        </Card>

        {calculation && (
          <>
            <Card style={styles.resultCard}>
              <Card.Content>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Hasil Perhitungan
                </Text>

                <View style={styles.resultItem}>
                  <Text variant="bodyMedium">Angsuran per Bulan</Text>
                  <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
                    {formatAmount(calculation.monthlyPayment)}
                  </Text>
                </View>

                <View style={styles.resultItem}>
                  <Text variant="bodyMedium">Total Bunga</Text>
                  <Text variant="titleMedium">
                    {formatAmount(calculation.totalInterest)}
                  </Text>
                </View>

                <View style={styles.resultItem}>
                  <Text variant="bodyMedium">Total Pembayaran</Text>
                  <Text variant="titleMedium">
                    {formatAmount(calculation.totalPayment)}
                  </Text>
                </View>
              </Card.Content>
            </Card>

            <Card style={styles.scheduleCard}>
              <Card.Content>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Jadwal Angsuran
                </Text>

                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Bulan</DataTable.Title>
                    <DataTable.Title numeric>Pokok</DataTable.Title>
                    <DataTable.Title numeric>Bunga</DataTable.Title>
                    <DataTable.Title numeric>Sisa</DataTable.Title>
                  </DataTable.Header>

                  {calculation.schedule.map((row) => (
                    <DataTable.Row key={row.month}>
                      <DataTable.Cell>{row.month}</DataTable.Cell>
                      <DataTable.Cell numeric>
                        {formatAmount(row.principal)}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {formatAmount(row.interest)}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {formatAmount(row.remainingBalance)}
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </Card.Content>
            </Card>
          </>
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
    padding: 16,
    gap: 16,
  },
  inputCard: {
    elevation: 2,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  calculateButton: {
    borderRadius: 8,
  },
  resultCard: {
    elevation: 2,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scheduleCard: {
    elevation: 2,
  },
});

export default LoanCalculatorScreen;

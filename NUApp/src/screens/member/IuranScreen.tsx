import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, DataTable, useTheme, Chip } from 'react-native-paper';
import { CustomButton } from '../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MemberStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<MemberStackParamList, 'Iuran'>;

interface IuranTransaction {
  id: string;
  date: string;
  amount: number;
  status: 'PAID' | 'PENDING' | 'FAILED';
  method: string;
}

const mockTransactions: IuranTransaction[] = [
  {
    id: '1',
    date: '2024-01-15',
    amount: 50000,
    status: 'PAID',
    method: 'QRIS',
  },
  {
    id: '2',
    date: '2023-12-15',
    amount: 50000,
    status: 'PAID',
    method: 'Bank Transfer',
  },
  {
    id: '3',
    date: '2023-11-15',
    amount: 50000,
    status: 'PAID',
    method: 'QRIS',
  },
];

const IuranScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();

  const getStatusColor = (status: IuranTransaction['status']) => {
    switch (status) {
      case 'PAID':
        return theme.colors.primary;
      case 'PENDING':
        return theme.colors.tertiary;
      case 'FAILED':
        return theme.colors.error;
      default:
        return theme.colors.outline;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.summaryCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.cardTitle}>
              Contribution Summary
            </Text>
            <View style={styles.summaryContent}>
              <View style={styles.summaryItem}>
                <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
                  Last Payment
                </Text>
                <Text variant="titleMedium">
                  {formatDate(mockTransactions[0].date)}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
                  Next Due
                </Text>
                <Text variant="titleMedium">February 15, 2024</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
                  Monthly Amount
                </Text>
                <Text variant="titleMedium">Rp 50.000</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.transactionsCard}>
          <Card.Content>
            <View style={styles.transactionsHeader}>
              <Text variant="titleMedium">Payment History</Text>
              <CustomButton
                mode="text"
                onPress={() => navigation.navigate('QRIS')}
              >
                Pay Now
              </CustomButton>
            </View>

            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Date</DataTable.Title>
                <DataTable.Title numeric>Amount</DataTable.Title>
                <DataTable.Title>Status</DataTable.Title>
              </DataTable.Header>

              {mockTransactions.map((transaction) => (
                <DataTable.Row key={transaction.id}>
                  <DataTable.Cell>
                    {formatDate(transaction.date)}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    Rp {transaction.amount.toLocaleString('id-ID')}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Chip
                      textStyle={{ color: getStatusColor(transaction.status) }}
                      style={[
                        styles.statusChip,
                        { borderColor: getStatusColor(transaction.status) },
                      ]}
                    >
                      {transaction.status}
                    </Chip>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>

        <Card style={styles.infoCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.cardTitle}>
              Information
            </Text>
            <Text variant="bodyMedium" style={styles.infoText}>
              • Monthly contribution is due by the 15th of each month{'\n'}
              • Late payments may affect your membership status{'\n'}
              • For payment issues, please contact your local administrator
            </Text>
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
    padding: 16,
    gap: 16,
  },
  summaryCard: {
    elevation: 2,
  },
  cardTitle: {
    marginBottom: 16,
  },
  summaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 16,
  },
  summaryItem: {
    flex: 1,
    minWidth: 150,
    gap: 4,
  },
  transactionsCard: {
    elevation: 2,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusChip: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  infoCard: {
    elevation: 2,
  },
  infoText: {
    lineHeight: 24,
  },
});

export default IuranScreen;

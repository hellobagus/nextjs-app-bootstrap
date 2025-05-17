import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, useTheme, DataTable } from 'react-native-paper';
import { CustomButton } from '../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MemberStackParamList } from '../../types/navigation';
import { LoanProduct, SavingsAccount } from '../../types/cooperative';

type Props = NativeStackScreenProps<MemberStackParamList, 'Cooperative'>;

const mockLoanProducts: LoanProduct[] = [
  {
    id: '1',
    name: 'Modal Usaha',
    description: 'Pinjaman untuk modal usaha UMKM',
    minAmount: 5000000,
    maxAmount: 50000000,
    interestRate: 0.8,
    minTenure: 6,
    maxTenure: 24,
    requirements: [
      'KTP',
      'Kartu Keluarga',
      'Slip Gaji/Bukti Penghasilan',
      'Proposal Usaha',
    ],
    status: 'active',
  },
  {
    id: '2',
    name: 'Pendidikan',
    description: 'Pinjaman untuk biaya pendidikan',
    minAmount: 2000000,
    maxAmount: 20000000,
    interestRate: 0.5,
    minTenure: 12,
    maxTenure: 36,
    requirements: [
      'KTP',
      'Kartu Keluarga',
      'Slip Gaji/Bukti Penghasilan',
      'Surat Keterangan Sekolah/Kampus',
    ],
    status: 'active',
  },
];

const mockSavingsAccount: SavingsAccount = {
  id: '1',
  userId: '1',
  accountNumber: '1234567890',
  balance: 5000000,
  type: 'regular',
  interestRate: 3,
  lastTransaction: '2024-01-20T10:30:00Z',
};

const CooperativeScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();

  const formatAmount = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.balanceCard}>
          <Card.Content>
            <Text variant="titleMedium">Saldo Simpanan</Text>
            <Text variant="headlineMedium" style={{ color: theme.colors.primary }}>
              {formatAmount(mockSavingsAccount.balance)}
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
              No. Rekening: {mockSavingsAccount.accountNumber}
            </Text>
            <View style={styles.accountActions}>
              <CustomButton
                mode="contained"
                onPress={() => {}}
                style={styles.actionButton}
              >
                Setor
              </CustomButton>
              <CustomButton
                mode="outlined"
                onPress={() => {}}
                style={styles.actionButton}
              >
                Tarik
              </CustomButton>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.loanCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Text variant="titleMedium">Produk Pinjaman</Text>
              <CustomButton
                mode="text"
                onPress={() => navigation.navigate('LoanCalculator')}
              >
                Kalkulator
              </CustomButton>
            </View>

            {mockLoanProducts.map((product) => (
              <Card
                key={product.id}
                style={styles.productCard}
                onPress={() => {}}
              >
                <Card.Content>
                  <Text variant="titleMedium">{product.name}</Text>
                  <Text variant="bodyMedium" style={styles.productDescription}>
                    {product.description}
                  </Text>
                  
                  <DataTable>
                    <DataTable.Row>
                      <DataTable.Cell>Plafon</DataTable.Cell>
                      <DataTable.Cell>
                        {formatAmount(product.minAmount)} - {formatAmount(product.maxAmount)}
                      </DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Cell>Bunga</DataTable.Cell>
                      <DataTable.Cell>{product.interestRate}% per bulan</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Cell>Jangka Waktu</DataTable.Cell>
                      <DataTable.Cell>{product.minTenure} - {product.maxTenure} bulan</DataTable.Cell>
                    </DataTable.Row>
                  </DataTable>

                  <CustomButton
                    mode="contained"
                    onPress={() => {}}
                    style={styles.applyButton}
                  >
                    Ajukan Pinjaman
                  </CustomButton>
                </Card.Content>
              </Card>
            ))}
          </Card.Content>
        </Card>

        <Card style={styles.historyCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Riwayat Transaksi
            </Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Tanggal</DataTable.Title>
                <DataTable.Title>Keterangan</DataTable.Title>
                <DataTable.Title numeric>Jumlah</DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell>20/01/2024</DataTable.Cell>
                <DataTable.Cell>Setoran</DataTable.Cell>
                <DataTable.Cell numeric>+500.000</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>15/01/2024</DataTable.Cell>
                <DataTable.Cell>Angsuran</DataTable.Cell>
                <DataTable.Cell numeric>-750.000</DataTable.Cell>
              </DataTable.Row>
            </DataTable>

            <CustomButton
              mode="text"
              onPress={() => {}}
              style={styles.viewAllButton}
            >
              Lihat Semua
            </CustomButton>
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
  balanceCard: {
    elevation: 2,
  },
  accountActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
  },
  loanCard: {
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  productCard: {
    marginBottom: 16,
    elevation: 1,
  },
  productDescription: {
    color: '#666',
    marginVertical: 8,
  },
  applyButton: {
    marginTop: 16,
    borderRadius: 8,
  },
  historyCard: {
    elevation: 2,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  viewAllButton: {
    marginTop: 8,
    alignSelf: 'center',
  },
});

export default CooperativeScreen;

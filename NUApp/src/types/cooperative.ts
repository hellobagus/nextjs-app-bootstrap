export interface LoanProduct {
  id: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  interestRate: number;
  minTenure: number;
  maxTenure: number;
  requirements: string[];
  status: 'active' | 'inactive';
}

export interface LoanApplication {
  id: string;
  userId: string;
  productId: string;
  amount: number;
  tenure: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed';
  applicationDate: string;
  approvalDate?: string;
  documents: {
    type: string;
    url: string;
  }[];
}

export interface SavingsAccount {
  id: string;
  userId: string;
  accountNumber: string;
  balance: number;
  type: 'regular' | 'deposit';
  interestRate: number;
  lastTransaction: string;
}

export interface LoanCalculation {
  amount: number;
  tenure: number;
  interestRate: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  schedule: {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    remainingBalance: number;
  }[];
}

export interface CooperativeTransaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'loan_disbursement' | 'loan_payment';
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'failed';
  reference: string;
}

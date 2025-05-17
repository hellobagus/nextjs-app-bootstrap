export type DonationType = 'zakat' | 'infaq' | 'wakaf' | 'sedekah';

export interface DonationProgram {
  id: string;
  type: DonationType;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  imageUrl: string;
  status: 'active' | 'completed' | 'expired';
}

export interface DonationTransaction {
  id: string;
  programId: string;
  userId: string;
  amount: number;
  type: DonationType;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  paymentMethod: string;
}

export interface DonationFormData {
  programId: string;
  amount: string;
  type: DonationType;
  name: string;
  email: string;
  message?: string;
  isAnonymous: boolean;
}

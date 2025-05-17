export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MemberStackParamList = {
  MemberHome: undefined;
  Profile: undefined;
  EditProfile: undefined;
  QRIS: undefined;
  Iuran: undefined;
  UMKMMarket: undefined;
  ProductDetail: { productId: string };
  AddProduct: undefined;
  MyProducts: undefined;
  Donation: undefined;
  DonationDetail: { type: 'zakat' | 'infaq' | 'wakaf' | 'sedekah' };
  Cooperative: undefined;
  LoanCalculator: undefined;
  Announcements: undefined;
  AnnouncementDetail: { id: string };
  Blog: undefined;
  BlogPost: { id: string };
};

export type AdminPusatStackParamList = {
  AdminPusatHome: undefined;
  MemberList: undefined;
  MemberDetail: { memberId: string };
  ApprovalList: undefined;
  ManageAnnouncements: undefined;
  ManageBlog: undefined;
  EditBlogPost: { id?: string };
  Reports: undefined;
  ManageBanner: undefined;
};

export type AdminCabangStackParamList = {
  AdminCabangHome: undefined;
  LocalMemberList: undefined;
  LocalMemberDetail: { memberId: string };
  LocalApprovalList: undefined;
  LocalReports: undefined;
  CooperativeManagement: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  MemberApp: undefined;
  AdminPusatApp: undefined;
  AdminCabangApp: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: {
    id: string;
    name: string;
    role: string;
  };
  featuredImage: string;
  category: string[];
  tags: string[];
  publishDate: string;
  lastModified: string;
  status: 'draft' | 'published' | 'archived';
  viewCount: number;
  comments: Comment[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  targetAudience: ('member' | 'adminPusat' | 'adminCabang')[];
  publishDate: string;
  expiryDate?: string;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
  status: 'draft' | 'published' | 'archived';
}

export interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl?: string;
  startDate: string;
  endDate: string;
  position: 'home' | 'donation' | 'marketplace' | 'cooperative';
  priority: number;
  status: 'active' | 'inactive';
  targetAudience: ('member' | 'adminPusat' | 'adminCabang')[];
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  parentId?: string;
  replies?: Comment[];
}

export interface ContentFilter {
  search?: string;
  category?: string[];
  tags?: string[];
  status?: string;
  startDate?: string;
  endDate?: string;
  author?: string;
}

export interface ContentStats {
  totalPosts: number;
  totalViews: number;
  totalComments: number;
  popularPosts: {
    id: string;
    title: string;
    viewCount: number;
  }[];
  recentComments: Comment[];
  categoryDistribution: {
    category: string;
    count: number;
  }[];
}

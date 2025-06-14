export type Comment = {
  id: number;
  productId: number;
  author: string;
  authorId?: number | null;
  text: string;
  createdAt: string;
  rating: number;
};

export type NewComment = {
  productId: number;
  author: string;
  authorId?: number | null;
  text: string;
  createdAt: string;
  rating: number;
};

export interface CarReviewType {
  id: number;
  review_message: string;
  stars: number;
  createdAt: string;
  user: {
    id: number;
    full_name: string;
  };
}

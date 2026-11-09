import {Source} from 'react-native-fast-image';

export interface CompletedOrderCardProps {
  name: string;
  images: string[];
  price_per_hour: string;
  price_per_day: string;
  startDate: string;
  endDate: string;
  host: {
    full_name: string;
    address: string;
    rating: number;
    profile_picture: Source | string;
  };
  user: {
    full_name: string;
    address: string;
    rating: number;
    profile_picture: Source | string;
  };
  booking: {
    start_date_time: string;
    end_date_time: string;
    stars: number | null;
    amount: number;
  };
  handlePress: () => {};
}

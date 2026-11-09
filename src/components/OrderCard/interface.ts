import {Source} from 'react-native-fast-image';

export interface OrderCardProps {
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
    profile_picture: Source;
  };
  user: {
    full_name: string;
    address: string;
    rating: number;
    profile_picture: Source;
  };
  booking: {
    start_date_time: string;
    end_date_time: string;
    amount: number;
  };
  handlePress: () => {};
}

import {Source} from 'react-native-fast-image';

export interface SearchListItemProps {
  id: string;
  name: string;
  images: Source | string[];
  price_per_day: string;
  price_per_hour: string;
  available_start_date_time: string;
  available_end_date_time: string;
  stars?: string | number;
  host: {
    full_name: string;
    address: string;
    rating: number;
    profile_picture: Source;
    stars: string | number;
  };
  onClose?: any;
  isButton?: boolean;
  isMap?: boolean;
  getUserCarsLoading?: boolean;
}

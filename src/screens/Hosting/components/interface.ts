export interface CarItemProps {
  id: string;
  name: string;
  images: string[];
  price_per_day: string;
  price_per_hour: string;
  getHostCarsLoading?: boolean;
}

export interface TwoColumnRowProps {
  heading: string;
  description: string;
}

export interface AboutCarItemProps {
  key: string;
  value: string;
}

export interface AboutCarProps {
  data: {
    key: string;
    value: string;
  };
}

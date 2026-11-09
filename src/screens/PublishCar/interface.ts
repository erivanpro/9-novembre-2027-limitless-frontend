export interface ColorItemType {
  color: string;
  selectedColor?: boolean;
  setSelectedColor: (color: string) => void;
}

export interface CarImagePickerProps {
  images: unknown[];
  setImages: (images: string[]) => void;
}

export interface TransmissionTypeProps {
  selectedTransmission: string;
  setSelectedTransmission: (transmission: string) => void;
}

export interface SummaryItemRowProps {
  title: string;
  value?: string;
  isColor?:boolean;
}

export interface PublishCarChildProps {
  scrollRef: any;
  setCurrentIndex: (index: number) => void;
  data?: any;
}

export interface CarSpecificationErrors {
  color: string | undefined;
  pickup_address: string | undefined;
  dropoff_address: string | undefined;
  booking_dates: string | undefined;
}

export interface CarSpecificationLocation {
  pickup_address: string | undefined;
  dropoff_address: string | undefined;
}

export interface CarFeaturesBadges {
  activeBadges: string[];
  setActiveBadges: (badges: string[]) => void;
  data?: any;
}

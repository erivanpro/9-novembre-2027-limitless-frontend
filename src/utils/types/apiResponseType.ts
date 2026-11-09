export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
  error?: ErrorType | any;
}
export type ImageUploadResponseType = { url: string; message: string };
export interface ErrorType {
  response: {
    data: {
      message: string;
    };
  };
}
//USER
export type AuthApiReponse = {
  user: UserDetailsType;

  access_token?: string;
};

export type VerifyOtpResponseType = {
  user: UserDetailsType;
  access_token: string;
  message: string;
};
export type GenderType = 'male' | 'female';
export type UserRolesType = 'user' | 'host';
export type LocationType = {coordinates: [string, string]; type: string};
//USER DETAILS

export type UserDetailsType = {
  is_rejected: any;
  id: number;
  createdAt: string;
  date_of_birth: string;
  deletedAt: string | null;
  email: string;
  emergency_contact: string;
  expiry_date: string;
  first_name: string;
  last_name: string;
  full_name: string;
  id_card_back: string;
  id_card_front: string;
  is_verified: boolean;
  license_image: string;
  license_number: string;
  location: LocationType;
  onboarding_status: string;
  phone_number: string;
  profile_picture: string;
  updatedAt: string;
  user_type: UserRolesType[];
  country?: string;
  host_onboarding_status: string;
  user_onboarding_status: string;
  host_user_id?: number;
  stripe_customer_id?: string;
  host?: {
    id: number;
  };
  notification_preference?: string;
};

export interface HospitalDetailType {
  id: number;
  abn: number;
  website?: string;
  typeOfPractice: PracticeEnumHospital;
  fieldOfPractice: SmallAnimal | LargeAnimal;
  mixed_percentages?: number[];
}
export interface VetDetailTyoe {
  id: number;
  dob: string;
  gender: GenderType;
  about: string;
}
export interface NurseDetailTyoe {
  id: number;
  dob: string;
  gender: GenderType;
  about: string;
}
export type PracticeEnumHospital =
  | 'smallAnimal'
  | 'largeAnimal'
  | 'mixed'
  | 'exotic';

export interface ProfessionalDetailType {
  id: number;
  veterinaryLicenseNo: string;
  yearsOfExperience: number;
  qualification: string;
  typeOfPractice: PracticeEnumHospital;
  fieldPractices?: (SmallAnimal | LargeAnimal)[];
  radiologyLicenseNo: string;
  expiryDate: string;
  microchipLicenseNo: string;
  insuranceDocument: string;
  resume: string;
}
export interface PersonalDetailType {
  id?: number;
  about: string;
  dob?: string;
  fullname: string;
  typeOfPractice: PracticeEnumHospital;
  gender?: (SmallAnimal | LargeAnimal)[];
  location: string;
  expiryDate: string;
  phoneNumber: string;
  profilePicture: string;
}

export type SmallAnimal = 'GeneralPractice' | 'Emergency' | 'Specialist';

export type LargeAnimal = 'Production' | 'Equine';

export interface CarInfoType {
  name: string;
  description: string;
  brand: string;
  price_per_day: string;
  price_per_hour: string;
  vehicle_type: string;
  country_of_manufacture: string;
  city_of_registeration: string;
  images: string[];
  color: string;
  mileage: string;
  engine_type: string;
  transmission_type: string;
  fuel_economy: string;
  available_start_date_time: string;
  available_end_date_time?: string;
  pickup_address: string;
  dropoff_address: string;
  features: string[];
  maximum_passengers: string;
  luggage_capacity: string;
  insurance_included: boolean;
  pet_policy: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CarSpecificationType {
  id: number;
  carId: number;
  engineSize: string;
  fuelType: string;
  bodyType: string;
  transmission: string;
  mileage: string;
  color: string;
  price: string;
  description: string;
  location: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CarFeaturesType {
  id: number;
  carId: number;
  features: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

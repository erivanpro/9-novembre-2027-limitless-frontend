export type LoginPayloadType = {
  email: string;
  password: string;
  fcm?: string | null;
};
export type RegisterPayloadType = {
  fullname: string;
  email: string;

  password: string;
};
export type FileAttachmentType = {uri: string; type: string; name: string};
export type VerifyOtpPayloadType = {
  email: string;
  OTP: string;
  type: 'Forgot Password' | 'Account Verification';
};
export type VerifyResendOtpPaloadType = {
  email: string;
  type: 'Forgot Password' | 'Account Verification';
};

export type SetNewPasswordPayloadType = {
  newPassword: string;
  confirmPassword: string;
};
type PersonalDetails = {
  fullname: string;
  abn: number;
  typeOfPractice: 'smallAnimal' | 'largeAnimal' | 'mixed';
  fieldOfPractice: 'generalPractice' | 'specialty' | 'emergency';
  location: string;
  mixedPercentages?: number[];
  phoneNumber: string;
  website: string;
  profilePicture: string;
};
type vetPersonalDetails = {
  fullname: string;
  about: string;
  phoneNumber: string;
  gender: 'male' | 'female' | 'other';
  dob: string;
  profilePicture: string;
  location: string;
};
type ProfessionalDetails = {
  veterinaryLicenseNo: string;
  yearsOfExperience: number;
  qualification: string;
  typeOfPractice: 'smallAnimal' | 'largeAnimal' | 'mixed';
  fieldPractices: string[];
  radiologyLicenseNo: string;
  expiryDate: string;
  microchipLicenseNo: string;
  insuranceDocument: string;
  resume: string;
};
export type Timing = {
  startTime: string;
  endTime: string;
};

export type HospitalOnboardPayload = {
  personalDetails: PersonalDetails;
  timings: Timing[];
  stepNumber: number;
};
export type VerNursePayload = {
  personalDetails: vetPersonalDetails;
  professionalDetails: ProfessionalDetails;
  timings: Timing[];
  stepNumber: number;
};

import {UseMutationOptions} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {ErrorResponse} from './errorType';

export type requestOtpTypeOptions = 'FORGOT_PASSWORD' | 'UPDATE_PASSWORD';

export type loginType = {
  email: string;
  password: string;
  language: 'ENGLISH' | 'FRENCH';
};

export type logoutType = {
  id: number;
  fcm_token: string;
};

export type signupType = {
  email: string;
  password: string;
};

export type requestOtpType = {
  language: 'ENGLISH' | 'FRENCH';
  email: string;
  reason: requestOtpTypeOptions;
};

export type verifyOtpType = {
  language: 'ENGLISH' | 'FRENCH';
  email: string;
  otp: number;
  reason: requestOtpTypeOptions;
};

export type resetPasswordType = {
  language: 'ENGLISH' | 'FRENCH';
  email: string;
  otp: number;
  password: string;
  confirmPassword: string;
};

export interface CustomMutateOptions<TVariables>
  extends UseMutationOptions<
    AxiosResponse,
    ErrorResponse,
    TVariables,
    {screenName?: string}
  > {}

export type updateDrivingDetailsType = {
  expiry_date: string;
};

export type changePasswordType = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

export type updateProfileType = {
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_picture?: string;
  date_of_birth: string;
  country: string;
  city: string;
  address: string;
  emergency_contact?: string; // for user
  iban_number?: string; // for host
  bank_account_number?: string; // for host
  user_type?: 'user' | 'host' | ['host', 'user'];
};

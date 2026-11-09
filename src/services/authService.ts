import axiosInstance from '../service/api';
import {formatDate} from '../utils/dayjs';
import {
  changePassword,
  drivingDetails,
  login,
  logoutEndpoint,
  requestOtp,
  resetPassword,
  resetPasswordEndpoint,
  signupEndpoint,
  stripeReCreateLinkEndPoint,
  updateProfileEndpoint,
  uploadImageEndpoint,
  verifyOtp,
} from '../utils/endpoints';
import {
  requestOtpType,
  loginType,
  verifyOtpType,
  updateDrivingDetailsType,
  changePasswordType,
  updateProfileType,
  signupType,
  logoutType,
  resetPasswordType,
} from '../utils/types/loginType';

export const loginService = async (credentials: loginType) => {
  return await axiosInstance.post(login, credentials);
};

export const logoutService = async (payload: logoutType) => {
  return await axiosInstance.post(logoutEndpoint, payload);
};

export const signupService = async (payload: signupType) => {
  return await axiosInstance.post(signupEndpoint, payload);
};

export const requestOtpService = async (credentials: requestOtpType) => {
  return await axiosInstance.post(requestOtp, credentials);
};

export const verifyOtpService = async (credentials: verifyOtpType) => {
  return await axiosInstance.post(verifyOtp, credentials);
};

export const resetPasswordService = async (credentials: resetPasswordType) => {
  return await axiosInstance.post(resetPasswordEndpoint, credentials);
};

export const setDrivingDetailsService = async (
  credentials: updateDrivingDetailsType,
) => {
  return await axiosInstance.post(drivingDetails, credentials);
};

export const updateDrivingDetailsService = async (
  credentials: updateDrivingDetailsType,
) => {
  return await axiosInstance.patch(drivingDetails, credentials);
};

export const changePasswordService = async (
  credentials: changePasswordType,
) => {
  return await axiosInstance.patch(changePassword, credentials);
};

export const uploadImagesService = async (
  images: any[],
  path: 'cars' | 'profile',
  uid?: string,
) => {
  try {
    const allResponses: any[] = [];
    const chunkSize = 2;

    for (let i = 0; i < images.length; i += chunkSize) {
      const batch = images.slice(i, i + chunkSize);
      const formData = new FormData();

      // console.log(`Uploading batch: ${i / chunkSize + 1}`, batch.length);

      batch.forEach((image, index) => {
        formData.append('files', {
          uri: image.path,
          type: image.mime,
          name: uid || `car_image_${Date.now()}_${index}.jpg`,
        } as any);
      });

      const response = await axiosInstance.post(
        `${uploadImageEndpoint}${path}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      allResponses.push(...response.data);
    }

    return allResponses;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export const setProfileService = async (profileDetails: updateProfileType) => {
  return await axiosInstance.post(updateProfileEndpoint, profileDetails);
};

export const updateProfileService = async (
  profileDetails: updateProfileType,
) => {
  return await axiosInstance.patch(updateProfileEndpoint, profileDetails);
};

export const setRecreateStripeLink = async (id: string) => {
  return await axiosInstance.post(
    `${stripeReCreateLinkEndPoint}?accountId=${id}`,
  );
};
export const setProfileProcess = async ({payload}: any) => {
  const {profile_picture, uid, idCard} = payload || {};
  let profile_pic = profile_picture;
  let id_card_front = profile_picture;
  let id_card_back = profile_picture;
  let payloadBody = {
    ...payload,
    profile_picture: '',
    id_card_front: '',
    id_card_back: '',
  };
  if (profile_picture !== null && typeof profile_picture === 'object') {
    const profilePictureResponse = await uploadImagesService(
      [profile_picture],
      'profile',
      `profile_${uid}`,
    );
    profile_pic = profilePictureResponse[0];
  }

  if (
    idCard?.id_card_front !== null &&
    typeof idCard?.id_card_front === 'object'
  ) {
    const idCardResponse = await uploadImagesService(
      [idCard?.id_card_front, idCard?.id_card_back],
      'profile',
    );
    id_card_front = idCardResponse[0];
    id_card_back = idCardResponse[1];
  }
  delete payloadBody.idCard;
  delete payloadBody.uid;

  payloadBody.profile_picture = profile_pic;
  payloadBody.id_card_front = id_card_front;
  payloadBody.id_card_back = id_card_back;

  // profileDetails.user_type = profileDetails.user_type[0];
  return await setProfileService(payloadBody);
};

export const updateProfileProcess = async ({payload}: any) => {
  const {profile_picture, uid} = payload || {};
  let profile_pic = profile_picture;

  let payloadBody = {
    ...payload,
    profile_picture: '',
  };
  if (profile_picture !== null && typeof profile_picture === 'object') {
    const profilePictureResponse = await uploadImagesService(
      [profile_picture],
      'profile',
      `profile_${uid}`,
    );
    profile_pic = profilePictureResponse[0];
  }

  delete payloadBody.uid;

  payloadBody.profile_picture = profile_pic;

  return await updateProfileService(payloadBody);
};

export const setDrivingDetailsProcess = async ({
  license_number,
  expiry_date,
  license_image,
  user_type,
}: any) => {
  let licenseImage = license_image;

  if (license_image !== null && typeof license_image === 'object') {
    const licensePictureResponse = await uploadImagesService(
      [license_image],
      'profile',
      `license_${license_number}`,
    );
    licenseImage = licensePictureResponse[0];
  }

  const payload = {
    license_number,
    expiry_date: expiry_date ? formatDate(expiry_date, 'YYYY-MM-DD') : '',
    license_image: licenseImage,
    user_type: user_type,
  };
  return await setDrivingDetailsService(payload);
};

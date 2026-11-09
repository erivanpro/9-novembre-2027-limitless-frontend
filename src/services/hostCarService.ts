import axiosInstance from '../service/api';
import {formatDate} from '../utils/dayjs';
import {
  getHostCarDetailsEndpoint,
  getHostCarsEndpoint,
  publishCarEndpoint,
  unpublishCarEndpoint,
} from '../utils/endpoints';
import {loginType} from '../utils/types/loginType';
import {uploadImagesService} from './authService';
import {prepareDataForApi} from '../utils/translation/translationUtils';

export const publishCarProcess = async ({
  carDetails,
  images,
  encodeTime,
}: any) => {
  let isEdit = images?.filter((image: any) => typeof image === 'string');
  let imagesToUpload;
  let uploadedImageUrls;
  let imagesToSave;

  if (isEdit?.length > 0) {
    imagesToUpload = images.filter((image: any) => typeof image !== 'string');

    uploadedImageUrls = await uploadImagesService(imagesToUpload, 'cars');
    imagesToSave = [...uploadedImageUrls, ...isEdit];
  } else {
    uploadedImageUrls = await uploadImagesService(images, 'cars');
    imagesToSave = uploadedImageUrls;
  }
  console.log(uploadedImageUrls);
  if (uploadedImageUrls?.length != 0 && uploadedImageUrls) {
    const payload = {...carDetails, images: imagesToSave};

    // Convert translated values to English for API
    const apiPayload = prepareDataForApi(payload);

    const formatedPayload = {
      ...apiPayload,
      mileage: isNaN(apiPayload.mileage) ? 0 : Number(apiPayload.mileage),
      fuel_economy: isNaN(apiPayload.fuel_economy)
        ? 0
        : Number(apiPayload.fuel_economy),
      maximum_passengers: isNaN(apiPayload.maximum_passengers)
        ? 0
        : Number(apiPayload.maximum_passengers),
      luggage_capacity: isNaN(apiPayload.luggage_capacity)
        ? 0
        : Number(apiPayload.luggage_capacity),
      price_per_day: isNaN(apiPayload.price_per_day)
        ? 0
        : Number(apiPayload.price_per_day),
      price_per_hour: isNaN(apiPayload.price_per_hour)
        ? 0
        : Number(apiPayload.price_per_hour),
    };
    formatedPayload.available_start_date_time = `${formatDate(
      formatedPayload?.available_start_date,
      'YYYY-MM-DD',
    )}T${formatDate(formatedPayload?.available_start_time, 'HH:mm')}`;

    formatedPayload.available_end_date_time = `${formatDate(
      formatedPayload?.available_end_date,
      'YYYY-MM-DD',
    )}T${formatDate(formatedPayload?.available_end_time, 'HH:mm')}`;
    delete formatedPayload.available_start_date;
    delete formatedPayload.available_end_date;
    delete formatedPayload.available_start_time;
    delete formatedPayload.available_end_time;

    let startDate = encodeTime(formatedPayload.available_start_date_time);
    let endDate = encodeTime(formatedPayload.available_end_date_time);
    formatedPayload.available_start_date_time = startDate;
    formatedPayload.available_end_date_time = endDate;

    return await publishCarService(formatedPayload);
  }
};

export const publishCarService = async (credentials: loginType) => {
  return await axiosInstance.post(publishCarEndpoint, credentials, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const unpublishCarService = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  return await axiosInstance.patch(
    `${unpublishCarEndpoint}/${id}?status=${type}`,
  );
};

export const updateCarService = async ({carDetails, id, images, encodeTime}: any) => {
  // Convert translated values to English for API
  const apiPayload = prepareDataForApi(carDetails);
  const formatedPayload = apiPayload;

  formatedPayload.available_start_date_time = `${formatDate(
    formatedPayload?.available_start_date,
    'YYYY-MM-DD',
  )}T${formatDate(formatedPayload?.available_start_time, 'HH:mm')}`;

  formatedPayload.available_end_date_time = `${formatDate(
    formatedPayload?.available_end_date,
    'YYYY-MM-DD',
  )}T${formatDate(formatedPayload?.available_end_time, 'HH:mm')}`;
  delete formatedPayload.available_start_date;
  delete formatedPayload.available_end_date;
  delete formatedPayload.available_start_time;
  delete formatedPayload.available_end_time;

  formatedPayload.maximum_passengers = Number(
    formatedPayload.maximum_passengers,
  );
  formatedPayload.price_per_day = Number(formatedPayload.price_per_day);
  formatedPayload.price_per_hour = Number(formatedPayload.price_per_hour);
  formatedPayload.luggage_capacity = Number(formatedPayload.luggage_capacity);
  formatedPayload.mileage = Number(formatedPayload.mileage);
  formatedPayload.fuel_economy = Number(formatedPayload.fuel_economy);

  let alreadyUploadedImagesUrls = images.filter(
    (img: any) => typeof img === 'string',
  );
  let imagesToUpload = images.filter((img: any) => typeof img !== 'string');

  if (imagesToUpload?.length > 0) {
    let uploadedImageUrls = await uploadImagesService(imagesToUpload, 'cars');
    formatedPayload.images = [
      ...alreadyUploadedImagesUrls,
      ...uploadedImageUrls,
    ];
  } else {
    formatedPayload.images = alreadyUploadedImagesUrls;
  }
  let startDate = encodeTime(formatedPayload.available_start_date_time);
  let endDate = encodeTime(formatedPayload.available_end_date_time);
  formatedPayload.available_start_date_time = startDate;
  formatedPayload.available_end_date_time = endDate;
  // console.log(JSON.stringify(formatedPayload, null, 2));
  return await axiosInstance.patch(
    `${publishCarEndpoint}/${id}`,
    formatedPayload,
  );
};

export const getHostCarsService = async ({
  skip = 0,
  take = 100,
}: {
  skip: number;
  take: number;
}) => {
  return await axiosInstance.get(
    `${getHostCarsEndpoint}?skip=${skip}&take=${take}`,
  );
};

export const getHostCarDetailsService = async (filters: any) => {
  return await axiosInstance.get(`${getHostCarDetailsEndpoint}/${filters.id}`);
};

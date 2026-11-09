export const DEFAULT_IMAGE_URL =
  'https://w.wallhaven.cc/full/kx/wallhaven-kxorm6.jpg';

export const API_URL = 'https://d2jwz8z3tk24wm.cloudfront.net/';


export const API_REASONS = {
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
};

export const BRANDS = [
  {label: 'BMW', value: 'BMW'},
  {label: 'Audi', value: 'Audi'},
  {label: 'Mercedes', value: 'Mercedes'},
  {label: 'Ford', value: 'Ford'},
  {label: 'Toyota', value: 'Toyota'},
  {label: 'Honda', value: 'Honda'},
  {label: 'Nissan', value: 'Nissan'},
  {label: 'Hyundai', value: 'Hyundai'},
  {label: 'Kia', value: 'Kia'},
  {label: 'Chevrolet', value: 'Chevrolet'},
  {label: 'Volkswagen', value: 'Volkswagen'},
  {label: 'Fiat', value: 'Fiat'},
  {label: 'Renault', value: 'Renault'},
  {label: 'Peugeot', value: 'Peugeot'},
  {label: 'Citroen', value: 'Citroen'},
  {label: 'Suzuki', value: 'Suzuki'},
  {label: 'Tesla', value: 'Tesla'},
  {label: 'Mitsubishi', value: 'Mitsubishi'},
  {label: 'Alfa-Romeo', value: 'Alfa-Romeo'},
  {label: 'Chrysler', value: 'Chrysler'},
  {label: 'Cupra', value: 'Cupra'},
  {label: 'Daihatsu', value: 'Daihatsu'},
  {label: 'Dodge', value: 'Dodge'},
  {label: 'Jaguar', value: 'Jaguar'},
  {label: 'JEEP', value: 'JEEP'},
  {label: 'Land Rover', value: 'Land Rover'},
  {label: 'Lexus', value: 'Lexus'},
  {label: 'MG', value: 'MG'},
  {label: 'Maserati', value: 'Maserati'},
  {label: 'Mazda', value: 'Mazda'},
  {label: 'Porsche', value: 'Porsche'},
  {label: 'Skoda', value: 'Skoda'},
  {label: 'Volvo', value: 'Volvo'},
  {label: 'Subaru', value: 'Subaru'},
];

export const ENGINE_TYPES = [
  {label: 'engineGasoline', value: 'Gasoline'},
  {label: 'engineDiesel', value: 'Diesel'},
  {label: 'engineElectric', value: 'Electric'},
  {label: 'engineHybrid', value: 'Hybrid'},
];

export const TRANSMISSION_TYPES = [
  {label: 'manualTransmission', value: 'Manual Transmission'},
  {label: 'automaticTransmission', value: 'Automatic Transmission'},
  {label: 'dualClutchTransmission', value: 'Dual-Clutch Transmission'},
  {
    label: 'continuouslyVariableTransmission',
    value: 'Continuously Variable Transmission',
  },
];

export const GEAR_BOX = [
  {label: 'manualGearbox', value: 'Manual Gearbox'},
  {label: 'automaticTransmission', value: 'Automatic Transmission'},
  {label: 'dualClutchTransmission', value: 'Dual-Clutch Transmission'},
  {
    label: 'continuouslyVariableTransmission',
    value: 'Continuously Variable Transmission',
  },
];

export const CAR_FEATURES = [
  {label: 'CHILD_SEAT', value: 'Child Seat'},
  {label: 'GPS', value: 'GPS'},
  {label: 'AIR_CONDITIONING', value: 'Air Conditioning'},
  {label: 'BIKE_RACK', value: 'Bike Rack'},
  {label: 'SHOW_TIRES', value: 'Snow Tires'},
  {label: 'CRUISE_CONTROL', value: 'Cruise Control'},
  {label: 'SNOW_CHAINS', value: 'Snow Chains'},
  {label: 'APPLY_CARPLAY', value: 'Apple Carplay'},
  {label: 'ANDROID_AUTO', value: 'Android Auto'},
  {label: 'FOUR_WHEEL_DRIVE', value: 'Four Wheel Drive'},
];

export const carColors = {
  '#000000': 'Black',
  '#ED2015': 'Red',
  '#E7F733': 'Yellow',
  '#71E582': 'Green',
  '#FF9500': 'Orange',
  '#BDBDBD': 'Grey',
  '#F5F5F5': 'White',
};

export const VEHICLE_TYPES = [
  {label: 'vehicleTypeAll', value: 'All'},
  {label: 'vehicleTypeSUV', value: 'SUV'},
  {label: 'vehicleTypeCoupe', value: 'Coupe'},
  {label: 'vehicleTypeHatchback', value: 'Hatchback'},
  {label: 'vehicleTypeSedan', value: 'Sedan'},
  {label: 'vehicleTypeFamilyVan', value: 'Family Van'},
  {label: 'vehicleType4x4', value: '4x4'},
  {label: 'vehicleTypeConvertible', value: 'Convertible'},
  {label: 'vehicleTypeSportsCar', value: 'Sports Car'},
  {label: 'vehicleTypeLimousine', value: 'Limousine'},
  {label: 'vehicleTypeExoticCar', value: 'Exotic Car'},
  {label: 'vehicleTypePickupTruck', value: 'Pickup Truck'},
  {label: 'vehicleTypeTruck', value: 'Truck'},
  {label: 'vehicleTypeEV', value: 'Electric Vehicle (EV)'},
  {label: 'vehicleTypeHybridVehicle', value: 'Hybrid Vehicle'},
];

export const BOOKING_CANCELLATION_REASONS = [
  {label: 'optionNoJourney', value: "I do not need this journey"},
  {
    label: 'optionChangeDetails',
    value: 'I want to change the details of the journey',
  },
  {
    label: 'optionDriverDelay',
    value: 'The driver took too long to be appointed',
  },
  {label: 'optionOther', value: 'Other'},
];

// Translation constants for error and success messages
export const TRANSLATION_CONSTANTS = {
  // Error messages
  ERROR: 'error',
  SUCCESS: 'success',
  IMAGE_SIZE_ERROR: 'imageSizeError',
  CAR_PUBLISHED_SUCCESS: 'carPublishedSuccessfully',
  REVIEW_ADDED_SUCCESS: 'reviewAddedSuccessfully',
  
  // Form validation errors
  FIELD_REQUIRED: 'fieldRequired',
  EMAIL_REQUIRED: 'emailRequired',
  INVALID_EMAIL: 'invalidEmailAddress',
  PASSWORD_TOO_SHORT: 'passwordTooShort',
  PASSWORDS_DONT_MATCH: 'passwordsDontMatch',
  INVALID_PHONE_NUMBER: 'invalidPhoneNumber',
  
  // Car-related validation errors
  CAR_NAME_REQUIRED: 'carNameRequired',
  BRAND_NAME_REQUIRED: 'brandNameRequired',
  CAR_DESCRIPTION_REQUIRED: 'carDescriptionRequired',
  PRICE_PER_DAY_REQUIRED: 'pricePerDayRequired',
  PRICE_PER_HOUR_REQUIRED: 'pricePerHourRequired',
  VEHICLE_TYPE_REQUIRED: 'vehicleTypeRequired',
  COUNTRY_REQUIRED: 'countryRequired',
  CITY_REQUIRED: 'cityRequired',
  CAR_MILEAGE_REQUIRED: 'carMileageRequired',
  ENGINE_TYPE_REQUIRED: 'engineTypeRequired',
  TRANSMISSION_TYPE_REQUIRED: 'transmissionTypeRequired',
  FUEL_ECONOMY_REQUIRED: 'fuelEconomyRequired',
  BOOKING_DATE_REQUIRED: 'bookingDateRequired',
  MAX_PASSENGERS_REQUIRED: 'maxPassengersRequired',
  LUGGAGE_CAPACITY_REQUIRED: 'luggageCapacityRequired',
  
  // License-related validation errors
  LICENSE_NUMBER_REQUIRED: 'licenseNumberRequired',
  LICENSE_EXPIRY_REQUIRED: 'licenseExpiryRequired',
  REVIEW_REQUIRED: 'reviewRequired',
  
  // Generic messages
  OPERATION_SUCCESS: 'operationSuccess',
  OPERATION_FAILED: 'operationFailed',
  NETWORK_ERROR: 'networkError',
  SERVER_ERROR: 'serverError',
};

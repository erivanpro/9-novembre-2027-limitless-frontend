import {translate} from './language';

// Reverse mapping from translated values back to English API values
const reverseTranslationMap = {
  // Vehicle Types
  SUV: 'SUV',
  Coupe: 'Coupe',
  Hatchback: 'Hatchback',
  Sedan: 'Sedan',
  'Family Van': 'Family Van',
  Convertible: 'Convertible',
  'Sports Car': 'Sports Car',
  Limousine: 'Limousine',
  'Exotic Car': 'Exotic Car',
  'Pickup Truck': 'Pickup Truck',
  Truck: 'Truck',
  'Electric Vehicle (EV)': 'Electric Vehicle (EV)',
  'Hybrid Vehicle': 'Hybrid Vehicle',

  // French translations back to English

  Coupé: 'Coupe',
  Hayon: 'Hatchback',
  Berline: 'Sedan',
  Monospace: 'Family Van',
  '4x4': '4x4',
  Cabriolet: 'Convertible',
  'Voiture de sport': 'Sports Car',
  'Voiture exotique': 'Exotic Car',
  'Pick-up': 'Pickup Truck',
  Camion: 'Truck',
  'Véhicule électrique (VE)': 'Electric Vehicle (EV)',
  'Véhicule hybride': 'Hybrid Vehicle',

  // Engine Types
  Gasoline: 'Gasoline',
  Diesel: 'Diesel',
  Electric: 'Electric',
  Hybrid: 'Hybrid',

  // French engine types
  Essence: 'Gasoline',
  Électrique: 'Electric',
  Hybride: 'Hybrid',

  // Transmission Types
  'Manual Transmission': 'Manual Transmission',
  'Automatic Transmission': 'Automatic Transmission',
  'Dual-Clutch Transmission': 'Dual-Clutch Transmission',
  'Continuously Variable Transmission': 'Continuously Variable Transmission',

  // French transmission types
  'Transmission manuelle': 'Manual Transmission',
  'Transmission automatique': 'Automatic Transmission',
  'Transmission à double embrayage': 'Dual-Clutch Transmission',
  'Transmission à variation continue': 'Continuously Variable Transmission',

  // Car Features
  'Child Seat': 'Child Seat',
  GPS: 'GPS',
  'Air Conditioning': 'Air Conditioning',
  'Bike Rack': 'Bike Rack',
  'Snow Tires': 'Snow Tires',
  'Cruise Control': 'Cruise Control',
  'Snow Chains': 'Snow Chains',
  'Apple CarPlay': 'Apple CarPlay',
  'Android Auto': 'Android Auto',
  'Four Wheel Drive': 'Four Wheel Drive',

  // French car features
  'Siège enfant': 'Child Seat',
  Climatisation: 'Air Conditioning',
  'Porte-vélos': 'Bike Rack',
  'Pneus neige': 'Snow Tires',
  'Régulateur de vitesse': 'Cruise Control',
  'Chaînes à neige': 'Snow Chains',
  'Quatre roues motrices': 'Four Wheel Drive',

  // Colors
  Black: 'Black',
  Red: 'Red',
  Yellow: 'Yellow',
  Green: 'Green',
  Orange: 'Orange',
  Grey: 'Grey',
  White: 'White',
  Noir: 'Black',
  Rouge: 'Red',
  Jaune: 'Yellow',
  Vert: 'Green',
  Gris: 'Grey',
  Blanc: 'White',
};

export const getApiValue = (translatedValue: string): string => {
  return (
    reverseTranslationMap[
      translatedValue as keyof typeof reverseTranslationMap
    ] || translatedValue
  );
};

export const getDisplayValue = (
  apiValue: string,
  language: 'en' | 'fr' = 'en',
): string => {
  // For vehicle types
  if (apiValue === 'SUV') return language === 'fr' ? 'SUV' : 'SUV';
  if (apiValue === 'Coupe') return language === 'fr' ? 'Coupé' : 'Coupe';
  if (apiValue === 'Hatchback')
    return language === 'fr' ? 'Hayon' : 'Hatchback';
  if (apiValue === 'Sedan') return language === 'fr' ? 'Berline' : 'Sedan';
  if (apiValue === 'Family Van')
    return language === 'fr' ? 'Monospace' : 'Family Van';
  if (apiValue === '4x4') return language === 'fr' ? '4x4' : '4x4';
  if (apiValue === 'Convertible')
    return language === 'fr' ? 'Cabriolet' : 'Convertible';
  if (apiValue === 'Sports Car')
    return language === 'fr' ? 'Voiture de sport' : 'Sports Car';
  if (apiValue === 'Limousine')
    return language === 'fr' ? 'Limousine' : 'Limousine';
  if (apiValue === 'Exotic Car')
    return language === 'fr' ? 'Voiture exotique' : 'Exotic Car';
  if (apiValue === 'Pickup Truck')
    return language === 'fr' ? 'Pick-up' : 'Pickup Truck';
  if (apiValue === 'Truck') return language === 'fr' ? 'Camion' : 'Truck';
  if (apiValue === 'Electric Vehicle (EV)')
    return language === 'fr'
      ? 'Véhicule électrique (VE)'
      : 'Electric Vehicle (EV)';
  if (apiValue === 'Hybrid Vehicle')
    return language === 'fr' ? 'Véhicule hybride' : 'Hybrid Vehicle';

  // For engine types
  if (apiValue === 'Gasoline')
    return language === 'fr' ? 'Essence' : 'Gasoline';
  if (apiValue === 'Diesel') return language === 'fr' ? 'Diesel' : 'Diesel';
  if (apiValue === 'Electric')
    return language === 'fr' ? 'Électrique' : 'Electric';
  if (apiValue === 'Hybrid') return language === 'fr' ? 'Hybride' : 'Hybrid';

  // For transmission types
  if (apiValue === 'Manual Transmission')
    return language === 'fr' ? 'Transmission manuelle' : 'Manual Transmission';
  if (apiValue === 'Automatic Transmission')
    return language === 'fr'
      ? 'Transmission automatique'
      : 'Automatic Transmission';
  if (apiValue === 'Dual-Clutch Transmission')
    return language === 'fr'
      ? 'Transmission à double embrayage'
      : 'Dual-Clutch Transmission';
  if (apiValue === 'Continuously Variable Transmission')
    return language === 'fr'
      ? 'Transmission à variation continue'
      : 'Continuously Variable Transmission';

  // For car features
  if (apiValue === 'Child Seat')
    return language === 'fr' ? 'Siège enfant' : 'Child Seat';
  if (apiValue === 'GPS') return language === 'fr' ? 'GPS' : 'GPS';
  if (apiValue === 'Air Conditioning')
    return language === 'fr' ? 'Climatisation' : 'Air Conditioning';
  if (apiValue === 'Bike Rack')
    return language === 'fr' ? 'Porte-vélos' : 'Bike Rack';
  if (apiValue === 'Snow Tires')
    return language === 'fr' ? 'Pneus neige' : 'Snow Tires';
  if (apiValue === 'Cruise Control')
    return language === 'fr' ? 'Régulateur de vitesse' : 'Cruise Control';
  if (apiValue === 'Snow Chains')
    return language === 'fr' ? 'Chaînes à neige' : 'Snow Chains';
  if (apiValue === 'Apple CarPlay')
    return language === 'fr' ? 'Apple CarPlay' : 'Apple CarPlay';
  if (apiValue === 'Android Auto')
    return language === 'fr' ? 'Android Auto' : 'Android Auto';
  if (apiValue === 'Four Wheel Drive')
    return language === 'fr' ? 'Quatre roues motrices' : 'Four Wheel Drive';

  // For colors
  if (apiValue === 'Black') return language === 'fr' ? 'Noir' : 'Black';
  if (apiValue === 'Red') return language === 'fr' ? 'Rouge' : 'Red';
  if (apiValue === 'Yellow') return language === 'fr' ? 'Jaune' : 'Yellow';
  if (apiValue === 'Green') return language === 'fr' ? 'Vert' : 'Green';
  if (apiValue === 'Orange') return language === 'fr' ? 'Orange' : 'Orange';
  if (apiValue === 'Grey') return language === 'fr' ? 'Gris' : 'Grey';
  if (apiValue === 'White') return language === 'fr' ? 'Blanc' : 'White';

  // Return original value if no translation found
  return apiValue;
};

export const getApiValues = (translatedValues: string[]): string[] => {
  return translatedValues.map(value => getApiValue(value));
};

export const getDisplayValues = (
  apiValues: string[],
  language: 'en' | 'fr' = 'en',
): string[] => {
  return apiValues.map(value => getDisplayValue(value, language));
};

export const prepareDataForApi = (data: any): any => {
  const apiData = {...data};

  // Convert vehicle type
  if (apiData.vehicle_type) {
    apiData.vehicle_type = getApiValue(apiData.vehicle_type);
  }

  // Convert engine type
  if (apiData.engine_type) {
    apiData.engine_type = getApiValue(apiData.engine_type);
  }

  // Convert transmission type
  if (apiData.transmission_type) {
    apiData.transmission_type = getApiValue(apiData.transmission_type);
  }

  // Convert features array
  if (apiData.features && Array.isArray(apiData.features)) {
    apiData.features = getApiValues(apiData.features);
  }

  // Convert color
  if (apiData.color) {
    apiData.color = getApiValue(apiData.color);
  }

  return apiData;
};

export const prepareDataForDisplay = (
  data: any,
  language: 'en' | 'fr' = 'en',
): any => {
  const displayData = {...data};

  // Convert vehicle type
  if (displayData.vehicle_type) {
    displayData.vehicle_type = getDisplayValue(
      displayData.vehicle_type,
      language,
    );
  }

  // Convert engine type
  if (displayData.engine_type) {
    displayData.engine_type = getDisplayValue(
      displayData.engine_type,
      language,
    );
  }

  // Convert transmission type
  if (displayData.transmission_type) {
    displayData.transmission_type = getDisplayValue(
      displayData.transmission_type,
      language,
    );
  }

  // Convert features array
  if (displayData.features && Array.isArray(displayData.features)) {
    displayData.features = getDisplayValues(displayData.features, language);
  }

  // Convert color
  if (displayData.color) {
    displayData.color = getDisplayValue(displayData.color, language);
  }

  return displayData;
};


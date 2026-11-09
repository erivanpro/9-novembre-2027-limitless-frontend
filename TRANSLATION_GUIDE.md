# Translation System Guide

## Overview

This app implements a comprehensive translation system that ensures:

- **UI displays in user's preferred language** (French/English)
- **API calls always send data in English** (for backend consistency)
- **Automatic bidirectional translation** between display and API formats

## Key Components

### 1. Translation Files

- `src/utils/translation/language.ts` - Main translation keys
- `src/utils/translation/translationUtils.ts` - Translation utilities

### 2. Translation Hook

- `src/hooks/useTranslate.ts` - Main translation hook for UI text

### 3. Language Store

- `src/service/store/language.store.ts` - Manages current language state

## How It Works

### For UI Text (Static Content)

```typescript
import useTranslate from '../hooks/useTranslate';

const MyComponent = () => {
  const {t} = useTranslate();

  return <Text>{t('welcomeToLimitless')}</Text>;
};
```

### For API Data (Dynamic Content)

#### When Sending Data to API:

```typescript
import {prepareDataForApi} from '../utils/translation/translationUtils';

// User selects "Berline" (French) in UI
const carData = {
  vehicle_type: 'Berline', // French value from UI
  engine_type: 'Essence', // French value from UI
  features: ['Siège enfant', 'GPS'], // French values from UI
};

// Convert to English for API
const apiData = prepareDataForApi(carData);
// Result: { vehicle_type: 'Sedan', engine_type: 'Gasoline', features: ['Child Seat', 'GPS'] }

// Send to API
await publishCarService(apiData);
```

#### When Receiving Data from API:

```typescript
import {prepareDataForDisplay} from '../utils/translation/translationUtils';
import useLanguageStore from '../service/store/language.store';

const {language} = useLanguageStore.getState();

// API returns English data
const apiData = {
  vehicle_type: 'Sedan',
  engine_type: 'Gasoline',
  features: ['Child Seat', 'GPS'],
};

// Convert to display language
const displayData = prepareDataForDisplay(apiData, language);
// Result (if French): { vehicle_type: 'Berline', engine_type: 'Essence', features: ['Siège enfant', 'GPS'] }
```

## Supported Data Types

### Vehicle Types

- English: `SUV`, `Coupe`, `Hatchback`, `Sedan`, `Family Van`, `4x4`, `Convertible`, `Sports Car`, `Limousine`, `Exotic Car`, `Pickup Truck`, `Truck`, `Electric Vehicle (EV)`, `Hybrid Vehicle`
- French: `SUV`, `Coupé`, `Hayon`, `Berline`, `Monospace`, `4x4`, `Cabriolet`, `Voiture de sport`, `Limousine`, `Voiture exotique`, `Pick-up`, `Camion`, `Véhicule électrique (VE)`, `Véhicule hybride`

### Engine Types

- English: `Gasoline`, `Diesel`, `Electric`, `Hybrid`
- French: `Essence`, `Diesel`, `Électrique`, `Hybride`

### Transmission Types

- English: `Manual Transmission`, `Automatic Transmission`, `Dual-Clutch Transmission`, `Continuously Variable Transmission`
- French: `Transmission manuelle`, `Transmission automatique`, `Transmission à double embrayage`, `Transmission à variation continue`

### Car Features

- English: `Child Seat`, `GPS`, `Air Conditioning`, `Bike Rack`, `Snow Tires`, `Cruise Control`, `Snow Chains`, `Apple CarPlay`, `Android Auto`, `Four Wheel Drive`
- French: `Siège enfant`, `GPS`, `Climatisation`, `Porte-vélos`, `Pneus neige`, `Régulateur de vitesse`, `Chaînes à neige`, `Apple CarPlay`, `Android Auto`, `Quatre roues motrices`

### Colors

- English: `Black`, `Red`, `Yellow`, `Green`, `Orange`, `Grey`, `White`
- French: `Noir`, `Rouge`, `Jaune`, `Vert`, `Orange`, `Gris`, `Blanc`

## Implementation Examples

### 1. Form Components

```typescript
// In a form where user selects vehicle type
const [selectedVehicleType, setSelectedVehicleType] = useState('');

// When submitting form
const handleSubmit = () => {
  const apiData = prepareDataForApi({
    vehicle_type: selectedVehicleType, // Could be French or English
    // ... other fields
  });

  // apiData.vehicle_type will always be English
  await submitToAPI(apiData);
};
```

### 2. Display Components

```typescript
// In a component that displays car details
const CarDetails = ({carData}) => {
  const {language} = useLanguageStore.getState();
  const displayData = prepareDataForDisplay(carData, language);

  return (
    <View>
      <Text>Vehicle Type: {displayData.vehicle_type}</Text>
      <Text>Engine: {displayData.engine_type}</Text>
    </View>
  );
};
```

### 3. API Service Layer

```typescript
// In API service functions
export const publishCarService = async carDetails => {
  // Ensure data is in English before sending to API
  const apiData = prepareDataForApi(carDetails);

  return await axiosInstance.post('/cars', apiData);
};
```

### 4. Query Hooks

```typescript
// In React Query select functions
const getCarDetailsQuery = useQuery({
  queryKey: ['carDetails', id],
  queryFn: () => getCarDetailsService(id),
  select: data => {
    const {language} = useLanguageStore.getState();
    return prepareDataForDisplay(data.car, language);
  },
});
```

## Best Practices

1. **Always use `prepareDataForApi()` before sending data to API**
2. **Always use `prepareDataForDisplay()` when receiving data from API**
3. **Use translation keys for static UI text**
4. **Keep API data in English format**
5. **Test both languages thoroughly**

## Adding New Translatable Fields

1. **Add translation keys** to `language.ts`:

```typescript
en: {
  newField: 'English Value',
  // ...
},
fr: {
  newField: 'French Value',
  // ...
}
```

2. **Add to translation utilities** in `translationUtils.ts`:

```typescript
// Add to reverseTranslationMap
const reverseTranslationMap = {
  'English Value': 'English Value',
  'French Value': 'English Value',
  // ...
};

// Add to getDisplayValue function
export const getDisplayValue = (
  apiValue: string,
  language: 'en' | 'fr' = 'en',
): string => {
  if (apiValue === 'English Value')
    return language === 'fr' ? 'French Value' : 'English Value';
  // ...
};
```

3. **Update prepareDataForApi and prepareDataForDisplay functions** to handle the new field.

## Testing

- Test with both English and French language settings
- Verify API calls always send English data
- Verify UI always displays in selected language
- Test form submissions and data display
- Test with all supported data types


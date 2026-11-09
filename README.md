This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli). - Version 0.81.4

## Project Details

- Make sure to update your nvm path in `ios/.env.local` file
- Node Version: v22.11.0
- Package Manager: Node / Nvm

## Backend API

- **Limitless mobile app API:** `https://d2jwz8z3tk24wm.cloudfront.net/`
- The app uses this base URL for its REST API requests and its Socket.IO chat connection.
- The URL is configured in [`src/utils/constants.ts`](src/utils/constants.ts).
- This is the Limitless mobile app backend; it is separate from the Erivan AI FastAPI backend.

## Code Structure

- **How many screens are in the app ?**

  - Check the src/screens/index file

- **How many shared components are used in the app ?**

  - Check the src/components/index file

- **Do we have global theme setup ?**
  - Global theme setup is in src/utils/theme.tsx
  - It includes:
    - images path
    - font names mapping
    - color codes
    - global styles (i.e section padding, inputs padding etc)

- **Why there are duplicate components with minor difference ?**
  - Since this app has 2 roles and 1 user can have both roles, so it will create complications in future to handle different events on different clicks with different role.
  - User can be host and host can be user, so showing edit options (for car details) for only host user id and related handling will create more complexity in furture so to keep things simple separate components are created.

## Public repository setup

The repository intentionally omits Firebase configuration, Google API keys, Android signing keys, and release packages. Add your own credentials before using the related services:

- Add `android/app/google-services.json` and `ios/GoogleService-Info.plist` from your Firebase project.
- Replace `YOUR_GOOGLE_MAPS_API_KEY` in `android/app/src/main/AndroidManifest.xml` and `ios/limitless_mobile_app/AppDelegate.swift`.
- Replace `YOUR_GOOGLE_PLACES_API_KEY` in `src/components/GooglePlacesInput/index.tsx`.
- For Android release signing, copy `android/keystore.properties.example` to `android/keystore.properties` and use your local signing key.

Keep real credentials and signing files out of Git.

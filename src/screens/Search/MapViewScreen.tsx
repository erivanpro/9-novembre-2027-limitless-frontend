import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {CustomImage} from '../../components';
import {COLORS, IMAGES} from '../../utils/theme';
import {useUserCar} from '../../hooks/useUserCar';
import SearchListItem from './component/SearchListItem';
import useAppAccentColor from '../../hooks/useAppAccentColor';

const LIGHT_MAP_STYLE = [
  {elementType: 'geometry', stylers: [{color: '#F6F7F4'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#808780'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#F6F7F4'}]},
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry',
    stylers: [{color: '#FAFBF9'}],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{color: '#E4E8E3'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{visibility: 'off'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{color: '#E8F1E6'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#FFFFFF'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#E4E8E3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#F0F2EE'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#DDE2DD'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{color: '#E5F0F3'}],
  },
];

interface MapViewScreenProps {
  showListView: () => void;
  userRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

const MapViewScreen = ({showListView, userRegion}: MapViewScreenProps) => {
  const accentColor = useAppAccentColor();
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView | null>(null);
  const mapReadyRef = useRef(false);
  const [carId, setCarId] = useState(null);
  const {getUserCarMap} = useUserCar();
  const data = getUserCarMap?.data?.pages[0]?.data;

  const {getUserCarDetails, getUserCarDetailsLoading} = useUserCar({id: carId});
  const carDetails = getUserCarDetails?.data?.data?.car;

  const animateStyledCamera = useCallback(() => {
    mapRef.current?.animateCamera(
      {
        center: {
          latitude: userRegion.latitude,
          longitude: userRegion.longitude,
        },
        heading: 0,
        pitch: 55,
        zoom: 16,
      },
      {duration: 350},
    );
  }, [userRegion.latitude, userRegion.longitude]);

  useEffect(() => {
    if (mapReadyRef.current) {
      animateStyledCamera();
    }
  }, [animateStyledCamera]);

  const Markers = useCallback(() => {
    return data?.map(val => (
      <Marker
        onPress={() => setCarId(val.id)}
        key={val.id}
        coordinate={{
          latitude: val?.pickup_location?.lat,
          longitude: val?.pickup_location?.long,
        }}>
        <CustomImage
          source={IMAGES.mapTeslaGreen}
          containerStyle={{height: 45, width: 68, zIndex: 999999}}
        />
      </Marker>
    ));
  }, [data]);

  const UserMarkers = useCallback(() => {
    return (
      <Marker
        key={`user-location-${userRegion?.latitude}-${userRegion?.longitude}`}
        coordinate={{
          latitude: userRegion?.latitude,
          longitude: userRegion?.longitude,
        }}
        anchor={{x: 0.5, y: 1}}
        zIndex={999}>
        <CustomImage
          key={userRegion?.latitude}
          tintColor={accentColor}
          source={IMAGES.locationPin}
          containerStyle={{height: 60, width: 60, zIndex: 999999}}
        />
      </Marker>
    );
  }, [accentColor, userRegion?.latitude, userRegion?.longitude]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        loadingEnabled={true}
        onMapReady={() => {
          mapReadyRef.current = true;
          animateStyledCamera();
        }}
        customMapStyle={LIGHT_MAP_STYLE}
        showsBuildings={true}
        pitchEnabled={true}
        style={styles.map}
        initialCamera={{
          center: {
            latitude: userRegion.latitude,
            longitude: userRegion.longitude,
          },
          heading: 0,
          pitch: 55,
          zoom: 16,
        }}>
        <Markers />

        <UserMarkers />
      </MapView>
      <CustomImage
        source={IMAGES.back}
        containerStyle={[
          styles.backImage,
          {
            top: Math.max(
              insets.top + widthPercentageToDP(2),
              widthPercentageToDP(5),
            ),
          },
        ]}
        onPressImage={showListView}
      />
      {!!carDetails?.id && (
        <View style={styles.mapCard}>
          {getUserCarDetailsLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          ) : (
            <SearchListItem
              {...carDetails}
              isMap={true}
              isButton={true}
              onClose={() => {
                setCarId('');
              }}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default MapViewScreen;

const styles = StyleSheet.create({
  container: {flex: 1, overflow: 'hidden'},
  backImage: {
    position: 'absolute',
    left: widthPercentageToDP(6),
    zIndex: 2,
    elevation: 6,
    backgroundColor: COLORS.white,
    borderRadius: widthPercentageToDP(10),
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(10),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  mapCard: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    paddingHorizontal: widthPercentageToDP(3),
    // right: widthPercentageToDP(5),
    bottom: widthPercentageToDP(30),
  },
  loaderContainer: {
    minHeight: widthPercentageToDP(52),
    width: widthPercentageToDP(80),
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

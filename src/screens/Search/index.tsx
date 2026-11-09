import Geolocation from '@react-native-community/geolocation';
import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Linking, PermissionsAndroid, Platform, View} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {InfoModal} from '../../components';
import useUserStore from '../../service/store/user.store';
import {IMAGES} from '../../utils/theme';
import MapViewScreen from './MapViewScreen';
import SearchListingScreen from './SearchListing';
import useTranslate from '../../hooks/useTranslate';

const SearchScreen = () => {
  const {t} = useTranslate();
  const mapSheetRef = useRef<BottomSheetModal>(null);
  const mapSheetSnapPoints = useMemo(() => ['55%', '100%'], []);
  const isFocused = useIsFocused();
  const [userRegion, setUserRegion] = useState({
    latitude: 48.864716,
    longitude: 2.349014,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [showEnableLocation, setShowEnableLocation] = useState(false);
  const {userDetails} = useUserStore();
  const closeMapView = useCallback(() => {
    mapSheetRef.current?.dismiss();
  }, []);
  const renderMapBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.28}
        pressBehavior="close"
      />
    ),
    [],
  );

  useEffect(() => {
    if (isFocused) {
      mapSheetRef.current?.present();
    } else {
      mapSheetRef.current?.dismiss();
    }
  }, [isFocused]);
  const handlePermission = async () => {
    if (!userDetails) return;
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission denied');
        setShowEnableLocation(true);
        return null;
      }
    }
  };

  useEffect(() => {
    handlePermission();
  }, []);

  const getCoords = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const getCurrentPosition = async () => {
    if (!userDetails) return;

    try {
      const res: any = await getCoords();

      setUserRegion({
        latitude: res?.coords?.latitude,
        longitude: res?.coords?.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      return {lat: res?.coords?.latitude, long: res?.coords?.longitude};
    } catch (err) {
      console.log({err});
      setUserRegion({
        latitude: 48.864716,
        longitude: 2.349014,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  useEffect(() => {
    if (isFocused) {
      getCurrentPosition();
    }
  }, [isFocused]);

  return (
    <View style={{flex: 1}}>
      <SearchListingScreen isFocused={isFocused} />

      <BottomSheetModal
        ref={mapSheetRef}
        index={0}
        snapPoints={mapSheetSnapPoints}
        enablePanDownToClose
        enableContentPanningGesture={false}
        topInset={0}
        backgroundStyle={{backgroundColor: '#FFFFFF'}}
        handleIndicatorStyle={{backgroundColor: '#BDBDBD', width: 40}}
        backdropComponent={renderMapBackdrop}>
        <BottomSheetView style={{flex: 1}}>
          <MapViewScreen
            userRegion={userRegion}
            showListView={closeMapView}
          />
        </BottomSheetView>
      </BottomSheetModal>

      {showEnableLocation && (
        <InfoModal
          maxHeight={widthPercentageToDP(70)}
          isVisible={showEnableLocation}
          title={t('enableLocation')}
          description={t('enableLocationToSeeCarNearYou')}
          iconImage={IMAGES.locationSpark}
          iconStyle={{
            width: widthPercentageToDP(15),
            height: widthPercentageToDP(15),
          }}
          btnText={t('allow')}
          btnOnPress={() => {
            Linking.openSettings();
            setTimeout(() => {
              setShowEnableLocation(false);
            }, 3000);
          }}
          secondaryBtnText={t('deny')}
          secondaryBtnOnPress={() => {
            setShowEnableLocation(false);
          }}
        />
      )}
    </View>
  );
};

export default SearchScreen;

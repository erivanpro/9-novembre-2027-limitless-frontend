import React, {
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  ImageSourcePropType,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CustomImage from '../CustomImage';
import {RFValue} from 'react-native-responsive-fontsize';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {IMAGES, COLORS, FONT} from '../../utils/theme';
import {CustomText} from '../CustomText';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useTranslate} from '../../hooks/useTranslate';
import Toast from 'react-native-toast-message';
import useCenterMessageWindowStore from '../../service/store/centerMessageWindow.store';

type Props = {
  onChange?: (image: ImageSourcePropType | undefined) => void;
  onRemoveImage?: () => void;
  source?: ImageSourcePropType | undefined | File | unknown;
  containerStyle?: Object;
  imageStyle?: Object;
  defaultImage?: ImageSourcePropType;
  profileDetails?: boolean;
  license?: boolean;
  editProfile?: boolean;
  carImage?: boolean;
};

const CustomImagePickerSheet = (props: Props) => {
  const {
    onChange,
    source,
    containerStyle,
    defaultImage,
    profileDetails,
    license,
    editProfile,
    carImage,
    onRemoveImage,
  } = props || {};
  const showCenterMessageWindow = useCenterMessageWindowStore(
    state => state.showWindow,
  );

  // const [uri, setUri] = useState<
  //   ImageSourcePropType | undefined | string | any
  // >(source);

  // useEffect(() => {
  //   () => {
  //     FastImage.clearDiskCache();
  //     FastImage.clearMemoryCache();
  //   };
  // }, [source]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['35%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    console.log("first")
    bottomSheetModalRef.current?.present();
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const {t} = useTranslate();

  const handlePickedImage = (image: any) => {
    if (image?.size > 1050000) {
      closeBottomSheet();
      const title = 'Error';
      const message = 'Image should not exceed 1 MB';
      Toast.show({
        type: 'error',
        text1: title,
        text2: message,
      });
      showCenterMessageWindow({
        title,
        message,
        buttonText: t('ok'),
      });
      return;
    }

    onChange?.(image);
    closeBottomSheet();
  };

  const handleAndroidPickerResult = (response: any) => {
    const asset = response.assets?.[0];
    if (response.didCancel || !asset) {
      closeBottomSheet();
      return;
    }
    if (response.errorCode) {
      console.log('Error picking image:', response.errorMessage);
      closeBottomSheet();
      return;
    }

    const image = {
      ...asset,
      path: asset.uri,
      mime: asset.type || 'image/jpeg',
      size: asset.fileSize || 0,
    };
    handlePickedImage(image);
  };

  const HandleGalary = async () => {
    if (Platform.OS === 'android') {
      try {
        const response = await launchImageLibrary({
          mediaType: 'photo',
          selectionLimit: 1,
          maxWidth: 1280,
          maxHeight: 1280,
          quality: 0.75,
        });
        handleAndroidPickerResult(response);
      } catch (error) {
        console.log('Error picking image:', error);
        closeBottomSheet();
      }
      return;
    }

    ImagePicker.openPicker({
      width: 150,
      height: 300,
      cropping: false,
      includeBase64: false,
      compressImageQuality: 0.01,
      mediaType: 'photo',
    })
      .then(handlePickedImage)
      .catch(error => console.log('Error picking image:', error));
  };

  const HandlePicture = async () => {
    if (Platform.OS === 'android') {
      try {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
          closeBottomSheet();
          return;
        }

        const response = await launchCamera({
          mediaType: 'photo',
          maxWidth: 1280,
          maxHeight: 1280,
          quality: 0.75,
        });
        handleAndroidPickerResult(response);
      } catch (error) {
        console.log('Error taking picture:', error);
        closeBottomSheet();
      }
      return;
    }

    ImagePicker.openCamera({
      width: 150,
      height: 300,
      cropping: false,
      includeBase64: true,
      compressImageQuality: 0.0001,
    })
      .then(handlePickedImage)
      .catch(error => console.log('Error taking picture:', error));
  };

  // useEffect(() => {
  //   FastImage.clearDiskCache();
  //   FastImage.clearMemoryCache();

  //   console.log('HELLOOO ===> ', {
  //     source,
  //   });
  // }, [source]);
  return (
    <>
      <View style={containerStyle}>
        {profileDetails ? (
          <>
            <CustomImage
              source={source || defaultImage || IMAGES.emptyProfile}
              style={styles.imageUpload}
              onPressImage={handlePresentModalPress}
              resizeMode="cover"
            />
            <View style={styles.row}>
              <CustomText
                text={t('clickToUpload')}
                center
                onPress={handlePresentModalPress}
                textStyle={styles.clickToUpload}
              />
              <CustomText
                text={t('photoOfYourself')}
                center
                textStyle={styles.imageUploadText}
              />
            </View>
          </>
        ) : license ? (
          <Pressable
            style={styles.licenceContainer}
            onPress={handlePresentModalPress}>
            <CustomImage
              source={source || IMAGES.licenseimageUpload}
              style={[styles.imageUpload, styles.licenseImageUpload]}
              resizeMode="cover"
              // onPressImage={HandleImagePicker}
            />
            <View style={styles.row}>
              <CustomText
                text={t('clickHere')}
                center
                textStyle={styles.clickHere}
              />
              <CustomText
                text={t('toUploadLicense')}
                center
                textStyle={styles.toUpload}
              />
            </View>
          </Pressable>
        ) : editProfile ? (
          <View style={{alignSelf: 'center'}}>
            <CustomImage
              source={source || defaultImage || IMAGES.emptyProfile}
              style={styles.editProfileImage}
              onPressImage={handlePresentModalPress}
              resizeMode="cover"
            />
            <View
              style={{
                position: 'absolute',
                borderRadius: 100,
                alignSelf: 'center',
                bottom: RFValue(8),
                right: 0,
                // right: RFValue(140),
              }}>
              <CustomImage
                source={IMAGES.editProfileIcon}
                style={styles.profileEditIcon}
                onPressImage={handlePresentModalPress}
              />
            </View>
          </View>
        ) : carImage ? (
          <View style={styles.carImageContainer}>
            <CustomImage
              source={source || defaultImage}
              style={styles.carImageStyle}
              resizeMode="cover"
              onPressImage={handlePresentModalPress}
            />
            {typeof source === 'object' && (
              <Pressable
                style={styles.carCrossIconContainer}
                onPress={onRemoveImage}>
                <CustomImage
                  source={IMAGES.closeCircle}
                  style={styles.crossCarIcon}
                />
              </Pressable>
            )}
          </View>
        ) : (
          // will change in future according to different requirements/screen
          <CustomImage
            source={IMAGES.imageUpload}
            style={styles.imageUpload}
            // onPressImage={HandleImagePicker}
          />
        )}
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        handleIndicatorStyle={styles.iconBTSheetIndicatorStyle}
        containerStyle={styles.iconBTSheetContainer}
        handleStyle={styles.iconBTSheetHandle}>
        <BottomSheetView style={styles.bottomSheetContentContainer}>
          <View style={styles.bottomSheetContainer}>
            <CustomText
              text={t('uploadPicture')}
              textStyle={styles.bottomHeading}
            />
            <CustomImage
              source={IMAGES.crossIcon}
              style={styles.crossIcon}
              onPressImage={closeBottomSheet}
            />
          </View>
          <View style={styles.contentConatiner}>
            <Pressable style={styles.iconContainer} onPress={HandlePicture}>
              <CustomImage source={IMAGES.cameraIcon} style={styles.icon} />
              <CustomText
                text={t('photo')}
                textStyle={styles.bottomSheetContentTitle}
              />
              <CustomText
                text={t('capturePictureNow')}
                textStyle={styles.bottomSheetContentDescription}
              />
            </Pressable>
            <Pressable style={styles.iconContainer} onPress={HandleGalary}>
              <CustomImage source={IMAGES.galeryIcon} style={styles.icon} />
              <CustomText
                text={t('gallery')}
                textStyle={styles.bottomSheetContentTitle}
              />
              <CustomText
                text={t('selectFromPhoneGallery')}
                textStyle={styles.bottomSheetContentDescription}
              />
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    paddingTop: 20,
    height: RFValue(75),
    width: RFValue(75),
    borderRadius: 100,
    padding: 20,
    alignSelf: 'center',
  },
  bottomSheetContentContainer: {
    borderRadius: RFValue(20),
    padding: 0,
    opacity: 1,
  },
  bottomHeading: {
    fontFamily: FONT.poppins500,
    fontSize: RFValue(17),
  },
  bottomSheetContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: heightPercentageToDP(2),
    paddingVertical: heightPercentageToDP(2),
  },
  crossIcon: {
    height: heightPercentageToDP(4),
    width: widthPercentageToDP(4),
  },
  contentConatiner: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  iconContainer: {
    backgroundColor: '#fff',
    shadowColor: '#e6e6e6',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 35.5,
    elevation: RFValue(35),
    width: '50%',
    alignItems: 'center',
    borderRadius: RFValue(18),
    padding: RFValue(15),
  },
  icon: {
    height: heightPercentageToDP(7),
    width: widthPercentageToDP(15),
  },

  bottomSheetContentTitle: {
    fontFamily: FONT.poppins500,
    fontSize: RFValue(13),
    textAlign: 'center',
    paddingVertical: RFValue(7),
  },
  bottomSheetContentDescription: {
    fontFamily: FONT.poppinsRegular,
    fontSize: RFValue(10),
    color: COLORS.neutral500,
    textAlign: 'center',
  },
  iconBTSheetIndicatorStyle: {height: 0, width: 0},
  iconBTSheetContainer: {
    shadowOpacity: 0.1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  iconBTSheetHandle: {height: 0, display: 'none'},
  BTSheetContentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  flex1: {flex: 1},
  imageUpload: {
    width: RFValue(70),
    height: RFValue(70),
    borderRadius: RFValue(100),
    alignSelf: 'center',
    marginVertical: RFValue(10),
  },
  editProfileImage: {
    width: RFValue(80),
    height: RFValue(80),
    borderRadius: RFValue(100),
    alignSelf: 'center',
    marginVertical: RFValue(10),
    borderWidth: RFValue(0.5),
    borderColor: COLORS.neutral100,
    borderStyle: 'dashed',
  },
  licenseImageUpload: {
    width: RFValue(50),
    height: RFValue(50),
    marginVertical: RFValue(10),
    borderRadius: RFValue(0),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: RFValue(20),
  },
  clickToUpload: {
    fontFamily: FONT.poppins600,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  imageUploadText: {
    color: COLORS.neutral600,
    fontFamily: FONT.poppins600,
    fontWeight: '600',
  },
  licenceContainer: {
    backgroundColor: COLORS.neutral50,
    marginBottom: RFValue(15),
    marginTop: RFValue(3),
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.neutral400,
    borderRadius: RFValue(10),
  },
  clickHere: {
    fontFamily: FONT.inter600,
    fontWeight: '600',
  },
  toUpload: {
    fontFamily: FONT.interRegular,
    fontWeight: '400',
  },
  profileEditIcon: {
    height: RFValue(30),
    width: RFValue(30),
    borderWidth: RFValue(1),
    borderColor: COLORS.white,
    borderRadius: RFValue(100),
  },
  crossCarIcon: {
    height: RFValue(25),
    width: RFValue(25),
  },
  carCrossIconContainer: {
    position: 'absolute',
    right: widthPercentageToDP(-1.5),
    top: RFValue(-5),
    borderRadius: 100,
  },
  carImageStyle: {
    width: RFValue(Platform.OS === 'ios' ? 65 : 75),
    height: RFValue(Platform.OS === 'ios' ? 58 : 60),
    borderRadius: RFValue(10),
    // marginVertical: widthPercentageToDP(1),
    marginHorizontal: widthPercentageToDP(Platform.OS === 'ios' ? 1.5 : 0.4),
  },
  carImageContainer: {
    width: wp(Platform.OS === 'ios' ? 21.5 : 21),
    height: wp(Platform.OS === 'ios' ? 20 : 20),

    marginRight: wp(0.5),
    marginLeft: wp(1),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default CustomImagePickerSheet;

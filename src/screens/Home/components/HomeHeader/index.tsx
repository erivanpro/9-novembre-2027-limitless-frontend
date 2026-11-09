import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import { CustomButton, CustomImage, Row } from '../../../../components';
import { COLORS, FONT, IMAGES } from '../../../../utils/theme';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { CustomIcon } from '../../../../components/CustomIcon';
import { navigate } from '../../../../utils/navigation';
import { RFValue } from 'react-native-responsive-fontsize';
import useUserStore from '../../../../service/store/user.store';
import { useUserCar } from '../../../../hooks/useUserCar';
import { getUserLocation } from '../../../../utils/helper';
import { useLocation } from '../../../../hooks/useLocation';
import { useIsFocused } from '@react-navigation/native';
import { useSettings } from '../../../../hooks/useSettings';
import useLanguageStore from '../../../../service/store/language.store';
import useTranslate from '../../../../hooks/useTranslate';
import HostPayoutBottomSheet, {
  HostPayoutSheetHandle,
} from '../../../../components/HostPayoutBottomSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeHeader = () => {
  const { userDetails, setUserDetails, isHost }: any = useUserStore();
  const { language, setLanguage }: any = useLanguageStore();
  const { t } = useTranslate();
  const payoutSheetRef = useRef<HostPayoutSheetHandle>(null);

  const { getUserDetailQuery } = useUserCar();
  const focus = useIsFocused();

  useEffect(() => {
    const handle = async () => {
      await getUserDetailQuery.refetch()?.then(data => {
        setUserDetails({ ...userDetails, ...data.data?.data });
        userDetails?.selected_language &&
          setLanguage(
            data.data?.data?.selected_language == 'ENGLISH' ? 'en' : 'fr',
          );
      });
    };
    handle();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <CustomImage
          source={IMAGES.logoBlack}
          width={widthPercentageToDP(13)}
          height={widthPercentageToDP(13)}
          style={{
            display: 'none',
            opacity: 0,
          }}
          onPressImage={() => navigate('Home')}
        />

        <Row>
          <CustomButton
            title={t('myOrders')}
            onPress={() => {
              if (!getUserDetailQuery?.data) {
                return navigate('Signin');
              } else {
                navigate('MyOrders');
              }
            }}
            containerStyle={styles.ordersButton}
            textStyle={styles.ordersButtonText}
          />
          {isHost && (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={t('manageMyMoney')}
              style={styles.payoutIconButton}
              onPress={() => payoutSheetRef.current?.present()}>
              <View style={styles.payoutIconStack}>
                <MaterialCommunityIcons
                  name="bank-transfer-out"
                  size={RFValue(22)}
                  color={COLORS.black}
                />
                <View pointerEvents="none" style={styles.homeIconBadge}>
                  <MaterialCommunityIcons
                    name="home-outline"
                    size={RFValue(10)}
                    color={COLORS.black}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
          <CustomIcon
            type="Ionicons"
            icon="notifications-outline"
            onPress={() => {
              if (!getUserDetailQuery?.data) {
                return navigate('Signin');
              } else {
                navigate('Notification');
              }
            }}
          />
        </Row>
      </View>
      <HostPayoutBottomSheet ref={payoutSheetRef} />
    </>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: widthPercentageToDP(3),
  },
  payoutIconButton: {
    width: RFValue(28),
    height: RFValue(28),
    marginRight: RFValue(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  payoutIconStack: {
    width: RFValue(26),
    height: RFValue(26),
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIconBadge: {
    position: 'absolute',
    right: -RFValue(2),
    bottom: -RFValue(2),
    width: RFValue(13),
    height: RFValue(13),
    borderRadius: RFValue(7),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ordersButton: {
    backgroundColor: '#F5F5F5',
    borderColor: COLORS.neutral200,
    borderRadius: 999,
    minHeight: widthPercentageToDP(9),
    paddingHorizontal: widthPercentageToDP(4),
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: RFValue(8),
  },
  ordersButtonText: {
    color: COLORS.neutral700,
    fontSize: RFValue(11),
    fontFamily: FONT.inter600,
    textAlign: 'center',
  },
});

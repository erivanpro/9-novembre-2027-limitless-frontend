import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Alert, Image, Linking, StyleSheet, View} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {CustomButton, CustomText} from '..';
import {COLORS, FONT, IMAGES, SHADOWS} from '../../utils/theme';
import useAppAccentColor from '../../hooks/useAppAccentColor';
import {useTranslate} from '../../hooks/useTranslate';
import useUserStore from '../../service/store/user.store';

export type HostPayoutSheetHandle = {
  present: () => void;
  dismiss: () => void;
};

const HostPayoutBottomSheet = forwardRef<HostPayoutSheetHandle>((_, ref) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['52%'], []);
  const accentColor = useAppAccentColor();
  const {t} = useTranslate();
  const {userDetails} = useUserStore();
  const stripeDashboardLink = userDetails?.host?.dashboard_login_link;
  const [isOpeningStripe, setIsOpeningStripe] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      present: () => modalRef.current?.present(),
      dismiss: () => modalRef.current?.dismiss(),
    }),
    [],
  );

  const handleOpenStripe = useCallback(async () => {
    if (isOpeningStripe || !stripeDashboardLink) {
      return;
    }

    setIsOpeningStripe(true);
    try {
      await Linking.openURL(stripeDashboardLink);
      modalRef.current?.dismiss();
    } catch {
      Alert.alert(t('manageMyMoney'), t('payoutSheetError'));
    } finally {
      setIsOpeningStripe(false);
    }
  }, [isOpeningStripe, stripeDashboardLink, t]);

  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handleIndicator}>
      <BottomSheetView style={styles.content}>
        <Image
          source={IMAGES.stripePayoutIllustration}
          style={styles.payoutIllustration}
          resizeMode="contain"
          accessible={false}
        />

        <CustomText
          text={t('payoutSheetTitle')}
          center
          textStyle={styles.title}
        />
        <CustomText
          text={t('payoutSheetDescription')}
          center
          textStyle={styles.description}
        />

        <View style={styles.bankCard}>
          <View style={styles.bankText}>
            <CustomText
              text={t('payoutBankTitle')}
              textStyle={styles.bankTitle}
            />
            <CustomText
              text={t('payoutBankDescription')}
              textStyle={styles.bankDescription}
            />
          </View>
          <Image
            source={IMAGES.stripeWordmark}
            style={styles.stripeWordmark}
            resizeMode="contain"
            accessibilityLabel="Stripe"
          />
        </View>

        <CustomButton
          title={t('payoutSheetAction')}
          onPress={handleOpenStripe}
          loading={isOpeningStripe}
          disabled={isOpeningStripe || !stripeDashboardLink}
          containerStyle={[styles.actionButton, {backgroundColor: accentColor}]}
        />
        <CustomText
          text={t('payoutSheetSecureNote')}
          center
          textStyle={styles.secureNote}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

HostPayoutBottomSheet.displayName = 'HostPayoutBottomSheet';

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RFValue(24),
    borderTopRightRadius: RFValue(24),
  },
  handleIndicator: {
    width: wp(12),
    backgroundColor: COLORS.neutral200,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: wp(6),
    paddingTop: wp(2),
    paddingBottom: wp(7),
  },
  payoutIllustration: {
    width: wp(27),
    height: wp(22),
    marginBottom: wp(2),
  },
  title: {
    color: COLORS.black,
    fontFamily: FONT.poppins600,
    fontSize: RFValue(17),
    lineHeight: RFValue(23),
  },
  description: {
    color: COLORS.neutral500,
    fontFamily: FONT.inter500,
    fontSize: RFValue(11),
    lineHeight: RFValue(16),
    marginTop: wp(1.5),
    marginBottom: wp(4),
  },
  bankCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8F7',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.neutral200,
    borderRadius: RFValue(14),
    padding: wp(3.5),
    marginBottom: wp(4),
  },
  bankText: {
    flex: 1,
    paddingRight: wp(2),
  },
  stripeWordmark: {
    width: wp(16),
    height: wp(7),
    flexShrink: 0,
  },
  bankTitle: {
    color: COLORS.neutral700,
    fontFamily: FONT.poppins600,
    fontSize: RFValue(10.5),
    lineHeight: RFValue(15),
  },
  bankDescription: {
    color: COLORS.neutral500,
    fontFamily: FONT.inter500,
    fontSize: RFValue(9.5),
    lineHeight: RFValue(14),
    marginTop: RFValue(2),
  },
  actionButton: {
    width: '100%',
    borderRadius: 100,
    minHeight: wp(13),
    ...SHADOWS.light,
  },
  secureNote: {
    color: COLORS.neutral500,
    fontFamily: FONT.inter500,
    fontSize: RFValue(9),
    marginTop: wp(2.5),
  },
});

export default HostPayoutBottomSheet;

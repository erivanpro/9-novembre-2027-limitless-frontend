import React, {useRef, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CustomImage,
  CustomText,
  CustomWrapper,
} from '../../../components';
import { COLORS, FONT, IMAGES } from '../../../utils/theme';
import EmptyScreen from '../../../components/EmptyScreen';
import CarItem from '../../Hosting/components/CarItem';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { navigate } from '../../../utils/navigation';
import { useHostCar } from '../../../hooks/useHostCar';
import SearchScreenSkeleton from '../../../components/Skeleton/SearchScreenSkeleton';
import PendingModal from '../../../components/PendingModal/PendingModal';
import { useUserCar } from '../../../hooks/useUserCar';
import { useTranslate } from '../../../hooks/useTranslate';
import HostPayoutBottomSheet, {
  HostPayoutSheetHandle,
} from '../../../components/HostPayoutBottomSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HostSignedin = () => {
  const { getHostCars, getHostCarsLoading } = useHostCar();
  const { t } = useTranslate();
  const payoutSheetRef = useRef<HostPayoutSheetHandle>(null);
  let data = getHostCars?.data?.pages[0]?.data?.cars;
  const [processModal, setProcessModal] = useState({
    isVerified: false,
    isRejected: false,
  });

  const { getUserDetailQuery } = useUserCar();

  const handlePublishCar = async () => {
    await getUserDetailQuery.refetch();
    let user = getUserDetailQuery.data?.data;

    if (!user?.is_verified && !user?.is_rejected) {
      return setProcessModal(pre => ({ ...pre, isVerified: true }));
    }
    if (user?.is_rejected) {
      return setProcessModal(pre => ({ ...pre, isRejected: true }));
    }
    navigate('PublishCar', {});
  };

  let isVisibleModal = processModal?.isRejected || processModal?.isVerified;
  const actionButtons = [
    {
      key: 'my-orders',
      label: t('myOrders'),
      onPress: () => navigate('OrderForMyCar'),
    },
    {
      key: 'publish-car',
      label: t('publishCar'),
      onPress: handlePublishCar,
    },
    {
      key: 'manage-my-money',
      label: t('makeTransfer'),
      onPress: () => payoutSheetRef.current?.present(),
    },
    {
      key: 'help-center',
      label: t('helpCenterTitle'),
      onPress: () => navigate('HelpCenter'),
    },
    {
      key: 'edit-profile',
      label: t('editProfile'),
      onPress: () => navigate('EditProfile'),
    },
  ];

  return (
    <>
      <CustomWrapper padding bottomInsert={0.1} backgroundColor={COLORS.white}>
        <View style={styles.header}>
          <CustomText text={t('manageMyCar')} textStyle={styles.title} />
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={t('makeTransfer')}
            activeOpacity={0.8}
            onPress={() => payoutSheetRef.current?.present()}
            style={styles.transferButton}>
            <MaterialCommunityIcons
              name="bank-transfer-out"
              size={RFValue(16)}
              color={COLORS.white}
            />
            <CustomText
              text={t('makeTransfer')}
              numberOfLines={1}
              fontWeightInter="600"
              textStyle={styles.transferButtonText}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.actionBar}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.actionRow}>
            {actionButtons.map(({key, label, onPress, disabled}) => (
              <TouchableOpacity
                key={key}
                accessibilityRole="button"
                accessibilityState={{disabled: !!disabled}}
                activeOpacity={0.7}
                onPress={onPress}
                disabled={disabled}
                style={[
                  styles.topTab,
                  key === 'my-orders' && styles.ordersTopTab,
                ]}>
                <CustomText
                  text={label}
                  numberOfLines={1}
                  fontWeightPopins="500"
                  textStyle={[
                    styles.topTabText,
                    key === 'my-orders' && styles.ordersTopTabText,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {getHostCarsLoading ? (
          <View style={styles.loaderContainer}>
            <View style={{paddingVertical: RFValue(0)}}>
              {[1, 2, 3]?.map(i => (
                <View key={i}>
                  <SearchScreenSkeleton />
                </View>
              ))}
            </View>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={!!data?.length}
            contentContainerStyle={
              data?.length
                ? styles.contentContainerStyle
                : styles.contentContainerEmptyStyle
            }
            data={data}
            renderItem={({item}) => <CarItem {...item} />}
            ListEmptyComponent={ListEmptyComponent}
          />
        )}
        <CustomImage
          source={IMAGES.plusRoundIcon}
          containerStyle={styles.plusRoundIcon}
          onPressImage={handlePublishCar}
        />

        {isVisibleModal && (
          <PendingModal setState={setProcessModal} processModal={processModal} />
        )}
      </CustomWrapper>
      <HostPayoutBottomSheet ref={payoutSheetRef} />
    </>
  );
};

const ListEmptyComponent = () => {
  const { t } = useTranslate();
  return (
    <EmptyScreen
      image={IMAGES.addCarIcon}
      title={t('emptyOrdersForMyCars')}
      btnOnPress={() => {}}
      imageContainerStyle={{
        height: widthPercentageToDP(30),
      }}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: widthPercentageToDP(30),
  },
  contentContainerEmptyStyle: {
    paddingBottom: widthPercentageToDP(30),
    flex: 1,
  },
  title: {
    paddingVertical: widthPercentageToDP(3),
    fontFamily: FONT.poppins600,
    fontWeight: '600',
    fontSize: RFValue(20),
    flexShrink: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: widthPercentageToDP(2),
  },
  transferButton: {
    minHeight: widthPercentageToDP(9),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: widthPercentageToDP(1.5),
    paddingHorizontal: widthPercentageToDP(3),
    borderRadius: 999,
    backgroundColor: COLORS.green,
  },
  transferButtonText: {
    color: COLORS.white,
    fontSize: RFValue(10),
  },
  actionBar: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.neutral200,
    marginBottom: widthPercentageToDP(3.5),
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: widthPercentageToDP(4),
    paddingRight: widthPercentageToDP(4),
  },
  topTab: {
    minHeight: widthPercentageToDP(10),
    justifyContent: 'center',
    paddingHorizontal: widthPercentageToDP(1),
  },
  ordersTopTab: {
    minHeight: widthPercentageToDP(9),
    paddingHorizontal: widthPercentageToDP(3),
    borderRadius: 999,
    backgroundColor: COLORS.green,
  },
  topTabText: {
    fontFamily: FONT.poppins500,
    color: COLORS.neutral600,
    fontSize: RFValue(9.5),
    lineHeight: RFValue(13),
  },
  ordersTopTabText: {
    color: COLORS.white,
  },
  plusRoundIcon: {
    position: 'absolute',
    right: widthPercentageToDP(1),
    bottom: widthPercentageToDP(27),
    height: widthPercentageToDP(22),
    width: widthPercentageToDP(22),
  },
  loaderContainer: {},
});

export default HostSignedin;

import React, {FC, useCallback, useState} from 'react';
import {Linking, Pressable, StyleSheet, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

import {
  CustomImage,
  CustomStarRating,
  CustomText,
} from '../../../../components';
import {CustomIcon} from '../../../../components/CustomIcon';
import {COLORS} from '../../../../utils/theme';
import {ProfileItemProps} from './interface';
import {navigate} from '../../../../utils/navigation';
import ToggleSwitch from 'toggle-switch-react-native';
import useTranslate from '../../../../hooks/useTranslate';

const ProfileItem: FC<ProfileItemProps> = ({data}) => {
  const {
    icon,
    title,
    path,
    externalUrl,
    callback,
    isToggle = false,
    isDisable,
    isEnable,
    pref,
    isLanguage,
  } = data || {};
  const {t} = useTranslate();
  const handleToggle = (i: boolean) => {
    callback?.(i ? isEnable : isDisable);
  };

  let notification = pref == isEnable ? true : false;
  let language = pref == 'en' ? 'English' : 'French';

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        if (externalUrl) {
          void Linking.openURL(externalUrl).catch(() => undefined);
          return;
        }
        if (path) {
          navigate(path);
          return;
        }
        if (title == t('logout')) callback?.();
      }}>
      <View style={styles.child}>
        {!!icon && (
          <CustomImage
            source={icon as any}
            width={widthPercentageToDP(6)}
            height={widthPercentageToDP(6)}
            containerStyle={styles.iconContainer}
          />
        )}
        <CustomText text={title} fontWeightPopins="600" fontSize="S14" />
      </View>

      {title == 'Notifications' || isLanguage ? (
        <ToggleSwitch
          isOn={notification || language === 'English'}
          onColor={COLORS.white}
          offColor={COLORS.white}
          trackOnStyle={{backgroundColor: COLORS.primary}}
          trackOffStyle={{backgroundColor: COLORS.neutral100}}
          size="medium"
          onToggle={handleToggle}
        />
      ) : (
        <CustomIcon
          type="Entypo"
          icon="chevron-small-right"
          color={COLORS.neutral400}
          size={RFValue(30)}
        />
      )}
    </Pressable>
  );
};

export default ProfileItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.neutral50,
    borderRadius: RFValue(20),
    paddingHorizontal: widthPercentageToDP(4),
    paddingVertical: widthPercentageToDP(3),
  },
  child: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: widthPercentageToDP(3),
  },
});

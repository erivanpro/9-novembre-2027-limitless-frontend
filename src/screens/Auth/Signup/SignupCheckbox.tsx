import React, { FC } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform,
  Linking,
} from 'react-native';
import { Controller } from 'react-hook-form';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { CustomIcon } from '../../../components/CustomIcon';
import { COLORS, FONT } from '../../../utils/theme';
import { CustomText } from '../../../components';
import useTranslate from '../../../hooks/useTranslate';

const SignupCheckbox: FC<{
  control: any;
  name: string;
  rules?: object;
  setShowTerms?: (e: boolean) => boolean;
}> = ({ control, name, rules, setShowTerms }) => {
  const { t } = useTranslate();
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => onChange(!value)}
            >
              {value ? (
                <CustomIcon
                  icon="check-box"
                  type="MaterialIcons"
                  size={24}
                  color={COLORS.black}
                />
              ) : (
                <CustomIcon
                  icon="check-box-outline-blank"
                  type="MaterialIcons"
                  size={24}
                  color={COLORS.black}
                />
              )}
            </TouchableOpacity>
            <View>
              <Text style={styles.termsContainer}>
                {t('signupTermsPrefix')}{' '}
                <Text
                  onPress={() =>
                    Linking.openURL('https://erivan.fr/limitless-conditions.html')
                  }
                  style={styles.terms}
                >
                  {t('termsAndConditions')}
                </Text>
              </Text>
              {/* <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://erivan.fr/limitless-conditions.html')
                }>
                <Text style={styles.terms}>{t('termsAndConditions')}</Text>
              </TouchableOpacity> */}
            </View>
          </View>
          {!!error && (
            <View style={styles.errorContainer}>
              <CustomText textStyle={styles.errorText} text={error?.message} />
            </View>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: RFValue(8),
    paddingBottom: RFValue(8),
  },
  checkbox: {
    paddingHorizontal: widthPercentageToDP(1),
    paddingVertical: widthPercentageToDP(Platform.OS === 'android' ? 0 : 1),
  },
  termsContainer: {
    flex: 1,
    fontSize: RFValue(Platform.OS === 'android' ? 13 : 10),
    color: COLORS.neutral400,
    lineHeight: RFValue(Platform.OS === 'android' ? 16 : 14),
  },
  terms: {
    fontFamily: FONT.inter500,
    fontWeight: 'bold',
    color: COLORS.primary,
    fontSize: RFValue(11),
    lineHeight: RFValue(11),
  },
  errorText: {
    color: COLORS.error600,
    fontSize: RFValue(10),
    marginTop: RFValue(4),
  },
  errorContainer: {
    paddingHorizontal: widthPercentageToDP(1),
    paddingBottom: widthPercentageToDP(2),
    marginTop: widthPercentageToDP(-3),
  },
});

export default SignupCheckbox;

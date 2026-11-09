import {Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  CustomButton,
  CustomHeader,
  CustomRHFTextInput,
  CustomStarRating,
  CustomText,
  CustomWrapper,
} from '../../components';
import {COLORS} from '../../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FieldValue, FieldValues, useForm} from 'react-hook-form';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useBooking} from '../../hooks/useBooking';
import {navigate, navigateReplace} from '../../utils/navigation';
import Toast from 'react-native-toast-message';
import useTranslate from '../../hooks/useTranslate';
import {ScrollView} from 'react-native';
import useCenterMessageWindowStore from '../../service/store/centerMessageWindow.store';
type ReviewsProps = {
  ReviewsProps: {
    id: string;
  };
};
const Reviews = () => {
  const {t} = useTranslate();
  const showCenterMessageWindow = useCenterMessageWindowStore(
    state => state.showWindow,
  );
  const {setReview, reviewLoading}: any = useBooking();
  const routes = useRoute<RouteProp<ReviewsProps, 'ReviewsProps'>>() || {};
  const {id} = routes.params || {};
  const [rating, setRating] = useState(0);
  const {control, handleSubmit} = useForm();
  const onSubmit = async (data: FieldValues) => {
    if (rating < 1) {
      const title = t('error');
      const message = t('starRatingRequired');
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
    let payload = {
      booking_id: id,
      stars: rating,
      ...data,
    };
    setReview(payload);
  };

  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <ScrollView>
        <CustomHeader title={t('rateYourExperience')} />
        <Pressable onPress={Keyboard.dismiss} style={styles.contentContainer}>
          <CustomText
            center
            text={t('bookingCompleted')}
            color="#000"
            fontSize="S20"
            fontWeightPopins="900"
          />

          <CustomStarRating
            containerStyle={{alignSelf: 'center'}}
            emptyColor={true}
            starSize={widthPercentageToDP(10)}
            rating={rating}
            setRating={setRating}
          />

          <CustomRHFTextInput
            control={control}
            numberOfLines={3}
            multiline
            title={t('tellUsMore')}
            name="review_message"
            placeholder={t('writeSomething')}
            rules={{
              required: t('starRatingRequired'),
              validate: {
                positive: (value: string) =>
                  value.trim().length > 0 || t('starRatingRequired'),
                minLength: (value: string) =>
                  value.trim().length >= 10 || t('reviewMinLength'),
                maxLength: (value: string) =>
                  value.trim().length < 250 || t('reviewMaxLength'),
              },
            }}
            style={styles.descriptionInput}
            textStyle={styles.descriptionInput}
          />
          <CustomButton
            loading={reviewLoading}
            title={t('submitButton')}
            onPress={handleSubmit(onSubmit)}
            containerStyle={{borderRadius: widthPercentageToDP(10)}}
          />
        </Pressable>
      </ScrollView>
    </CustomWrapper>
  );
};
export default Reviews;

const styles = StyleSheet.create({
  descriptionInput: {
    minHeight: RFValue(80),
    maxHeight: RFValue(150),
    padding: RFValue(14),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlignVertical: 'top',
  },
  contentContainer: {
    flex: 1,
    gap: widthPercentageToDP(9),
    paddingTop: heightPercentageToDP(5),
  },
});

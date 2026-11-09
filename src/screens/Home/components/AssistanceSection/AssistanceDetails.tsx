import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import {
  CustomButton,
  CustomImage,
  CustomText,
  CustomWrapper,
  Row,
} from '../../../../components';
import { useRoute } from '@react-navigation/native';
import { COLORS, IMAGES } from '../../../../utils/theme';
import { navigateGoBack } from '../../../../utils/navigation';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import * as Animatable from 'react-native-animatable';
import useAppAccentColor from '../../../../hooks/useAppAccentColor';

const AssistanceDetails = () => {
  const accentColor = useAppAccentColor();
  const route = useRoute();
  const data = route.params?.data || {};
  const { pageHeading, intro, image } = data || {};
  const steps = Array.isArray(data?.steps) ? data.steps : [];
  const { t } = useTranslation();
  return (
    <CustomWrapper bottomInsert={-1}>
      <View style={styles.header}>
        <Row justifyContent="space-between">
          <CustomImage
            onPressImage={navigateGoBack}
            source={IMAGES.back}
            height={RFValue(34)}
            width={RFValue(34)}
          />
          <CustomText
            text={pageHeading}
            fontWeightPopins="600"
            fontSize="S14"
            center
          />
          <View />
        </Row>
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView style={styles.scrollView}>
          <CustomText
            text={intro}
            fontWeightInter="500"
            fontSize="S14"
            color={COLORS.neutral500}
            textStyle={styles.intro}
          />
          <CustomImage
            source={image}
            resizeMode="cover"
            containerStyle={styles.image}
          />

          <ScrollView
            horizontal
            nestedScrollEnabled
            directionalLockEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={
              widthPercentageToDP(78) + widthPercentageToDP(3)
            }
            snapToAlignment="start"
            disableIntervalMomentum
            style={styles.stepsScrollView}
            contentContainerStyle={styles.stepsContainer}>
            {steps.map((step, index) => (
              <View key={`${step.title}-${index}`} style={styles.stepCard}>
                <CustomText
                  text={`${t('helpStepLabel')} ${String(index + 1).padStart(
                    2,
                    '0',
                  )}`}
                  fontWeightPopins="600"
                  fontSize="S10"
                  color={accentColor}
                  textStyle={styles.stepLabel}
                />
                <CustomText
                  text={step.title}
                  fontWeightPopins="500"
                  fontSize="S16"
                  textStyle={styles.stepTitle}
                />
                <CustomText
                  text={step.description}
                  fontWeightInter="500"
                  fontSize="S12"
                  color={COLORS.neutral500}
                  textStyle={styles.stepDescription}
                />
              </View>
            ))}
          </ScrollView>

          <Animatable.View animation="bounceInUp" duration={500} delay={0}>
            <CustomButton
              containerStyle={[
                styles.buttonStyle,
                {backgroundColor: accentColor},
              ]}
              title={t('letsgo')}
              onPress={navigateGoBack}
            />
          </Animatable.View>
        </ScrollView>
      </View>
    </CustomWrapper>
  );
};

export default AssistanceDetails;

const styles = StyleSheet.create({
  header: {
    paddingVertical: widthPercentageToDP(7),
    paddingHorizontal: widthPercentageToDP(4),
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: widthPercentageToDP(4),
    paddingVertical: widthPercentageToDP(4),
    borderTopStartRadius: widthPercentageToDP(4),
    borderTopEndRadius: widthPercentageToDP(4),
  },
  scrollView: {
    flex: 1,
  },
  image: {
    borderRadius: widthPercentageToDP(4),
    maxHeight: widthPercentageToDP(60),
    marginBottom: widthPercentageToDP(5),
  },
  intro: {
    paddingBottom: widthPercentageToDP(2),
  },
  stepsContainer: {
    paddingRight: widthPercentageToDP(1),
  },
  stepsScrollView: {
    marginBottom: widthPercentageToDP(2),
  },
  stepCard: {
    width: widthPercentageToDP(78),
    minHeight: widthPercentageToDP(44),
    marginRight: widthPercentageToDP(3),
    padding: widthPercentageToDP(4),
    borderRadius: widthPercentageToDP(3),
    backgroundColor: COLORS.neutral50,
  },
  stepLabel: {
    paddingBottom: widthPercentageToDP(1),
    textTransform: 'uppercase',
  },
  stepTitle: {
    paddingVertical: widthPercentageToDP(0.5),
  },
  stepDescription: {
    paddingTop: widthPercentageToDP(1),
  },
  buttonStyle: {
    marginTop: 10,
    backgroundColor: 'transparent',
    borderRadius: 100,
  },
});

import React from 'react';
import {Image, Linking, ScrollView, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {
  BlurMask,
  Canvas,
  Circle,
  Group,
  LinearGradient,
  RoundedRect,
  useClock,
  vec,
} from '@shopify/react-native-skia';
import {useDerivedValue} from 'react-native-reanimated';
import {
  CustomButton,
  CustomText,
  CustomWrapper,
} from '../../components';
import {navigate} from '../../utils/navigation';
import {FONT, COLORS, SHADOWS} from '../../utils/theme';
import useUserStore from '../../service/store/user.store';
import {useTranslate} from '../../hooks/useTranslate';
import useAppAccentColor from '../../hooks/useAppAccentColor';

const IdentityCardSkiaHero = () => {
  const accentColor = useAppAccentColor();
  const clock = useClock();

  const heroWidth = widthPercentageToDP(90);
  const heroHeight = widthPercentageToDP(58);
  const cardWidth = widthPercentageToDP(74);
  const cardHeight = widthPercentageToDP(43);
  const cardX = (heroWidth - cardWidth) / 2;
  const cardY = (heroHeight - cardHeight) / 2;
  const badgeCx = cardX + cardWidth - widthPercentageToDP(7);
  const badgeCy = cardY + widthPercentageToDP(7);
  const glowDriftX = widthPercentageToDP(3.5);
  const glowDriftY = widthPercentageToDP(2.4);
  const pulseBase = widthPercentageToDP(4.3);
  const pulseDelta = widthPercentageToDP(1);
  const shineStartX = cardX - widthPercentageToDP(12);
  const shineTravel = cardWidth + widthPercentageToDP(24);
  const scanStartY = cardY + widthPercentageToDP(11);
  const scanTravel = widthPercentageToDP(23);

  const glowLeftX = useDerivedValue(
    () => heroWidth * 0.22 + Math.sin(clock.value / 1500) * glowDriftX,
    [heroWidth, glowDriftX],
  );

  const glowLeftY = useDerivedValue(
    () => heroHeight * 0.3 + Math.cos(clock.value / 1800) * glowDriftY,
    [heroHeight, glowDriftY],
  );

  const glowRightX = useDerivedValue(
    () => heroWidth * 0.78 - Math.sin(clock.value / 1700) * glowDriftX,
    [heroWidth, glowDriftX],
  );

  const glowRightY = useDerivedValue(
    () => heroHeight * 0.35 + Math.sin(clock.value / 1300) * glowDriftY,
    [heroHeight, glowDriftY],
  );

  const pulseRadius = useDerivedValue(
    () => pulseBase + ((Math.sin(clock.value / 620) + 1) / 2) * pulseDelta,
    [pulseBase, pulseDelta],
  );

  const shineX = useDerivedValue(
    () => shineStartX + ((clock.value / 12) % shineTravel),
    [shineStartX, shineTravel],
  );

  const scanY = useDerivedValue(
    () => scanStartY + ((clock.value / 10) % scanTravel),
    [scanStartY, scanTravel],
  );

  const cardClip = useDerivedValue(
    () => ({
      x: cardX,
      y: cardY,
      width: cardWidth,
      height: cardHeight,
    }),
    [cardX, cardY, cardWidth, cardHeight],
  );

  const sparkleOpacity = useDerivedValue(
    () => 0.2 + ((Math.sin(clock.value / 520) + 1) / 2) * 0.65,
    [],
  );

  const sparkleTopY = useDerivedValue(
    () => heroHeight * 0.2 + Math.sin(clock.value / 800) * 3,
    [heroHeight],
  );

  const sparkleRightY = useDerivedValue(
    () => heroHeight * 0.24 + Math.cos(clock.value / 930) * 4,
    [heroHeight],
  );

  return (
    <View style={styles.heroSection}>
      <Canvas style={[styles.heroCanvas, {width: heroWidth, height: heroHeight}]}>
        <RoundedRect x={0} y={0} width={heroWidth} height={heroHeight} r={26}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(heroWidth, heroHeight)}
            colors={[COLORS.lightBlue, '#F5FFF8', COLORS.white]}
          />
        </RoundedRect>

        <RoundedRect
          x={2}
          y={2}
          width={heroWidth - 4}
          height={heroHeight - 4}
          r={24}
          color="rgba(255,255,255,0.5)"
        />

        <RoundedRect
          x={cardX}
          y={cardY + widthPercentageToDP(1.8)}
          width={cardWidth}
          height={cardHeight}
          r={22}
          color="rgba(0,0,0,0.08)"
        />

        <RoundedRect x={cardX} y={cardY} width={cardWidth} height={cardHeight} r={22}>
          <LinearGradient
            start={vec(cardX, cardY)}
            end={vec(cardX + cardWidth, cardY + cardHeight)}
            colors={[COLORS.white, '#F4FBFF']}
          />
        </RoundedRect>

        <Circle cx={glowLeftX} cy={glowLeftY} r={42} color="rgba(51,187,120,0.23)">
          <BlurMask blur={20} style="normal" />
        </Circle>

        <Circle cx={glowRightX} cy={glowRightY} r={36} color="rgba(48,131,255,0.2)">
          <BlurMask blur={20} style="normal" />
        </Circle>

        <RoundedRect
          x={cardX}
          y={cardY}
          width={cardWidth}
          height={widthPercentageToDP(8.8)}
          r={22}
          color="rgba(51,187,120,0.12)"
        />

        <Circle
          cx={cardX + widthPercentageToDP(10.5)}
          cy={cardY + widthPercentageToDP(16)}
          r={widthPercentageToDP(5.2)}
          color="rgba(48,131,255,0.12)"
        />
        <Circle
          cx={cardX + widthPercentageToDP(10.5)}
          cy={cardY + widthPercentageToDP(16)}
          r={widthPercentageToDP(2.25)}
          color="rgba(48,131,255,0.28)"
        />

        <RoundedRect
          x={cardX + widthPercentageToDP(18.7)}
          y={cardY + widthPercentageToDP(11.7)}
          width={widthPercentageToDP(39)}
          height={widthPercentageToDP(2)}
          r={99}
          color="rgba(0,0,0,0.6)"
        />
        <RoundedRect
          x={cardX + widthPercentageToDP(18.7)}
          y={cardY + widthPercentageToDP(16)}
          width={widthPercentageToDP(29)}
          height={widthPercentageToDP(1.6)}
          r={99}
          color="rgba(0,0,0,0.35)"
        />
        <RoundedRect
          x={cardX + widthPercentageToDP(6.5)}
          y={cardY + widthPercentageToDP(24)}
          width={widthPercentageToDP(54)}
          height={widthPercentageToDP(1.6)}
          r={99}
          color="rgba(0,0,0,0.28)"
        />
        <RoundedRect
          x={cardX + widthPercentageToDP(6.5)}
          y={cardY + widthPercentageToDP(28)}
          width={widthPercentageToDP(38)}
          height={widthPercentageToDP(1.6)}
          r={99}
          color="rgba(0,0,0,0.24)"
        />

        <Circle
          cx={badgeCx}
          cy={badgeCy}
          r={pulseRadius}
          color="rgba(51,187,120,0.18)"
        />
        <Circle cx={badgeCx} cy={badgeCy} r={widthPercentageToDP(3.2)} color={accentColor} />
        <Circle cx={badgeCx} cy={badgeCy} r={widthPercentageToDP(1.1)} color={COLORS.white} />

        <Group clip={cardClip}>
          <RoundedRect
            x={shineX}
            y={cardY}
            width={widthPercentageToDP(8.5)}
            height={cardHeight}
            r={0}
            color="rgba(255,255,255,0.22)"
          />
          <RoundedRect
            x={cardX + widthPercentageToDP(5)}
            y={scanY}
            width={cardWidth - widthPercentageToDP(10)}
            height={widthPercentageToDP(0.9)}
            r={99}
            color="rgba(51,187,120,0.42)"
          />
        </Group>

        <Circle
          cx={heroWidth * 0.16}
          cy={sparkleTopY}
          r={2.2}
          color={COLORS.white}
          opacity={sparkleOpacity}
        />

        <Circle
          cx={heroWidth * 0.84}
          cy={sparkleRightY}
          r={2}
          color={COLORS.white}
          opacity={sparkleOpacity}
        />
      </Canvas>
    </View>
  );
};

const HostNotSignedin = () => {
  const accentColor = useAppAccentColor();
  const {userDetails} = useUserStore();
  const {t} = useTranslate();
  const [estimateModalVisible, setEstimateModalVisible] = React.useState(false);

  const HandlePublishCar = () => {
    if (userDetails?.id) {
      navigate('SignupComplete', {user_type: 'host'});
    } else {
      navigate('Signup', {user_type: 'host'});
    }
  };

  const HandleSignin = () => {
    if (userDetails?.user_type?.includes('host')) {
    }

    if (userDetails?.id) {
      navigate('SignupComplete', {user_type: 'host'});
    } else {
      navigate('Signin', {user_type: 'host'});
    }
  };

  const HandleEstimateCar = () => {
    setEstimateModalVisible(false);
    void Linking.openURL('https://erivan.fr/ai-chat/car-rental-estimator.php').catch(
      () => undefined,
    );
  };

  const HandleContinuePublishing = () => {
    setEstimateModalVisible(false);
    HandlePublishCar();
  };

  return (
    <CustomWrapper>
      <ScrollView>
        <CustomText
          text={t('getVerifiedAndPublishCar')}
          textStyle={styles.heading}
        />
        <CustomText
          text={t('monetizeYourIdleCar')}
          style={styles.description}
        />
        <IdentityCardSkiaHero />
        <View style={styles.buttonsSection}>
          <CustomButton
            loading={false}
            title={t('publishCar')}
            onPress={() => setEstimateModalVisible(true)}
            containerStyle={[styles.publishCar, {backgroundColor: accentColor}]}
          />

          <CustomButton
            loading={false}
            title={t('signInButton')}
            onPress={HandleSignin}
            containerStyle={styles.signin}
            textStyle={styles.signinText}
          />
        </View>
      </ScrollView>
      <Modal
        isVisible={estimateModalVisible}
        onBackdropPress={() => setEstimateModalVisible(false)}
        onBackButtonPress={() => setEstimateModalVisible(false)}>
        <View style={styles.estimateModal}>
          <Image
            source={require('../../assets/images/car-estimator-vehicle.png')}
            resizeMode="contain"
            accessibilityLabel={t('estimateCarAndEarnings')}
            style={styles.estimateModalCar}
          />
          <CustomText
            text={t('estimateCarAndEarnings')}
            textStyle={styles.estimateModalTitle}
            center
          />
          <CustomText
            text={t('estimateCarAndEarningsDescription')}
            textStyle={styles.estimateModalDescription}
            center
          />
          <CustomButton
            loading={false}
            title={t('estimateEarnings')}
            onPress={HandleEstimateCar}
            containerStyle={styles.estimateModalPrimary}
            textStyle={styles.estimateModalPrimaryText}
          />
          <CustomButton
            loading={false}
            title={t('continueWithoutEstimate')}
            onPress={HandleContinuePublishing}
            containerStyle={styles.estimateModalSecondary}
            textStyle={styles.estimateModalSecondaryText}
          />
        </View>
      </Modal>
    </CustomWrapper>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: RFValue(26),
    fontFamily: FONT.poppins600,
    lineHeight: RFValue(30),
    // maxWidth: widthPercentageToDP(69),
    paddingHorizontal: widthPercentageToDP(5),
    paddingTop: widthPercentageToDP(15),
    paddingBottom: widthPercentageToDP(1),
  },
  description: {
    color: COLORS.neutral400,
    fontSize: RFValue(14),
    fontFamily: FONT.inter500,
    paddingHorizontal: widthPercentageToDP(5),
  },
  heroSection: {
    marginTop: widthPercentageToDP(2.2),
    marginBottom: widthPercentageToDP(1),
    height: widthPercentageToDP(64),
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroCanvas: {
    borderRadius: 24,
  },
  buttonsSection: {
    marginTop: widthPercentageToDP(2.8),
  },
  publishCar: {
    borderRadius: 100,
    marginHorizontal: widthPercentageToDP(5.2),
    marginVertical: widthPercentageToDP(4),
  },
  signin: {
    borderRadius: 100,
    marginHorizontal: widthPercentageToDP(5.2),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.white,
    ...SHADOWS.light,
    marginBottom: widthPercentageToDP(5),
  },
  signinText: {
    color: COLORS.primary,
  },
  estimateModal: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RFValue(16),
    gap: RFValue(8),
    paddingHorizontal: widthPercentageToDP(6),
    paddingVertical: widthPercentageToDP(6),
  },
  estimateModalCar: {
    height: widthPercentageToDP(39),
    width: widthPercentageToDP(72),
  },
  estimateModalTitle: {
    color: COLORS.black,
    fontFamily: FONT.poppins600,
    fontSize: RFValue(18),
    fontWeight: '600',
    paddingBottom: RFValue(2),
    textAlign: 'center',
  },
  estimateModalDescription: {
    color: COLORS.neutral600,
    fontFamily: FONT.inter500,
    fontSize: RFValue(13),
    lineHeight: RFValue(20),
    paddingBottom: RFValue(8),
    textAlign: 'center',
  },
  estimateModalPrimary: {
    backgroundColor: COLORS.green,
    borderRadius: 100,
    width: '100%',
  },
  estimateModalPrimaryText: {
    color: COLORS.white,
    fontFamily: FONT.poppins600,
    fontWeight: '700',
  },
  estimateModalSecondary: {
    backgroundColor: '#F3F4F6',
    borderRadius: 100,
    width: '100%',
  },
  estimateModalSecondaryText: {
    color: COLORS.black,
    fontFamily: FONT.inter600,
    fontWeight: '600',
  },
});

export default HostNotSignedin;

import React from 'react';
import { ImageBackground, Pressable, StyleSheet, View } from 'react-native';
import { COLORS, IMAGES } from '../../utils/theme';
import { CustomButton, CustomText } from '../../components';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { navigateReset } from '../../utils/navigation';
import useUserStore from '../../service/store/user.store';
import { useTranslate } from '../../hooks/useTranslate';
import AnimatedText from './AnimatedText';
import { DEFAULT_ACCENT_COLOR } from '../../hooks/useAppAccentColor';

const Onboarding = () => {
  const {
    setOnboardingStatus,
    setAppAccentColor,
    setRoleChooserPending,
  } = useUserStore();
  const { t, language, changeLanguage } = useTranslate();
  const selectedLanguage = language?.startsWith('fr') ? 'fr' : 'en';

  const handleNavigate = async () => {
    setAppAccentColor?.(DEFAULT_ACCENT_COLOR);
    setOnboardingStatus?.(true);
    setRoleChooserPending(true);
    navigateReset('RootStack');
  };

  return (
    <ImageBackground
      source={IMAGES.onboarding}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={styles.wrapper}>
        {/* Centered Apple-Style Text */}
        <View style={styles.centerSection}>
          <AnimatedText
            text={t('onboardingSubtitle')}
            fontPath={require('../../../assets/fonts/Bumbbled.otf')}
            fontSize={80}
            width={widthPercentageToDP(85)}
            duration={2500}
          />
        </View>

        {/* Bottom CTA Button */}
        <View style={styles.bottomSection}>
          <View style={styles.languageSection}>
            <CustomText
              text={selectedLanguage === 'fr' ? 'Choisir la langue' : 'Choose the language'}
              fontWeightPopins="600"
              color={COLORS.white}
              style={styles.languageTitle}
            />

            <View style={styles.languageContainer}>
              <Pressable
                onPress={() => changeLanguage('en')}
                style={[
                  styles.languageButton,
                  selectedLanguage === 'en' && styles.languageButtonActive,
                ]}
              >
                <CustomText
                  text="EN"
                  fontWeightPopins="600"
                  color={selectedLanguage === 'en' ? COLORS.white : COLORS.black}
                />
              </Pressable>

              <Pressable
                onPress={() => changeLanguage('fr')}
                style={[
                  styles.languageButton,
                  selectedLanguage === 'fr' && styles.languageButtonActive,
                ]}
              >
                <CustomText
                  text="FR"
                  fontWeightPopins="600"
                  color={selectedLanguage === 'fr' ? COLORS.white : COLORS.black}
                />
              </Pressable>
            </View>
          </View>

          <CustomButton
            title={selectedLanguage === 'fr' ? 'Continuer' : 'Continue'}
            onPress={handleNavigate}
            containerStyle={[
              styles.btnContainer,
              {
                backgroundColor: DEFAULT_ACCENT_COLOR,
                paddingHorizontal: widthPercentageToDP(10),
              },
            ]}
          />
        </View>

      </View>
    </ImageBackground>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: COLORS.black, // Fallback color while image loads
  },

  wrapper: {
    flex: 1,
  },

  languageSection: {
    alignItems: 'center',
    marginBottom: widthPercentageToDP(4),
  },

  languageTitle: {
    marginBottom: widthPercentageToDP(2),
  },

  languageContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 100,
    padding: widthPercentageToDP(1),
  },

  languageButton: {
    borderRadius: 100,
    paddingVertical: widthPercentageToDP(1.6),
    paddingHorizontal: widthPercentageToDP(4),
  },

  languageButtonActive: {
    backgroundColor: COLORS.black,
  },

  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomSection: {
    paddingBottom: widthPercentageToDP(10),
    alignItems: 'center',
  },

  btnContainer: {
    borderRadius: 100,
    minWidth: widthPercentageToDP(80),
  },
});

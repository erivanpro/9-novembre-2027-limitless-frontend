import React, {useState} from 'react';
import {StyleSheet, View, SectionList, ActivityIndicator} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  CustomHeader,
  CustomSearchInput,
  CustomText,
  CustomWrapper,
} from '../../components';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONT} from '../../utils/theme';
import HelpCenterContainerItem from './components/HelpCenterContainerItem';
import {useHelpcenter} from '../../hooks/useHelpcenter';
import useTranslate from '../../hooks/useTranslate';

const HELP_CENTER_SECTION_TRANSLATION_MAP: Record<string, string> = {
  HOSTS: 'helpCenterHosts',
  HOST: 'helpCenterHosts',
  RENTERS: 'helpCenterRenters',
  RENTER: 'helpCenterRenters',
  INSURANCE: 'helpCenterInsurance',
  LEGAL: 'helpCenterLegal',
};

const HelpCenter = () => {
  const [search, setSearch] = useState('');
  const {t} = useTranslate();

  const {getHelpcenterData, getHelpcenterDataLoading} = useHelpcenter({search});
  const data = getHelpcenterData?.data?.data?.sections || [];

  const getTranslatedSectionTitle = (title: string) => {
    const key =
      HELP_CENTER_SECTION_TRANSLATION_MAP[title?.trim()?.toUpperCase()];

    return key ? t(key) : title;
  };

  console.log({getHelpcenterData});
  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <CustomHeader title={t('helpCenterTitle')} />
      <CustomSearchInput onChangeText={text => setSearch(text)} />
      <Animatable.View
        animation="fadeIn"
        duration={500}
        delay={100}
        useNativeDriver
        style={styles.animatedContainer}>
        {getHelpcenterDataLoading ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <SectionList
            sections={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.title + index}
            renderItem={({item}) => (
              <View
                style={[styles.headerContainer, {backgroundColor: COLORS.white}]}>
                <HelpCenterContainerItem
                  title={item.title}
                  description={item?.answer}
                />
              </View>
            )}
            renderSectionHeader={({section}) => (
              <View style={styles.sectionHeader}>
                <CustomText
                  text={getTranslatedSectionTitle(section.title)}
                  textStyle={styles.headerText}
                />
              </View>
            )}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </Animatable.View>
    </CustomWrapper>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: RFValue(20),
  },
  headerContainer: {
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(15),
    borderBottomWidth: RFValue(1),
    borderBottomColor: COLORS.neutral200,
  },
  headerText: {
    fontSize: RFValue(14),
    fontFamily: FONT.inter500,
    color: COLORS.neutral700,
  },
  itemContainer: {
    backgroundColor: COLORS.white,
    marginVertical: RFValue(5),
    borderBottomColor: COLORS.neutral200,
    borderBottomWidth: RFValue(1),
    padding: RFValue(11),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: COLORS.neutral600,
    fontSize: RFValue(13),
    fontFamily: FONT.interRegular,
  },
  sectionHeader: {
    paddingVertical: RFValue(12),
    backgroundColor: COLORS.white,
  },
});

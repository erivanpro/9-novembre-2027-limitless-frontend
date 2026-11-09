import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import SectionHeading from '../SectionHeading';
import AssistanceCard from '../AssistanceCard';
import {IMAGES} from '../../../../utils/theme';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useTranslate} from '../../../../hooks/useTranslate';

const AssistanceSection = () => {
  const {t} = useTranslate();

  const data = [
    {
      thumbnail: IMAGES.assistanceThumbnailBanner,
      image: IMAGES.assistanceThumbnailBanner,
      title: t('howDoesRentingWorkTitle'),
      id: 1,
      pageHeading: t('howRentingWorksPageHeading'),
      intro: t('rentingHelpIntro'),
      steps: [
        {
          title: t('rentingStep1Title'),
          description: t('rentingStep1Description'),
        },
        {
          title: t('rentingStep2Title'),
          description: t('rentingStep2Description'),
        },
        {
          title: t('rentingStep3Title'),
          description: t('rentingStep3Description'),
        },
        {
          title: t('rentingStep4Title'),
          description: t('rentingStep4Description'),
        },
      ],
    },

    {
      thumbnail: IMAGES.assistanceThumbnail2,
      image: IMAGES.assistanceThumbnail2,
      title: t('howDoesHostingWorkTitle'),
      id: 2,
      pageHeading: t('howHostingWorksPageHeading'),
      intro: t('hostingHelpIntro'),
      steps: [
        {
          title: t('hostingStep1Title'),
          description: t('hostingStep1Description'),
        },
        {
          title: t('hostingStep2Title'),
          description: t('hostingStep2Description'),
        },
        {
          title: t('hostingStep3Title'),
          description: t('hostingStep3Description'),
        },
        {
          title: t('hostingStep4Title'),
          description: t('hostingStep4Description'),
        },
      ],
    },
  ];

  return (
    <View>
      <SectionHeading heading={t('help')} fontSize="S16" />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item}) => <AssistanceCard {...item} />}
        ItemSeparatorComponent={() => ItemSeparatorComponent()}
      />
    </View>
  );
};

export default AssistanceSection;

const ItemSeparatorComponent = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {width: widthPercentageToDP(3)},
});

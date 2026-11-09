import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import {COLORS} from '../../../utils/theme';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {navigateGoBack} from '../../../utils/navigation';
import {CustomIcon, CustomImage, CustomText} from '../../../components';

type Props = {
  text?: string;
  profile_pic?: string;
  showBackBtn?: boolean;
  backHandler?: () => void;
};

const ChatHeader: FC<Props> = data => {
  const {text, profile_pic, showBackBtn, backHandler} = data || {};

  return (
    <View style={styles.container}>
      <View style={styles.child}>
        {showBackBtn && (
          <CustomIcon
            style={styles.iconContainer}
            onPress={backHandler ? backHandler : () => navigateGoBack()}
            size={RFValue(20)}
            type={'AntDesign'}
            icon="arrowleft"
          />
        )}
        {profile_pic && (
          <CustomImage source={{uri: profile_pic}} style={styles.profilePic} />
        )}
        <CustomText text={text} />
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderColor: COLORS.NeutralGrey20,
    paddingBottom: RFValue(10),
  },
  child: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    borderWidth: RFValue(1),
    borderColor: COLORS.NeutralGrey20,
    borderRadius: 100,
    padding: RFValue(5),
    marginRight: widthPercentageToDP(3),
  },
  profilePic: {
    height: widthPercentageToDP(10),
    width: widthPercentageToDP(10),
    borderRadius: 100,
    marginRight: widthPercentageToDP(3),
  },
});

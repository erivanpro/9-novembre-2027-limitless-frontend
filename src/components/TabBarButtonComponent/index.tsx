import React from 'react';
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CustomImage from '../CustomImage';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import {Source} from 'react-native-fast-image';

interface TabBarButtonProps {
  props: BottomTabBarButtonProps | TouchableWithoutFeedbackProps;
  image: Source | undefined;
  imageFocused: Source | undefined;
  focused: boolean;
}

const TabBarButtonComponent: React.FC<TabBarButtonProps> = ({
  props,
  image,
  imageFocused,
  focused,
}) => {
  return (
    <TouchableWithoutFeedback
      disabled={props.disabled ?? false}
      delayLongPress={props.delayLongPress ?? undefined}>
      <View>
        <View style={styles.center}>
          <CustomImage
            source={focused ? imageFocused : image}
            height={hp(4)}
            width={hp(3)}
            resizeMode="contain"
            disabled={true}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  center: {justifyContent: 'center', alignItems: 'center'},
});

export default TabBarButtonComponent;

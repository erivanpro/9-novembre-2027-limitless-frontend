import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  Bubble,
  BubbleProps,
  Composer,
  ComposerProps,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  SendProps,
} from 'react-native-gifted-chat';
import {COLORS} from '../../../utils/theme';
import {CustomIcon} from '../../../components';

const renderTime = () => {
  return null;
};

const renderBubble = (props: Readonly<BubbleProps<IMessage>>) => {
  return (
    <Bubble
      {...props}
      textStyle={{
        right: {
          color: COLORS.white,
        },
        left: {
          color: COLORS.black,
          fontWeight: 400,
        },
      }}
      wrapperStyle={{
        right: {
          backgroundColor: COLORS.black,
          padding: widthPercentageToDP(1),
        },
        left: {
          backgroundColor: COLORS.neutral50,
          padding: widthPercentageToDP(1),
          borderColor: COLORS.neutral50,
          borderWidth: 1,
        },
      }}
    />
  );
};

// Only to hide the default send button
const renderSend = (_: SendProps<IMessage>) => {
  return <TouchableOpacity></TouchableOpacity>;
};

const renderComposer = (props: ComposerProps) => {
  return (
    <Composer
      {...props}
      placeholder="Message"
      textInputStyle={{
        paddingRight: RFValue(10),
        color: "black",
      }}
    />
  );
};

const renderInputToolbar = (props: InputToolbarProps<IMessage>) => {
  const {text, onSend} = props || {};
  const hasInputValue = !!text.trim().length;

  const HandlePress = () => {
    if (hasInputValue && onSend) {
      // Construct the message object
      const newMessage: IMessage = {
        _id: Math.random().toString(), // Unique ID for the message
        text: text.trim(),
        createdAt: new Date(),
        user: {
          _id: 1, // The ID of the current user
        },
      };

      // Trigger the onSend function with the new message
      onSend([newMessage], true);
    }
  };

  return (
    <View style={styles.renderInputToolbarContainer}>
      <InputToolbar {...props} containerStyle={styles.inputToolbar} />
      <TouchableOpacity
        style={styles.sendContainerActive}
        onPress={HandlePress}>
        <CustomIcon
          icon={'paper-airplane'}
          type={'Octicons'}
          size={22}
          color={hasInputValue ? COLORS.white : COLORS.neutral50}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  renderInputToolbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: RFValue(10),
  },
  inputToolbar: {
    width: '80%',
    borderRadius: 10,
    borderTopWidth: 1,
    minHeight: RFValue(45),
    justifyContent: 'center',
    borderColor: COLORS.neutral50,
    borderWidth: 1,
    borderTopColor: COLORS.neutral50,
  },
  sendContainer: {
    borderWidth: 1,
    borderColor: COLORS.neutral50,
    padding: RFValue(12),
    borderRadius: 10,
    justifyContent: 'center',
    maxHeight: RFValue(45),
    alignSelf: 'flex-end',
  },

  sendContainerActive: {
    borderWidth: 0,
    padding: RFValue(12),
    borderRadius: RFValue(100),
    justifyContent: 'center',
    maxHeight: RFValue(45),
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
  },
});

export {
  renderTime,
  renderBubble,
  renderSend,
  renderComposer,
  renderInputToolbar,
};

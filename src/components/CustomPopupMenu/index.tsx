import React, {FC} from 'react';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomIcon} from '../CustomIcon';
import {CustomText} from '../CustomText';
import Row from '../Row';
import {MenuType} from '../../utils/types/globalType';

interface CustomPopupMenuProps {
  menu?: MenuType[];
  optionsContainerStyle?: any;
  textStyle?: any;
}

const CustomPopupMenu: FC<CustomPopupMenuProps> = ({
  menu,
  optionsContainerStyle,
  textStyle,
}) => {
  return (
    <Menu>
      <MenuTrigger>
        <CustomIcon
          type="Entypo"
          icon="dots-three-vertical"
          size={RFValue(16)}
        />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            borderRadius: RFValue(15),
            padding: RFValue(10),
          ...optionsContainerStyle,
          }
        }}
      >
        {menu?.map(val => (
          <MenuOption
            key={val?.name}
            onSelect={val.onPress}
            style={{
              borderRadius: RFValue(10),
            }}


          >
            <Row justifyContent="space-between">
              <CustomText
                text={val?.name}
                fontWeightPopins="400"
                fontSize="S14"
                textStyle={textStyle}
              />
              {val?.icon && val?.icon}
            </Row>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

export default CustomPopupMenu;

import React, {useMemo} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, IMAGES, SHADOWS } from '../utils/theme';
import { ChatList, Home, Hosting, Search, Setting } from '../screens';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { CustomImage } from '../components';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Source } from 'react-native-fast-image';
import { navigate } from '../utils/navigation';
import useUserStore from '../service/store/user.store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

interface TabbarItem {
  id: number;
  name: 'Home' | 'Search' | 'Hosting' | 'Chat' | 'Setting';
  image: Source;
  component: React.ComponentType;
}

const HOST_MODE_VISIBLE_TABS: TabbarItem['name'][] = ['Hosting', 'Chat', 'Setting'];

const BottomTabNavigation = () => {
  const { accessToken, isHostMode } = useUserStore();
  const { bottom } = useSafeAreaInsets();
  const hostModeEnabled = !!isHostMode;

  const Tabbar = useMemo<TabbarItem[]>(() => {
    const tabs: TabbarItem[] = [
      {
        id: 1,
        name: 'Home',
        image: IMAGES.home,
        component: Home,
      },
      {
        id: 2,
        name: 'Search',
        image: IMAGES.search,
        component: Search,
      },
      {
        id: 3,
        name: 'Hosting',
        image: IMAGES.hostingCarBottomTab,
        component: Hosting,
      },
      {
        id: 4,
        name: 'Chat',
        image: IMAGES.bottomtabChat,
        component: ChatList,
      },
      {
        id: 5,
        name: 'Setting',
        image: IMAGES.setting,
        component: Setting,
      },
    ];

    if (!hostModeEnabled) {
      return tabs;
    }

    return tabs.filter(tab => HOST_MODE_VISIBLE_TABS.includes(tab.name));
  }, [hostModeEnabled]);

  const renderTabBarButton = (
    props: { focused: boolean },
    image: Source,
    tab: TabbarItem,
  ) => {
    const { focused } = props;
    return (
      <TouchableWithoutFeedback
        onPress={
          tab.name === 'Chat' && !accessToken
            ? () => navigate('UserAuthScreen')
            : () => navigate(tab.name as never)
        }
      >
        <View style={styles.buttonContainer}>
          <View
            style={[
              styles.iconContainer,
              focused ? styles.iconContainerFocused : undefined,
            ]}
          >
            <CustomImage
              source={image}
              height={hp(3)}
              width={hp(3)}
              resizeMode="contain"
              disabled={true}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Tab.Navigator
      key={hostModeEnabled ? 'host-mode-tabs' : 'default-tabs'}
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      {Tabbar.map(tab => (
        <Tab.Screen
          name={tab.name}
          component={tab.component}
          key={tab.id}
          options={{
            tabBarStyle: {
              ...styles.tabBarStyle,
              bottom: bottom + hp(2),
            },
            tabBarIcon: ({ focused }) =>
              renderTabBarButton({ focused }, tab.image, tab),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: COLORS.white,
    position: 'absolute',
    // left and right do not works on initial load, so as a workaround we have used marginHorizontal
    // left: hp(5),
    // right: hp(5),
    height: hp(8),
    marginHorizontal: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // flex: 1,
    paddingBottom: 0,
    paddingTop: hp(1.5),
    borderRadius: 80,
    borderWidth: 1,
    borderColor: COLORS.white,
    ...SHADOWS.light,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    padding: hp(1.5),
    borderRadius: hp(80),
    backgroundColor: 'transparent',
  },
  iconContainerFocused: {
    backgroundColor: COLORS.black,
    ...SHADOWS.medium,
  },
});

export default BottomTabNavigation;

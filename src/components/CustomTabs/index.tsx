import * as React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, SHADOWS} from '../../utils/theme';
import useTranslate from '../../hooks/useTranslate';

const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

const ThirdRoute = () => <View style={{flex: 1, backgroundColor: '#673ab7'}} />;

export default function CustomTabs({
  sceneMap = {
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  },
  screenRoutes = [
    {key: 'first', title: 'ongoing'},
    {key: 'second', title: 'upcoming'},
    {key: 'third', title: 'completed'},
  ],
  lazy = false,
}) {
  const layout = useWindowDimensions();
  const {t} = useTranslate();
  const renderScene = SceneMap(sceneMap);

  const [index, setIndex] = React.useState(0);

  const formattedTranslate = () => {
    return screenRoutes.map(route => ({
      ...route,
      title: t(route.title),
    }));
  };

  console.log(formattedTranslate(), 'formattedTranslate');
  const [routes] = React.useState(formattedTranslate());

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      lazy={lazy}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={props => (
        <View>
          <TabBar
            onTabPress={() => { }}
            {...props}
            activeColor={COLORS.black}
            inactiveColor={COLORS.neutral500}
            style={{backgroundColor: COLORS.white, marginBottom: RFValue(10)}}
            indicatorStyle={[styles.indicatorStyle, SHADOWS.light]}
            // labelStyle={styles.labelStyle}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  indicatorStyle: {
    position: 'absolute',
    // height: '80%',
    backgroundColor: COLORS.black,
    // bottom: '10%',
    borderRadius: RFValue(8),
    width: '30%',
    left: '1.5%',
  },
  labelStyle: {
    fontSize: RFValue(14),
  },
});

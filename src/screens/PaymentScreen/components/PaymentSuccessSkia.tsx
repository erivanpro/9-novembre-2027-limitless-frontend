import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Canvas,
  Circle,
  LinearGradient,
  Path,
  useClock,
  vec,
} from '@shopify/react-native-skia';
import {useDerivedValue} from 'react-native-reanimated';

import {widthPercentageToDP} from 'react-native-responsive-screen';
import {COLORS} from '../../../utils/theme';

type PaymentSuccessSkiaProps = {
  size?: number;
};

const PaymentSuccessSkia: FC<PaymentSuccessSkiaProps> = ({
  size = widthPercentageToDP(30),
}) => {
  const clock = useClock();
  const center = size / 2;
  const outerRadius = size * 0.47;
  const ringRadius = size * 0.41;
  const innerRadius = size * 0.36;
  const checkStroke = size * 0.075;

  const pulse = useDerivedValue(
    () => (Math.sin(clock.value / 700) + 1) / 2,
    [],
  );

  const haloRadius = useDerivedValue(
    () => ringRadius + pulse.value * size * 0.12,
    [ringRadius, size],
  );

  const haloOpacity = useDerivedValue(
    () => 0.1 + (1 - pulse.value) * 0.18,
    [],
  );

  const outerPulseRadius = useDerivedValue(
    () => outerRadius + pulse.value * size * 0.035,
    [outerRadius, size],
  );

  const ringPulseRadius = useDerivedValue(
    () => ringRadius + pulse.value * size * 0.025,
    [ringRadius, size],
  );

  const checkOpacity = useDerivedValue(
    () => 0.85 + pulse.value * 0.15,
    [],
  );

  const checkPath = `
    M ${size * 0.3} ${size * 0.52}
    L ${size * 0.44} ${size * 0.66}
    L ${size * 0.72} ${size * 0.38}
  `;

  return (
    <View style={[styles.container, {width: size, height: size}]}>
      <Canvas style={StyleSheet.absoluteFillObject}>
        <Circle
          cx={center}
          cy={center}
          r={haloRadius}
          color="rgba(143,0,255,0.24)"
          opacity={haloOpacity}
        />
        <Circle
          cx={center}
          cy={center}
          r={outerPulseRadius}
          color="rgba(143,0,255,0.14)"
        />
        <Circle
          cx={center}
          cy={center}
          r={ringPulseRadius}
          style="stroke"
          strokeWidth={size * 0.06}
          color="rgba(143,0,255,0.32)"
        />
        <Circle cx={center} cy={center} r={innerRadius}>
          <LinearGradient
            start={vec(size * 0.15, size * 0.15)}
            end={vec(size * 0.9, size * 0.9)}
            colors={['#DDB7FF', COLORS.purple, '#6600BA']}
          />
        </Circle>

        <Path
          path={checkPath}
          style="stroke"
          strokeCap="round"
          strokeJoin="round"
          strokeWidth={checkStroke}
          color={COLORS.white}
          opacity={checkOpacity}
        />
      </Canvas>
    </View>
  );
};

export default PaymentSuccessSkia;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
});

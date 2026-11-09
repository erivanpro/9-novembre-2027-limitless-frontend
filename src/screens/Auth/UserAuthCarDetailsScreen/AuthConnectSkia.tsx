import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  BlurMask,
  Canvas,
  Circle,
  Group,
  LinearGradient,
  Path,
  RoundedRect,
  useClock,
  vec,
} from '@shopify/react-native-skia';
import { useDerivedValue } from 'react-native-reanimated';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import useAppAccentColor from '../../../hooks/useAppAccentColor';
import { COLORS } from '../../../utils/theme';

type AuthConnectSkiaProps = {
  width?: number;
  height?: number;
};

const AuthConnectSkia: FC<AuthConnectSkiaProps> = ({
  width = widthPercentageToDP(42),
  height = widthPercentageToDP(31),
}) => {
  const accentColor = useAppAccentColor();
  const clock = useClock();

  const sideCardX = width * 0.08;
  const sideCardY = height * 0.52;
  const sideCardWidth = width * 0.29;
  const sideCardHeight = height * 0.22;

  const cardX = width * 0.24;
  const cardY = height * 0.1;
  const cardWidth = width * 0.56;
  const cardHeight = height * 0.78;

  const badgeCx = cardX + cardWidth * 0.95;
  const badgeCy = cardY + cardHeight * 0.18;
  const badgeRadius = width * 0.07;

  const glowDriftX = width * 0.04;
  const glowDriftY = height * 0.05;
  const shineStartX = cardX - width * 0.14;
  const shineTravel = cardWidth + width * 0.28;

  const glowLeftX = useDerivedValue(
    () => width * 0.18 + Math.sin(clock.value / 1500) * glowDriftX,
    [width, glowDriftX],
  );

  const glowLeftY = useDerivedValue(
    () => height * 0.24 + Math.cos(clock.value / 1650) * glowDriftY,
    [height, glowDriftY],
  );

  const glowRightX = useDerivedValue(
    () => width * 0.82 - Math.sin(clock.value / 1400) * glowDriftX,
    [width, glowDriftX],
  );

  const glowRightY = useDerivedValue(
    () => height * 0.7 + Math.sin(clock.value / 1250) * glowDriftY,
    [height, glowDriftY],
  );

  const pulseRadius = useDerivedValue(
    () => badgeRadius + ((Math.sin(clock.value / 700) + 1) / 2) * width * 0.018,
    [badgeRadius, width],
  );

  const pulseOpacity = useDerivedValue(
    () => 0.2 + ((Math.sin(clock.value / 700) + 1) / 2) * 0.18,
    [],
  );

  const sparkleOpacity = useDerivedValue(
    () => 0.28 + ((Math.sin(clock.value / 540) + 1) / 2) * 0.52,
    [],
  );

  const shineX = useDerivedValue(
    () => shineStartX + ((clock.value / 14) % shineTravel),
    [shineStartX, shineTravel],
  );

  const buttonGlowOpacity = useDerivedValue(
    () => 0.35 + ((Math.sin(clock.value / 460) + 1) / 2) * 0.35,
    [],
  );

  const cardClip = useDerivedValue(
    () => ({
      x: cardX,
      y: cardY,
      width: cardWidth,
      height: cardHeight,
    }),
    [cardX, cardY, cardWidth, cardHeight],
  );

  const shacklePath = `
    M ${badgeCx - width * 0.02} ${badgeCy + height * 0.018}
    Q ${badgeCx - width * 0.02} ${badgeCy - height * 0.04}
      ${badgeCx} ${badgeCy - height * 0.04}
    Q ${badgeCx + width * 0.02} ${badgeCy - height * 0.04}
      ${badgeCx + width * 0.02} ${badgeCy + height * 0.018}
  `;

  const lockBodyX = badgeCx - width * 0.032;
  const lockBodyY = badgeCy + height * 0.006;
  const lockBodyWidth = width * 0.064;
  const lockBodyHeight = height * 0.085;

  return (
    <View style={[styles.container, { width, height }]}>
      <Canvas style={StyleSheet.absoluteFillObject}>
        <RoundedRect x={0} y={0} width={width} height={height} r={28}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={['#F7FFF6', '#EEF7FF', COLORS.white]}
          />
        </RoundedRect>

        <RoundedRect
          x={2}
          y={2}
          width={width - 4}
          height={height - 4}
          r={26}
          color="rgba(255,255,255,0.58)"
        />

        <Circle
          cx={glowLeftX}
          cy={glowLeftY}
          r={width * 0.15}
          color="rgba(51,187,120,0.16)"
        >
          <BlurMask blur={18} style="normal" />
        </Circle>

        <Circle
          cx={glowRightX}
          cy={glowRightY}
          r={width * 0.13}
          color="rgba(48,131,255,0.16)"
        >
          <BlurMask blur={18} style="normal" />
        </Circle>

        <Circle
          cx={width * 0.75}
          cy={height * 0.22}
          r={width * 0.12}
          color="rgba(255,95,0,0.1)"
        >
          <BlurMask blur={16} style="normal" />
        </Circle>

        <RoundedRect
          x={sideCardX}
          y={sideCardY + height * 0.03}
          width={sideCardWidth}
          height={sideCardHeight}
          r={18}
          color="rgba(0,0,0,0.08)"
        />

        <RoundedRect
          x={sideCardX}
          y={sideCardY}
          width={sideCardWidth}
          height={sideCardHeight}
          r={18}
        >
          <LinearGradient
            start={vec(sideCardX, sideCardY)}
            end={vec(sideCardX + sideCardWidth, sideCardY + sideCardHeight)}
            colors={[COLORS.white, '#FFF7EF']}
          />
        </RoundedRect>

        <Circle
          cx={sideCardX + sideCardWidth * 0.2}
          cy={sideCardY + sideCardHeight * 0.3}
          r={width * 0.024}
          color={accentColor}
        />

        <RoundedRect
          x={sideCardX + sideCardWidth * 0.33}
          y={sideCardY + sideCardHeight * 0.22}
          width={sideCardWidth * 0.4}
          height={height * 0.017}
          r={99}
          color="rgba(0,0,0,0.42)"
        />

        <RoundedRect
          x={sideCardX + sideCardWidth * 0.17}
          y={sideCardY + sideCardHeight * 0.54}
          width={sideCardWidth * 0.66}
          height={height * 0.017}
          r={99}
          color="rgba(0,0,0,0.22)"
        />

        <Circle
          cx={sideCardX + sideCardWidth * 0.22}
          cy={sideCardY + sideCardHeight * 0.78}
          r={width * 0.011}
          color={COLORS.orange}
        />
        <Circle
          cx={sideCardX + sideCardWidth * 0.36}
          cy={sideCardY + sideCardHeight * 0.78}
          r={width * 0.011}
          color="rgba(0,0,0,0.22)"
        />
        <Circle
          cx={sideCardX + sideCardWidth * 0.5}
          cy={sideCardY + sideCardHeight * 0.78}
          r={width * 0.011}
          color="rgba(0,0,0,0.22)"
        />

        <RoundedRect
          x={cardX}
          y={cardY + height * 0.035}
          width={cardWidth}
          height={cardHeight}
          r={24}
          color="rgba(0,0,0,0.1)"
        />

        <RoundedRect
          x={cardX}
          y={cardY}
          width={cardWidth}
          height={cardHeight}
          r={24}
        >
          <LinearGradient
            start={vec(cardX, cardY)}
            end={vec(cardX + cardWidth, cardY + cardHeight)}
            colors={[COLORS.white, '#F5FBFF']}
          />
        </RoundedRect>

        <RoundedRect
          x={cardX}
          y={cardY}
          width={cardWidth}
          height={cardHeight * 0.24}
          r={24}
          color="rgba(51,187,120,0.12)"
        />

        <Group clip={cardClip}>
          <RoundedRect
            x={shineX}
            y={cardY}
            width={width * 0.1}
            height={cardHeight}
            r={0}
            color="rgba(255,255,255,0.22)"
          />
        </Group>

        <RoundedRect
          x={cardX + cardWidth * 0.32}
          y={cardY + cardHeight * 0.08}
          width={cardWidth * 0.36}
          height={height * 0.015}
          r={99}
          color="rgba(0,0,0,0.16)"
        />

        <Circle
          cx={cardX + cardWidth * 0.26}
          cy={cardY + cardHeight * 0.34}
          r={width * 0.055}
          color="rgba(48,131,255,0.14)"
        />

        <Circle
          cx={cardX + cardWidth * 0.26}
          cy={cardY + cardHeight * 0.31}
          r={width * 0.022}
          color="rgba(48,131,255,0.3)"
        />

        <RoundedRect
          x={cardX + cardWidth * 0.2}
          y={cardY + cardHeight * 0.36}
          width={width * 0.12}
          height={height * 0.06}
          r={16}
          color="rgba(48,131,255,0.24)"
        />

        <RoundedRect
          x={cardX + cardWidth * 0.14}
          y={cardY + cardHeight * 0.5}
          width={cardWidth * 0.68}
          height={height * 0.024}
          r={99}
          color="rgba(0,0,0,0.28)"
        />

        <RoundedRect
          x={cardX + cardWidth * 0.14}
          y={cardY + cardHeight * 0.6}
          width={cardWidth * 0.54}
          height={height * 0.024}
          r={99}
          color="rgba(0,0,0,0.18)"
        />

        <Circle
          cx={cardX + cardWidth * 0.21}
          cy={cardY + cardHeight * 0.61}
          r={width * 0.012}
          color="rgba(0,0,0,0.35)"
        />
        <Circle
          cx={cardX + cardWidth * 0.28}
          cy={cardY + cardHeight * 0.61}
          r={width * 0.012}
          color="rgba(0,0,0,0.35)"
        />
        <Circle
          cx={cardX + cardWidth * 0.35}
          cy={cardY + cardHeight * 0.61}
          r={width * 0.012}
          color="rgba(0,0,0,0.35)"
        />
        <Circle
          cx={cardX + cardWidth * 0.42}
          cy={cardY + cardHeight * 0.61}
          r={width * 0.012}
          color="rgba(0,0,0,0.35)"
        />

        <RoundedRect
          x={cardX + cardWidth * 0.13}
          y={cardY + cardHeight * 0.73}
          width={cardWidth * 0.74}
          height={height * 0.1}
          r={14}
        >
          <LinearGradient
            start={vec(cardX, cardY)}
            end={vec(cardX + cardWidth, cardY + cardHeight)}
            colors={[accentColor, COLORS.blue]}
          />
        </RoundedRect>

        <RoundedRect
          x={cardX + cardWidth * 0.28}
          y={cardY + cardHeight * 0.775}
          width={cardWidth * 0.32}
          height={height * 0.014}
          r={99}
          color="rgba(255,255,255,0.74)"
          opacity={buttonGlowOpacity}
        />

        <Circle
          cx={badgeCx}
          cy={badgeCy}
          r={pulseRadius}
          color="rgba(143,0,255,0.18)"
          opacity={pulseOpacity}
        />

        <Circle cx={badgeCx} cy={badgeCy} r={badgeRadius}>
          <LinearGradient
            start={vec(badgeCx - badgeRadius, badgeCy - badgeRadius)}
            end={vec(badgeCx + badgeRadius, badgeCy + badgeRadius)}
            colors={[accentColor, COLORS.purple]}
          />
        </Circle>

        <Path
          path={shacklePath}
          style="stroke"
          strokeWidth={width * 0.012}
          strokeCap="round"
          color={COLORS.white}
        />

        <RoundedRect
          x={lockBodyX}
          y={lockBodyY}
          width={lockBodyWidth}
          height={lockBodyHeight}
          r={8}
          color={COLORS.white}
        />

        <Circle
          cx={badgeCx}
          cy={lockBodyY + lockBodyHeight * 0.45}
          r={width * 0.008}
          color={accentColor}
        />

        <RoundedRect
          x={badgeCx - width * 0.0045}
          y={lockBodyY + lockBodyHeight * 0.48}
          width={width * 0.009}
          height={height * 0.026}
          r={99}
          color={accentColor}
        />

        <Circle
          cx={width * 0.12}
          cy={height * 0.22}
          r={width * 0.012}
          color={COLORS.white}
          opacity={sparkleOpacity}
        />

        <Circle
          cx={width * 0.88}
          cy={height * 0.35}
          r={width * 0.01}
          color={COLORS.white}
          opacity={sparkleOpacity}
        />

        <Circle
          cx={width * 0.7}
          cy={height * 0.86}
          r={width * 0.011}
          color={COLORS.white}
          opacity={sparkleOpacity}
        />
      </Canvas>
    </View>
  );
};

export default AuthConnectSkia;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
});

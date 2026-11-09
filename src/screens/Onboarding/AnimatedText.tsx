import React, { useEffect, useMemo } from 'react';
import {
  Canvas,
  Group,
  Text,
  useClock,
  useFont,
} from '@shopify/react-native-skia';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
  cancelAnimation,
} from 'react-native-reanimated';



import { RFValue } from 'react-native-responsive-fontsize';

interface AnimatedTextProps {
  text: string;
  fontPath: any;
  fontSize?: number;
  width?: number;
  duration?: number;
  showCursor?: boolean;
}

const getCharWeight = (char: string, index: number) => {
  if (char.trim() === '') return 0.45;
  if (/[.,!?;:]/.test(char)) return 1.65;
  if (/[A-Z]/.test(char)) return 1.15;

  const organicVariance = 0.9 + ((Math.sin((index + 1) * 1.7) + 1) / 2) * 0.22;
  return 1 * organicVariance;
};

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  fontPath,
  fontSize = 60,
  width = 320,
  duration = 2200,
  showCursor = true,
}) => {
  const scaledSize = RFValue(fontSize);
  const font = useFont(fontPath, scaledSize);
  const clock = useClock();
  const writeProgress = useSharedValue(0);

  const timingDuration = Math.max(duration, 500);



  useEffect(() => {
  if (!font) return;

  // Clean previous animation if text changes
  cancelAnimation(writeProgress);

  writeProgress.value = withRepeat(
    withSequence(
      // Type
      withTiming(1, {
        duration: timingDuration,
        easing: Easing.bezier(0.22, 0.7, 0.3, 1),
      }),

      // Pause after typing
      withTiming(1, { duration: 800 }),

      // Delete
      withTiming(0, {
        duration: timingDuration * 0.8,
        easing: Easing.bezier(0.6, 0.05, 0.7, 0.2),
      }),

      // Pause before restart
      withTiming(0, { duration: 600 })
    ),
    -1, // 🔁 infinite
    false
  );
}, [font, text, timingDuration, writeProgress]);



  const textMetrics = useMemo(() => {
    if (!font) return null;

    const charsLength = text.length;
    const widths: number[] = [0];
    for (let i = 1; i <= charsLength; i += 1) {
      widths.push(font.measureText(text.slice(0, i)).width);
    }

    if (charsLength === 0) {
      return { widths, stops: [0], textWidth: 0 };
    }

    const stops: number[] = [0];
    let totalWeight = 0;
    for (let i = 0; i < charsLength; i += 1) {
      totalWeight += getCharWeight(text[i], i);
      stops.push(totalWeight);
    }

    const normalizedStops = stops.map(stop => stop / totalWeight);
    return {
      widths,
      stops: normalizedStops,
      textWidth: widths[widths.length - 1],
    };
  }, [font, text]);

  const revealWidth = useDerivedValue(() => {
    if (!textMetrics || text.length === 0) return 0;

    const progress = Math.max(0, Math.min(writeProgress.value, 1));
    const { stops, widths } = textMetrics;
    const charsLength = text.length;

    let segment = 0;
    while (segment < charsLength && progress > stops[segment + 1]) {
      segment += 1;
    }

    const segmentStart = stops[segment] ?? 0;
    const segmentEnd = stops[segment + 1] ?? 1;
    const segmentWidthStart = widths[segment] ?? 0;
    const segmentWidthEnd = widths[segment + 1] ?? segmentWidthStart;
    const segmentRange = segmentEnd - segmentStart;

    if (segmentRange <= 0) return segmentWidthStart;

    const segmentProgress = (progress - segmentStart) / segmentRange;
    return (
      segmentWidthStart + (segmentWidthEnd - segmentWidthStart) * segmentProgress
    );
  }, [textMetrics, text]);

  const cursorX = useDerivedValue(() => {
    const textWidth = textMetrics?.textWidth ?? 0;
    const offset = scaledSize * 0.03;
    return Math.min(revealWidth.value + offset, textWidth);
  }, [scaledSize, textMetrics?.textWidth]);

  const cursorY = useDerivedValue(() => {
    const isWriting = writeProgress.value < 0.995;
    const wobble = isWriting ? Math.sin(clock.value / 95) * scaledSize * 0.03 : 0;
    return scaledSize + wobble;
  }, [scaledSize]);

  const revealClip = useDerivedValue(() => {
    const clipPadding = scaledSize * 0.18;
    return {
      x: 0,
      y: 0,
      width: revealWidth.value + clipPadding,
      height: scaledSize * 1.65,
    };
  }, [scaledSize]);

  const cursorOpacity = useDerivedValue(() => {
    if (!showCursor) return 0;
    const isWriting = writeProgress.value < 0.995;

    if (isWriting) {
      return 0.7 + ((Math.sin(clock.value / 75) + 1) / 2) * 0.25;
    }

    return 0.25 + ((Math.sin(clock.value / 280) + 1) / 2) * 0.75;
  }, [showCursor]);

  if (!font) return null;

  const baselineY = scaledSize;
  const canvasHeight = scaledSize * 1.65;

  return (
    <Canvas style={{ width, height: canvasHeight }}>
      <Group clip={revealClip}>
        <Text x={0} y={baselineY} text={text} font={font} color="#FFFFFF" />
      </Group>

      {showCursor && (
        <Text
          x={cursorX}
          y={cursorY}
          text="|"
          font={font}
          opacity={cursorOpacity}
          color="#FFFFFF"
        />
      )}
    </Canvas>
  );
};

export default AnimatedText;

import React from 'react';
import {
  Canvas,
  Circle,
  Group,
  Line,
  BlurMask,
} from '@shopify/react-native-skia';

type Props = {
  size?: number;
};

const ErrorIcon = ({size = 72}: Props) => {
  const center = size / 2;

  return (
    <Canvas style={{width: size, height: size}}>
      <Group>
        {/* Glow */}
        <Circle cx={center} cy={center} r={28} color="rgba(239,68,68,0.18)">
          <BlurMask blur={18} style="solid" />
        </Circle>

        {/* Main Circle */}
        <Circle
          cx={center}
          cy={center}
          r={24}
          color="#FEF2F2"
        />

        {/* Border */}
        <Circle
          cx={center}
          cy={center}
          r={23}
          color="#FCA5A5"
          style="stroke"
          strokeWidth={1.5}
        />

        {/* X Mark */}
        <Line
          p1={{x: center - 7, y: center - 7}}
          p2={{x: center + 7, y: center + 7}}
          color="#DC2626"
          strokeWidth={3}
          strokeCap="round"
        />

        <Line
          p1={{x: center + 7, y: center - 7}}
          p2={{x: center - 7, y: center + 7}}
          color="#DC2626"
          strokeWidth={3}
          strokeCap="round"
        />
      </Group>
    </Canvas>
  );
};

export default ErrorIcon;
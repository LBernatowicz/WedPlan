import React from 'react';
import Svg, { SvgXml } from 'react-native-svg';
import { StyleProp } from 'react-native';
import { StyleProps } from 'react-native-reanimated';
import { EIconsName } from 'assets/svg/Icons';

export interface IIconProps {
  iconName: EIconsName;
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<StyleProps>;
}

const Icon = ({
  iconName,
  width = 20,
  height = 20,
  color,
  style,
}: IIconProps) => {
  return (
    <Svg width={width} height={height} color={color} style={style}>
      <SvgXml xml={iconName} />
    </Svg>
  );
};

export default Icon;

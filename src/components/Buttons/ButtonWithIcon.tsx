import React from 'react';
import { TouchableOpacity, StyleSheet, StyleProp } from 'react-native';
import Svg, { SvgXml } from 'react-native-svg';
import { EIconsName } from 'assets/svg/Icons';
import { StyleProps } from 'react-native-reanimated';

type TButtonWithIcon = {
  iconName: EIconsName;
  onPress?: () => void;
  disable?: boolean;
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<StyleProps>;
};

const ButtonWithIcon = ({
  iconName,
  onPress,
  disable,
  width = 20,
  height = 20,
  color,
  style,
}: TButtonWithIcon) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disable}
      style={[styles.container, style]}>
      <Svg width={width} height={height} color={color}>
        <SvgXml xml={iconName} />
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ButtonWithIcon;

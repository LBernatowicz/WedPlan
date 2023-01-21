/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../Icon/Icon';
import { EIconsName } from 'assets/svg/Icons';
import { colors } from '../../assets/utils/colors';

interface ISdkLoginProps {
  size: 'small' | 'medium' | 'large';
  icon: 'facebook' | 'twitter' | 'github';
  action: () => void;
}

const SdkLoginButton = ({ size, icon, action }: ISdkLoginProps) => {
  const [iconType, setIconType] = useState({
    icon: EIconsName.facebook,
    bgColor: 'blue',
    iconColor: 'red',
  });
  const sizeSelectorHandler = () => {
    switch (size) {
      case 'small':
        return styles.small;
      case 'medium':
        return styles.medium;
      case 'large':
        return styles.large;
      default:
        return styles.small;
    }
  };

  const iconSelectorHandler = () => {
    switch (icon) {
      case 'facebook':
        return setIconType({
          icon: EIconsName.facebook,
          bgColor: colors.external.facebook,
          iconColor: colors.external.white,
        });
      case 'twitter':
        return setIconType({
          icon: EIconsName.twitter,
          bgColor: colors.external.white,
          iconColor: colors.external.twitter,
        });
      case 'github':
        return setIconType({
          icon: EIconsName.github,
          bgColor: colors.external.black,
          iconColor: colors.external.white,
        });
      default:
        return setIconType({
          icon: EIconsName.facebook,
          bgColor: colors.external.twitter,
          iconColor: colors.external.white,
        });
    }
  };

  useEffect(() => {
    iconSelectorHandler();
  }, []);

  return (
    <TouchableOpacity
      style={[
        sizeSelectorHandler(),
        styles.shadows,
        { backgroundColor: iconType.bgColor },
      ]}
      onPress={action}>
      <Icon
        iconName={iconType.icon}
        width={20}
        height={20}
        color={iconType.iconColor}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  shadows: {
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  small: {
    width: 41,
    height: 41,
    borderRadius: 2,
    backgroundColor: 'red',
  },
  medium: {},
  large: {},
});

export default SdkLoginButton;

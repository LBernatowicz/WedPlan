import React, { ReactElement, useEffect, useState } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from 'assets/utils/colors';
import {
  IconFacebook,
  IconGithub,
  IconGoogle,
  IconTwitter,
} from 'assets/svg/Index';

interface ISdkLoginProps {
  size: 'small' | 'medium' | 'large';
  icon: 'facebook' | 'twitter' | 'github' | 'google';
  action: () => void;
}

interface IIconInterface {
  icon: ReactElement;
  bgColor: string;
  externalStyle?: StyleProp<any>;
}

const SdkLoginButton = ({ size, icon, action }: ISdkLoginProps) => {
  const [iconType, setIconType] = useState<IIconInterface>({
    icon: <IconFacebook width={20} height={20} color={'red'} />,
    bgColor: 'blue',
    externalStyle: null,
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
          icon: (
            <IconFacebook width={30} height={30} fill={colors.external.white} />
          ),
          bgColor: colors.external.facebook,
          externalStyle: styles.facebookIcon,
        });
      case 'twitter':
        return setIconType({
          icon: (
            <IconTwitter
              width={30}
              height={30}
              fill={colors.external.twitter}
            />
          ),
          bgColor: colors.external.white,
          externalStyle: { marginHorizontal: 5 },
        });
      case 'github':
        return setIconType({
          icon: (
            <IconGithub width={35} height={35} fill={colors.external.white} />
          ),
          bgColor: colors.external.black,
          externalStyle: { marginHorizontal: 5 },
        });
      case 'google':
        return setIconType({
          icon: <IconGoogle width={35} height={35} />,
          bgColor: colors.external.white,
          externalStyle: { marginHorizontal: 5 },
        });
      default:
        return setIconType({
          icon: (
            <IconGoogle width={20} height={20} fill={colors.external.white} />
          ),
          bgColor: colors.external.twitter,
          externalStyle: { marginHorizontal: 5 },
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
        styles.iconCenter,
        iconType.externalStyle && iconType.externalStyle,
        { backgroundColor: iconType.bgColor },
      ]}
      onPress={action}>
      {iconType.icon}
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
    elevation: 5,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  iconCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  small: {
    width: 41,
    height: 41,
    borderRadius: 2,
    backgroundColor: 'red',
  },
  medium: {},
  large: {},
  facebookIcon: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginHorizontal: 10,
  },
});

export default SdkLoginButton;

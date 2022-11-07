import React, { useCallback, useEffect, useMemo } from 'react';
import { Text } from 'react-native';
import { Pressable } from 'react-native';
import { Image } from '../../../ui/primitives/Image/Image';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import useAnimatedPress, {
  AnimationType,
} from '../../../hooks/ui/useAnimatedPress';
import { AppRouteScreensType } from '../../types/AppRouteType';
import {
  HashIconImg,
  ChurchIcon,
  WedRingIcon,
  TipLocationIcon,
} from '../../../assets/icons';
import { useTranslation } from 'react-i18next';

type Props = {
  isActive: boolean;
  routeName: string;
  onPress: (route: { key: string; name: string }, isActive: boolean) => void;
  notification?: boolean;
};

const BottomTabBarItem = ({ isActive, routeName, onPress }: Props) => {
  const { t } = useTranslation();
  const { animation, handlePressIn, handlePressOut } = useAnimatedPress({
    animationType: AnimationType.spring,
    options: {
      overshootClamping: true,
    },
  });

  const handlePress = useCallback(() => {
    onPress({ key: routeName, name: routeName }, isActive);
  }, [onPress, isActive, routeName]);

  const animationStyle = useAnimatedStyle(() => ({
    borderWidth: interpolate(animation.value, [0, 1], [0, 2]),
  }));

  const iconBoxStyle = useAnimatedStyle(() => ({
    width: interpolate(animation.value, [0, 1], [24, 20]),
    height: interpolate(animation.value, [0, 1], [24, 20]),
  }));

  const routeTranslation = useMemo(() => {
    switch (routeName) {
      case AppRouteScreensType.homeScreen:
        return t('HomeScreen');
      case AppRouteScreensType.welcomeScreen:
        return t('WelcomeScreen');
      case AppRouteScreensType.mainScreen:
        return t('MainScreen');
      default:
        return '';
    }
  }, [routeName, t]);

  const routeIcon = useMemo(() => {
    switch (routeName) {
      case AppRouteScreensType.homeScreen:
        return WedRingIcon;
      case AppRouteScreensType.welcomeScreen:
        return TipLocationIcon;
      case AppRouteScreensType.mainScreen:
        return ChurchIcon;
      default:
        return HashIconImg;
    }
  }, [routeName]);

  useEffect(() => {
    if (isActive) {
      handlePressIn();
    } else {
      handlePressOut();
    }
  }, [isActive, handlePressIn, handlePressOut]);

  return (
    <Pressable
      testID={`${routeName}Button`}
      onPress={handlePress}
      //sentry-label={`TabBarItem-${routeName}`}
      style={({ pressed }) => ({
        backgroundColor: pressed ? 'silver' : 'transparent',
        flexDirection: 'column',
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      })}>
      <Animated.View
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            width: 36,
            height: 36,
            borderRadius: 36,
            borderColor: 'blue',
          },
          animationStyle,
        ]}>
        <Animated.View style={iconBoxStyle}>
          <Image style={{ width: '100%', height: '100%' }} source={routeIcon} />
        </Animated.View>
      </Animated.View>
      <Text
        maxFontSizeMultiplier={1}
        style={{ color: isActive ? 'black' : 'gray' }}>
        {routeTranslation}
      </Text>
    </Pressable>
  );
};

export default React.memo(BottomTabBarItem);

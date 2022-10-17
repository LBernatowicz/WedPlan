import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useIsKeyboardShown from 'hooks/ui/useIsKeyboardShown';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useAnimatedScrollValue } from '../../../hooks/ui/useAnimatedScroll';
import { AppRouteType } from '../../types/AppRouteType';
import BottomTabBarItem from './BottomTabBarItem';

const BottomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const paddingBottomTabBar = insets.bottom;
  const bottomTabBarHeight = 69 + paddingBottomTabBar;
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const { emit, navigate } = navigation;
  const tabBarHideOnKeyboard = !!focusedOptions?.tabBarHideOnKeyboard;
  const isKeyboardShown = useIsKeyboardShown();
  const shouldShowTabBar = !(tabBarHideOnKeyboard && isKeyboardShown);
  const keyboardAnim = useSharedValue(shouldShowTabBar ? 0 : 200);
  const { name } = state.routes[state.index];
  useEffect(() => {
    keyboardAnim.value = withSpring(shouldShowTabBar ? 0 : 200, {
      overshootClamping: true,
    });
  }, [shouldShowTabBar]);

  const { animation } = useAnimatedScrollValue();

  const animatedStyle = useAnimatedStyle(() => {
    const animatedValue =
      name !== AppRouteType.homeScreen ? 0 : animation.value;
    // Animate bottom tab bar
    const height = interpolate(
      animatedValue + keyboardAnim.value,
      [0, 200],
      [bottomTabBarHeight, 0],
      Extrapolate.CLAMP,
    );
    return {
      height,
    };
  });

  const tabBarPress = useCallback(
    (route: { key: string; name: string }, isActive: boolean) => {
      const event = emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isActive && !event.defaultPrevented) {
        navigate(route.name);
      }
    },
    [emit, navigate],
  );

  const hasNewMessages = true;
  const hasNewNotifications = false;
  const showMessagesNotification = hasNewMessages || hasNewNotifications;

  return (
    <Animated.View style={[animatedStyle, { backgroundColor: 'blue' }]}>
      <View
        testID="NavigationBar"
        style={[
          styles.container,
          {
            height: bottomTabBarHeight,
            paddingBottom: paddingBottomTabBar,
            backgroundColor: 'white',
          },
        ]}>
        {state.routes.map((route, index) => {
          const isActive = state.index === index;
          return (
            <BottomTabBarItem
              key={route.name}
              routeName={route.name}
              isActive={isActive}
              onPress={tabBarPress}
              notification={
                route.name === AppRouteType.homeScreen &&
                showMessagesNotification
              }
            />
          );
        })}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
});

export default BottomTabBar;

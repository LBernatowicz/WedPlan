import { useCallback } from 'react';

import {
  useSharedValue,
  withSpring,
  WithSpringConfig,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';
import useEvent from '../useEvent';

export enum AnimationType {
  spring = 'withSpring',
  time = 'withTiming',
}

type SpringAnimation = {
  animationType: AnimationType.spring;
  options?: WithSpringConfig;
};

type TimingAnimation = {
  animationType: AnimationType.time;
  options?: WithTimingConfig;
};

const useAnimatedPress = ({
  animationType,
  options,
}: SpringAnimation | TimingAnimation) => {
  const handleAnimationType = useEvent((value: number) => {
    switch (animationType) {
      case 'withSpring':
        return withSpring(value, options);
      case 'withTiming':
        return withTiming(value, options);
      default:
        return value;
    }
  });

  const animation = useSharedValue(0);
  const handlePressIn = useCallback(() => {
    animation.value = handleAnimationType(1);
  }, [animation, handleAnimationType]);

  const handlePressOut = useCallback(() => {
    animation.value = handleAnimationType(0);
  }, [animation, handleAnimationType]);

  const animationFinished = animation.value === 1;

  return {
    animation,
    handlePressIn,
    handlePressOut,
    animationFinished,
  };
};

export default useAnimatedPress;

import React, { useContext } from 'react';
import {
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const HEADER_HEIGHT = 200;

const useAnimatedScroll = (scrollLimit = 0) => {
  const animation = useSharedValue(0);
  const isScrollBegin = useSharedValue(1);

  const handleScroll = useAnimatedScrollHandler<{ prevY?: number }>({
    onBeginDrag: (event, ctx) => {
      ctx.prevY = event.contentOffset.y;
    },
    onScroll: (event, ctx) => {
      // Prevent minimal scroll from running animations
      const MIN_DIFF = 20;
      isScrollBegin.value = withTiming(
        event.contentOffset.y <= MIN_DIFF ? 1 : 0,
      );
      if (event.contentOffset.y < scrollLimit) {
        animation.value = withTiming(0);
        return;
      }
      const diff = event.contentOffset.y - (ctx.prevY || 0);
      const absDiff = Math.abs(diff) - MIN_DIFF;
      if (absDiff > 0) {
        const direction = diff < 0;
        animation.value = withTiming(direction ? 0 : HEADER_HEIGHT);
      }
    },
  });

  return {
    isScrollBegin,
    animation,
    handleScroll,
  };
};

const AnimatedScrollContext = React.createContext<ReturnType<
  typeof useAnimatedScroll
> | null>(null);

export const AnimatedScrollProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const value = useAnimatedScroll(HEADER_HEIGHT);
  return (
    <AnimatedScrollContext.Provider value={value}>
      {children}
    </AnimatedScrollContext.Provider>
  );
};

export const useAnimatedScrollValue = () => {
  const value = useContext(AnimatedScrollContext);
  if (!value) {
    throw new Error(
      'useAnimatedScrollValue must be used within a AnimatedScrollProvider',
    );
  }
  return value;
};

export default useAnimatedScroll;

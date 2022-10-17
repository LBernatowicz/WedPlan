import React from 'react';

import Navigation from './navigation/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AnimatedScrollProvider } from './hooks/ui/useAnimatedScroll';

const App = () => {
  return (
    <SafeAreaProvider>
      <AnimatedScrollProvider>
        <Navigation />
      </AnimatedScrollProvider>
    </SafeAreaProvider>
  );
};

export default App;

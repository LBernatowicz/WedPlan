import React from 'react';

import Navigation from './navigation/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AnimatedScrollProvider } from './hooks/ui/useAnimatedScroll';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const App = () => {
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <AnimatedScrollProvider>
          <Navigation />
        </AnimatedScrollProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
};

export default App;

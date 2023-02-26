import React from 'react';

import Navigation from './navigation/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AnimatedScrollProvider } from './hooks/ui/useAnimatedScroll';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from './store/setupStore';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Toast from './components/Toast/Toast';
import i18n from './config/translations/i18n';

const persistor = persistStore(store);

const translations = () => i18n;

const App = () => {
  translations();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <ErrorBoundary>
            <AnimatedScrollProvider>
              <Navigation />
              <Toast />
            </AnimatedScrollProvider>
          </ErrorBoundary>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

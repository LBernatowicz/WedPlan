import * as React from 'react';
import { EmitterSubscription, Keyboard, Platform } from 'react-native';

/**
 * Hook to check if the keyboard is shown
 * @source https://github.com/react-navigation/react-navigation/blob/5b13f818f3c701ce33c2a30f5dd96763069556e4/packages/bottom-tabs/src/utils/useIsKeyboardShown.tsx
 */
export default function useIsKeyboardShown() {
  const [isKeyboardShown, setIsKeyboardShown] = React.useState(false);

  React.useEffect(() => {
    const handleKeyboardShow = () => setIsKeyboardShown(true);
    const handleKeyboardHide = () => setIsKeyboardShown(false);

    let subscriptions: EmitterSubscription[];

    if (Platform.OS === 'ios') {
      subscriptions = [
        Keyboard.addListener('keyboardWillShow', handleKeyboardShow),
        Keyboard.addListener('keyboardWillHide', handleKeyboardHide),
      ];
    } else {
      subscriptions = [
        Keyboard.addListener('keyboardDidShow', handleKeyboardShow),
        Keyboard.addListener('keyboardDidHide', handleKeyboardHide),
      ];
    }

    return () => {
      subscriptions.forEach((s) => s.remove());
    };
  }, []);

  return isKeyboardShown;
}

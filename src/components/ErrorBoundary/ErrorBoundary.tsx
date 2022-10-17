import React, { PureComponent, ReactNode } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import RNRestart from 'react-native-restart';
import {
  SafeAreaInsetsContext,
  SafeAreaView,
} from 'react-native-safe-area-context';

interface Error {
  name: string;
  message: string;
}

interface State {
  error?: Error;
}

interface Props {
  children: ReactNode | Array<ReactNode>;
}

class ErrorBoundary extends PureComponent<Props> {
  public static getDerivedStateFromError(error: Error) {
    return { error };
  }
  public state: State = {
    error: undefined,
  };

  restartApp = () => {
    RNRestart.Restart();
  };

  public render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error && !__DEV__) {
      return (
        <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              margin: 40,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />
          <View style={{ flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                paddingHorizontal: 20,
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{ marginBottom: 12, fontSize: 20, textAlign: 'center' }}>
                {/* @ts-ignore */}
                Error Boundary
              </Text>
            </ScrollView>
            <SafeAreaInsetsContext.Consumer>
              {(insets) => (
                <View
                  style={{
                    paddingHorizontal: 16,
                    paddingTop: 12,
                    paddingBottom: (insets?.top || 0) + 12,
                    backgroundColor: 'white',
                    width: '100%',
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: 0,
                    elevation: 24,
                  }}>
                  <TouchableOpacity
                    style={{ flex: 1, backgroundColor: 'red' }}
                    onPress={this.restartApp}>
                    <Text style={{ fontSize: 16, textAlign: 'center' }}>
                      {/* @ts-ignore */}
                      Reset App
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </SafeAreaInsetsContext.Consumer>
          </View>
        </SafeAreaView>
      );
    }
    return children;
  }
}

export default ErrorBoundary;

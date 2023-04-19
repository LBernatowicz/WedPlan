const config = {
  screens: {
    AuthTabs: {
      screens: {
        SplashScreen: 'deeplink/:linkingLogin/:linkingPassword',
      },
    },
  },
};

export const linking = {
  prefixes: ['http://wedplan', 'wedplan://'],
  config,
};

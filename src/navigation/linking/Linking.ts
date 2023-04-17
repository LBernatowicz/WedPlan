const config = {
  screens: {
    AuthTabs: {
      screens: {
        SplashScreen: ':linkingLogin/:linkingPassword',
      },
    },
  },
};

export const linking = {
  prefixes: ['http://wedplan', 'wedplan://'],
  config,
};

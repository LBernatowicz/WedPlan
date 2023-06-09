const pl = {
  // ================= screens !! ========================
  BottomBar: {
    invitationTitle: 'Invitation',
    infoTitle: 'Info',
    fotoVideoTitle: 'Foto & Video',
  },
  // Login Screen
  LinkingScreen: {
    header: 'Great! Your account is waiting!',
    or: 'Or',
  },
  LoginScreen: {
    title: 'Login!',
    bio: 'Please log in to continue',
    button: {
      login: 'Login',
      forgotPassword: 'Forgot Password',
    },
    divider: 'or',
    goToRegister: {
      info: 'You can create account here!',
      register: 'Register',
    },
    form: {
      textInput: {
        login: 'Login',
        password: 'Password',
        repeatPassword: 'Repeat password',
      },
    },
  },
  // Register Screen
  RegisterScreen: {
    title: 'Sign Up!',
    bio: 'Please sign up to continue',
    button: {
      register: 'Register',
    },
    divider: 'or',
    goToRegister: {
      info: 'You can log in here!',
      register: 'Login',
    },
    form: {
      textInput: {
        login: 'Login',
        password: 'Password',
        repeatPassword: 'Repeat password',
        repeatPasswordError: 'Password is not match',
      },
    },
  },
  HomeScreen: {
    KnL: 'Kamila & Łukasz',
  },
  ResetPassword: {
    header: 'Reset your password!',
    subTitle: 'Check your email to change password',
    resetButton: 'Reset your password',
    loginButton: 'Login',
    loginSubtitle: 'You can create account here!',
  },
  VersioningScreen: {
    title: 'New update is ready!',
    bio: 'We create new version of app with more interesting modules for you!',
    updateButton: 'Update your App!',
    closeAppButton: 'Shutdown App ;(',
  },
  SettingsScreen: {
    changeLanguageHeader: 'Would you like to change language?',
    callToCoupleHeader: 'Would you like to contact us?',
    kamila: 'Kamila',
    lukasz: 'Łukasz',
    editSurveyDataHeader: 'Would you like to change survey?',
    editSurveyButton: 'Edit your answers!',
    logoutHeader: ' Would you log out?',
    logoutButton: 'Logout',
    version: 'Version: ',
  },
  WelcomeScreen: 'welcome screen',
  Navigation: {
    BottomTabBar: {
      home: 'Home',
    },
  },
  Toasts: {
    EmailLoginFail: 'Login Error!',
    LogOutHeader: 'LogOut!',
    LogOutBody: 'You successful log out!',
    ForgetPasswordHeader: 'Email send!',
    WrongEmailOrPassword: 'Wrong email or password...',
    ForgetPasswordBody: 'Check your email and reset your password!',
    EmailIsFailHeader: 'Wrong email!',
    EmailIsFailBody: 'You probably write wrong email ;(',
  },

  GuestsSurvey: {
    welcomeFilled: 'Hello!!',
    surveyInfoIsNoFilled:
      'In the interests of the comfort of our guests, please fill out a short survey to make the joint celebration more pleasant.',
    surveyInfoIsFilled:
      'You have already completed your survey. You can, of course, edit it by clicking on the button :)',
    surveyDietInfo:
      'Meals are very important, so specify what kind of dishes you want to eat?',
    surveyPresentInfo: 'Will you attend the party?',
    buttons: {
      accept: 'Accept!',
    },
  },
};

export default pl;

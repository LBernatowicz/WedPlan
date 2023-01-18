import { firebase } from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export const HandleSingIn = async (email: string, password: string) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => console.log(error));
};

export const HandleSignUp = async (email: string, password: string) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => console.log('@error', error));
};

export const handleGoogleSignIn = async () => {
  await GoogleSignin.configure({
    iosClientId:
      '970877023178-5f01tuu62g78fbpgk37oh0l9d0hq1tuf.apps.googleusercontent.com',
    offlineAccess: false,
  });
  // It will prompt google Signin Widget
  try {
    await GoogleSignin.hasPlayServices({
      // Check if device has Google Play Services installed
      // Always resolves to true on iOS
    });
    const userInfo = await GoogleSignin.signIn();
    const credential = firebase.auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );
    // login with credential
    await firebase.auth().signInWithCredential(credential);
    console.log('User Info --> ', userInfo);
  } catch (error) {
    console.log('Message', JSON.stringify(error));
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User Cancelled the Login Flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Signing In');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Play Services Not Available or Outdated');
    } else {
      console.log(error.message);
    }
  }
};

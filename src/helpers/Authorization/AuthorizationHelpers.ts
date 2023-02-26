import { firebase } from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

export const handleSignIn = async (email: string, password: string) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => console.log(error));
};

export const handleSignUp = async (email: string, password: string) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => console.log('@error', error));
};

export const handleResetPassword = async (email: string) => {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .catch((error) => console.log('@error', error));
};

export const handleGoogleSignIn = async (externalAction?: () => void) => {
  await GoogleSignin.configure({
    webClientId: Config.WEB_CLIENT_ID,
    offlineAccess: false,
  });
  await GoogleSignin.hasPlayServices({
    showPlayServicesUpdateDialog: true,
  });
  const userInfo = await GoogleSignin.signIn({});
  const credential = firebase.auth.GoogleAuthProvider.credential(
    userInfo?.idToken,
  );

  await firebase
    .auth()
    .signInWithCredential(credential)
    .catch((error) => {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log(error.message);
      }
    })
    .then(() => {
      externalAction && externalAction();
    });
};

export const loginWithFacebook = async (token: string) => {
  const credential = firebase.auth.FacebookAuthProvider.credential(token);

  firebase
    .auth()
    .signInWithCredential(credential)
    .catch((error) =>
      console.log('Facebook login with credential faild: ' + error),
    );
};

export const handlerFacebookSignIn = async (externalAction?: () => void) => {
  LoginManager.logInWithPermissions(['public_profile', 'email'])
    .then((result) => {
      if (result.isCancelled) {
      } else {
        AccessToken.getCurrentAccessToken()
          .then((data) => {
            data?.accessToken &&
              loginWithFacebook(data?.accessToken).then((response) => {
                console.log('powinno sie dodac: ' + response);
                externalAction && externalAction();
              });
          })
          .catch((error) => console.log('Unexpected error: ' + error));
      }
    })
    .catch((error) => console.log('Login fail with error: ' + error));
};

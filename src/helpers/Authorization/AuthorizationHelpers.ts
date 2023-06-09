import { firebase } from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import { AccessToken, LoginManager, Profile } from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleAutoLogin = async () => {
  return new Promise<void>(async (resolve, rejected) => {
    try {
      await firebase
        .auth()
        .onAuthStateChanged((user: any) =>
          user ? resolve(user.email) : rejected('no'),
        );
    } catch (Error) {
      console.log('error', Error);
    }
  });
};

export const handleSignIn = async (
  email: string = '',
  password: string = '',
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      console.log(email, password);
      await firebase.auth().signInWithEmailAndPassword(email, password);
      resolve();
    } catch (Error) {
      reject(Error);
    }
  });
};

export const handleSignUp = async (email: string, password: string) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => console.log('login with email and password: ', error));
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    const token = await currentUser.getIdToken();
    await AsyncStorage.setItem('firebaseToken', token);
    console.log('[Email]: ', token);
  } else {
    console.log('Google login failed: Current user is null');
  }
};

export const handleResetPassword = async (email: string) => {
  return new Promise<any>(async (reject) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
    } catch (error) {
      reject(error);
    }
  });
};

export const handleGoogleSignIn = () => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      await firebase.auth().signOut();
      await GoogleSignin.configure({
        webClientId: Config.WEB_CLIENT_ID,
        offlineAccess: false,
      });

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const userInfo = await GoogleSignin.signIn({});
      const credential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );

      await firebase.auth().signInWithCredential(credential);

      resolve(userInfo.user.email);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log(error.message);
      }
      reject(error);
    }
  });
};
export const handleLogOut = () => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      await firebase.auth().signOut();
      resolve('ok');
    } catch (error) {
      reject(error);
      console.log('[LOGUOT]: ', error);
    }
  });
};

export const loginWithFacebook = async (token: string) => {
  const credential = firebase.auth.FacebookAuthProvider.credential(token);

  await firebase
    .auth()
    .signInWithCredential(credential)
    .catch((error) => console.log(error));
};

export const handlerFacebookSignIn = () => {
  return new Promise<any>((resolve, reject) => {
    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then((result) => {
        if (result.isCancelled) {
        } else {
          AccessToken.getCurrentAccessToken()
            .then((data) => {
              if (data?.accessToken) {
                loginWithFacebook(data.accessToken)
                  .then(() => {
                    Profile.getCurrentProfile().then((loggedUserData) => {
                      resolve(loggedUserData?.email);
                    });
                  })
                  .catch((error) => {
                    console.log('Unexpected error: ' + error);
                    reject(error);
                  });
              }
            })
            .catch((error) => {
              console.log('Unexpected error: ' + error);
              reject(error);
            });
        }
      })
      .catch((error) => {
        console.log('Login fail with error: ' + error);
        reject(error);
      });
  });
};

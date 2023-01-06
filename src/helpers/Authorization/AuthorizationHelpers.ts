import { firebase } from '@react-native-firebase/auth';

export const HandleSingIn = (email: string, password: string) => {
  firebase.auth().signInWithEmailAndPassword(email, password);
};

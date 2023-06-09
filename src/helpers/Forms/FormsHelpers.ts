import { firebase } from '@react-native-firebase/firestore';
import { TInitialUsersCollectionType } from '../../screens/HomeScreen/types/TInitialForm.type';

const currentUser = firebase.auth().currentUser?.email || '';

export const getDocumentsFromCollection = () => {
  return new Promise((resolve: any, reject: any) => {
    firebase
      .firestore()
      .collection('users')
      .get()
      .then((documentation) => {
        documentation.forEach((doc) => {
          if (doc.id === currentUser) {
            resolve(doc.data());
          }
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const setDocumentsFromCollection = (
  newData: TInitialUsersCollectionType,
): Promise<void> => {
  return new Promise((resolve: any, reject: any) => {
    firebase
      .firestore()
      .collection('users')
      .doc(currentUser)
      .set(newData)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

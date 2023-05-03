import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    return await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )
      .then((granted) => {
        if (granted === 'granted') {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(`[Error] ${err}`);
        return false;
      });
  } else {
    return true;
  }
};

export const getLocation = async (setState: any) => {
  const response = await requestLocationPermission()
    .then((res) => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          (position) => {
            setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    })
    .catch((err) => console.log(`[Geolocation Error], ${err}`));
  console.log('asd', response);
};

import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    return await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )
      .then((granted) => {
        console.log('android permissions: ', granted);
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
      if (res) {
        Geolocation.getCurrentPosition(
          (position) => {
            setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {},
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    })
    .catch((err) => console.log(`[Geolocation Error], ${err}`));
  return response;
};

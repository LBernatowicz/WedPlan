import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { colors } from 'assets/utils/colors';
import { LocationDetails } from './consts/locations/locations';
import { useForm, useWatch } from 'react-hook-form';
import RadioButtonController from 'components/RadioButtonController/RadioButtonController';
import { TLocationDetails } from './type/type';

import { useDispatch } from 'react-redux';
import { showModal } from 'store/modalSlice';
import { EModalNames } from 'components/Modal/type/EModalNames';
import { useAppSelector } from 'store/setupStore';
import LottieView from 'lottie-react-native';
import { getLocation } from 'helpers/Geolocation/GeolocationHelpers';
import Config from 'react-native-config';

const lottie = require('assets/lottie/loading.json');

const MapScreen = () => {
  const [origin, setOrigin] = useState<LatLng | null>(null);
  const [destination, setDestination] = useState<TLocationDetails | null>(null);
  const [showTrace, setShowTrace] = useState<boolean>(false);
  const [distance, setDistance] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const dispatch = useDispatch();
  const isModalClose = useAppSelector((state) => state.modal.visible);

  const mapRef = useRef<MapView>(null);
  const lottieRef = useCallback(
    (node: LottieView | null | undefined) => node?.play(),
    [],
  );

  const { control } = useForm({});
  const radioButtonWatcher = useWatch({
    control,
    name: 'destination',
  });

  // icons
  const churchIcon = require('assets/icons/pin-church.png');
  const weddingIcon = require('assets/icons/pin-wedding.png');
  const locationIcon = require('assets/icons/location-pin.png');

  const traceRout = () => {
    const edgePadding = {
      top: 250,
      left: 70,
      bottom: 100,
      right: 70,
    };
    if (origin && destination) {
      mapRef.current?.fitToCoordinates([destination, origin], { edgePadding });
      setShowTrace(true);
    }
  };

  const traceRouteOnReady = (navigationsData: any) => {
    if (navigationsData) {
      setDistance(navigationsData.distance);
      setDuration(navigationsData.duration);
    }
  };

  const radioButtonHandler = (radioButton: number) => {
    switch (radioButton) {
      case 1:
        return setDestination(LocationDetails.Church);
      case 2:
        return setDestination(LocationDetails.Wedding);
      default:
        return setDestination(null);
    }
  };

  const handleOpenPinDetails = () => {
    dispatch(
      showModal({
        modalName: EModalNames.navigationDetails,
        body: {
          buttonTitle: 'Go to your navigation',
          subtitle:
            'You can use your native navigation to make youre journey better',
          time: duration,
          distance: distance,
          origin: origin,
          destination: destination,
        },
        inModal: false,
      }),
    );
  };

  useEffect(() => {
    radioButtonHandler(radioButtonWatcher);
    isModalClose && handleOpenPinDetails();
    traceRout();
  }, [radioButtonWatcher, traceRout]);

  useEffect(() => {
    if (origin) {
      if (origin.latitude !== 49.7784 || origin.longitude !== 22.4801) {
        mapRef.current?.fitToCoordinates([origin]);
      }
    }
  }, [origin]);

  useEffect(() => {
    getLocation(setOrigin);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        maxZoomLevel={15}
        initialRegion={{
          latitude: origin ? origin.latitude : 52.2297,
          longitude: origin ? origin.longitude : 21.0122,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}>
        <Marker
          image={locationIcon}
          coordinate={origin ? origin : { latitude: 0, longitude: 0 }}
          onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
        />
        {destination && (
          <Marker
            draggable
            image={radioButtonWatcher === 1 ? churchIcon : weddingIcon}
            coordinate={destination}
            onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
            onPress={() => handleOpenPinDetails()}
          />
        )}
        {destination && origin && showTrace && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={Config.GOOGLE_API_MAPS}
            strokeColor={colors.main.third}
            strokeWidth={5}
            onReady={traceRouteOnReady}
          />
        )}
      </MapView>
      <View style={styles.switchNavigationDirectionContainer}>
        <RadioButtonController
          key={'destination'}
          name={'destination'}
          control={control}
          orientation={'row'}
          formData={['Church', 'Wedding']}
        />
      </View>
      {origin === null && (
        <View style={styles.loadingContainer}>
          <LottieView
            source={lottie}
            autoPlay={true}
            style={styles.lottie}
            ref={lottieRef}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  mapStyle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-start',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  switchNavigationDirectionContainer: {
    position: 'absolute',
    top: 60,
    width: '90%',
    shadowOffset: { width: 2, height: 2 },
    elevation: 10,
    shadowOpacity: 0.5,
    borderRadius: 10,
    backgroundColor: colors.external.white,
  },
  pinDetailsContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    shadowOffset: { width: 2, height: 2 },
    elevation: 10,
    shadowOpacity: 0.5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: colors.external.white,
  },
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  lottie: {
    position: 'absolute',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 150,
    width: 150,
    flex: 1,
  },
});

export const WelcomeScreenOptions = () => ({ headerShown: false });

export default MapScreen;

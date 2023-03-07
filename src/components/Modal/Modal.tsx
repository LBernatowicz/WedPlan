import React, { useCallback, useRef } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/setupStore';
import { hideModal } from '../../store/modalSlice';
import { colors } from '../../assets/utils/colors';
import { IconClose } from '../../assets/svg/Index';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { EModalNames, modalNameHandler } from './type/EModalNames';
import NavigationDetails from './templates/NavigationDetails';

const Modal = () => {
  //selectors
  const modal = useAppSelector((state) => state.modal);

  //dispatches
  const dispatch = useAppDispatch();

  //destruct
  const { body, visible, modalName } = modal;

  const hideModalHandler = useCallback(() => dispatch(hideModal()), [dispatch]);

  const modalRef = useRef(null);

  const modalTemplateHandler = (name: string) => {
    switch (name) {
      case EModalNames.navigationDetails:
        return (
          <NavigationDetails
            buttonTitle={body && body.buttonTitle}
            distance={body && body.distance}
            time={body && body.time}
            subtitle={body && body.subtitle}
            origin={body && body.origin}
            destination={body && body.destination}
          />
        );
      default:
        return undefined;
    }
  };

  return (
    visible && (
      <Animated.View
        style={[styles.container]}
        entering={SlideInDown}
        exiting={SlideOutDown}
        ref={modalRef}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {modalName && modalNameHandler(modalName)}
          </Text>
          <TouchableOpacity style={styles.exitIcon} onPress={hideModalHandler}>
            <IconClose width={15} height={15} fill={colors.main.secondary} />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          {modalName && modalTemplateHandler(modalName)}
        </View>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.external.white,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    elevation: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  header: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  headerText: {
    color: colors.text.black,
    fontWeight: '500',
    lineHeight: 35,
    fontSize: 14,
    width: Platform.OS === 'android' ? '100%' : 'auto',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  exitIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  body: {
    flex: 1,
  },
});

export default Modal;

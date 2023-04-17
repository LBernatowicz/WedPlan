/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from 'assets/utils/colors';
import { EToastMessageType, hideToast } from 'store/toastSlice';
import { fontSize } from 'assets/utils/fonts';
import { useAppDispatch, useAppSelector } from 'store/setupStore';
import { useTranslation } from 'react-i18next';

const Toast = () => {
  const toast = useAppSelector((state) => state.toast);

  const { title, body, toastMessageType, visible, duration } = toast;
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const toastMessageTypeHandler = (toastType: string | null) => {
    switch (toastType) {
      case EToastMessageType.error:
        return { backgroundColor: colors.external.red };
      case EToastMessageType.default:
        return { backgroundColor: colors.external.yellow };
      case EToastMessageType.success:
        return { backgroundColor: colors.external.blue };
      default:
    }
  };

  const hideToastMessage = useCallback(() => dispatch(hideToast()), [dispatch]);

  useEffect(() => {
    if (visible) {
      setTimeout(
        () => hideToastMessage(),
        typeof duration !== 'number' ? 1000 : duration,
      );
    }
  }, [visible]);

  return (
    <View style={styles.container}>
      {visible && (
        <TouchableOpacity
          onPress={() => dispatch(hideToast())}
          style={[styles.toastContainer, styles.shadowOffset]}>
          <View
            style={[styles.label, toastMessageTypeHandler(toastMessageType)]}
          />
          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{t(`${title}`)}</Text>
            </View>
            <View style={styles.bodyContainer}>
              <Text style={styles.bodyText}>{body}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: '10%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  shadowOffset: {
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 20,
    elevation: 10,
    zIndex: 10,
  },
  contentContainer: {
    padding: 5,
    width: '95%',
  },
  titleContainer: {},
  titleText: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  bodyContainer: {},
  bodyText: {
    fontSize: fontSize.normal,
    color: colors.text.grey,
  },
  label: {
    width: 15,
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  toastContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: colors.main.primary,
    height: 100,
    width: '90%',
    maxWidth: 450,
  },
});

export default memo(Toast);

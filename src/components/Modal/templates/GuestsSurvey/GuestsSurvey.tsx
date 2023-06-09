import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useForm, useWatch } from 'react-hook-form';
import Button from 'components/Buttons/Button';
import { EButtonType } from 'components/Buttons/type/EButtonType';
import { useTranslation } from 'react-i18next';
import DietSurvey from './components/DietSurvey';
import RadioButtonContainer from 'components/RadioButtonContainer/RadioButtonContainer';
import {
  ParseLoggedUserFromFirestore,
  ParseToFirestore,
} from 'helpers/Parsers/Parsers';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store/setupStore';
import { saveUser } from 'store/userSlice';
import { hideModal } from 'store/modalSlice';
import { colors } from '../../../../assets/utils/colors';

export const dietTypeMock = ['Mięsna', 'Wegetariańska', 'Wegańska'];

const GuestsSurvey = () => {
  const [submit, setSubmit] = useState<boolean>(false);
  const [surveyStage, setSurveyStage] = useState<number>(0);

  const dispatch = useAppDispatch();
  const loggedUser = useSelector((store: RootState) => store.global.loggedUser);

  const { control } = useForm({
    defaultValues: ParseLoggedUserFromFirestore(loggedUser),
  });
  const watcher = useWatch({ control });

  const userLength = useMemo(() => {
    return (
      loggedUser && loggedUser.guests.map((user: any) => user.name).length - 1
    );
  }, [loggedUser]);

  const { t } = useTranslation();

  useEffect(() => {
    console.log(watcher);
  }, [watcher]);

  useEffect(() => {}, []);

  return (
    <View style={styles.informationContainer}>
      {!submit && (
        <View style={styles.informationTextContainer}>
          <Text style={styles.informationTextTitle}>
            {t('GuestsSurvey.welcomeFilled')}
          </Text>
          <Text style={styles.informationTextBody}>
            {!submit
              ? t('GuestsSurvey.surveyInfoIsNoFilled')
              : t('GuestsSurvey.surveyInfoIsNoFilled')}
          </Text>
        </View>
      )}
      {!submit && (
        <View style={styles.acceptButtonsContainers}>
          <Button
            title={t('GuestsSurvey.buttons.accept')}
            buttonType={EButtonType.secondary}
            action={() => {
              setSubmit(loggedUser ? loggedUser.isFilled : false);
            }}
            externalStyle={{ flex: 1 }}
          />
        </View>
      )}
      {submit && loggedUser && (
        <View>
          <DietSurvey
            key={`${loggedUser.guests[surveyStage].present}${surveyStage}`}
            item={loggedUser.guests[surveyStage]}
            children={
              <View style={styles.radioButtonContainer}>
                <RadioButtonContainer
                  control={control}
                  formData={['nie', 'tak']}
                  recordName={loggedUser.guests[surveyStage].name + 'Present'}
                  label={t('GuestsSurvey.surveyPresentInfo')}
                />
                <RadioButtonContainer
                  control={control}
                  formData={dietTypeMock}
                  recordName={loggedUser.guests[surveyStage].name + 'Diet'}
                  label={t('GuestsSurvey.surveyDietInfo')}
                  disabled={
                    watcher[loggedUser.guests[surveyStage].name + 'Present'] !==
                    2
                  }
                />
              </View>
            }
          />
        </View>
      )}

      {submit && (
        <View style={styles.surveyFooterContainer}>
          <View style={styles.surveyFooterButtonContainer}>
            <Button
              title={'Wstecz'}
              externalStyle={{ flex: 1 }}
              disabled={surveyStage === 0}
              action={() => setSurveyStage(surveyStage - 1)}
            />
            <Button
              title={surveyStage === userLength ? 'Zapisz' : 'Naprzód'}
              externalStyle={{ flex: 1 }}
              action={() => {
                surveyStage === userLength
                  ? (dispatch(
                      saveUser({
                        id: loggedUser.id && loggedUser?.id,
                        guests: ParseToFirestore(loggedUser, watcher),
                        isFilled: true,
                      }),
                    ).catch((error) => console.log('Er', error)),
                    dispatch(hideModal()))
                  : setSurveyStage(surveyStage + 1);
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  informationContainer: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  buttonsContainers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acceptButtonsContainers: {
    justifyContent: 'space-between',
  },
  flatListContainer: {
    width: '100%',
    flex: 1,
  },
  informationTextContainer: {
    margin: 15,
    width: '100%',
  },
  informationTextTitle: {
    fontSize: 21,
    lineHeight: 30,
    fontWeight: '600',
    color: colors.text.black,
  },
  informationTextBody: {
    fontSize: 14,
    fontWeight: '500',
    width: '90%',
    color: colors.text.black,
  },
  radioButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surveyFooterContainer: {
    paddingTop: 30,
    width: '100%',
  },
  surveyFooterButtonContainer: {
    flexDirection: 'row',
    width: '100%',
  },
});

export default GuestsSurvey;

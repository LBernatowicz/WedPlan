import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import Button from '../../../components/Buttons/Button';
import RadioButtonController from '../../../components/RadioButtonController/RadioButtonController';
import { EButtonType } from '../../../components/Buttons/type/EButtonType';

export const dataMock = [
  {
    name: 'Łukasz',
    surname: 'Bernatowicz',
    kindOfDiet: '',
  },
  {
    name: 'Kamila',
    surname: 'Krzeminska',
    kindOfDiet: '',
  },
  {
    name: 'Adrian',
    surname: 'Dobrzynski',
    kindOfDiet: '',
  },
  {
    name: 'Natalia',
    surname: 'Goldszmit',
    kindOfDiet: '',
  },
];

export const dietTypeMock = ['Mięsna', 'Wegetariańska', 'Wegańska'];

const GuestsSurvey = () => {
  const [submit, setSubmit] = useState<boolean>(false);
  const { control } = useForm({});

  return (
    <View style={styles.informationContainer}>
      <View style={styles.informationTextContainer}>
        <Text style={styles.informationTextTitle}>
          {!submit ? 'Witaj!!' : 'To już niebawem!'}
        </Text>
        <Text style={styles.informationTextBody}>
          {!submit
            ? 'Już niebawem nasze wesele! Pragniemy poinformować Cię, że twój apartament znajduje się w domku nr.'
            : 'Dziękujemy za potwierdzenie. Odpowiedz na kilka pytań, by ułatwić nam gościnę'}
        </Text>
      </View>
      {!submit && (
        <View style={styles.buttonsContainers}>
          <Button
            title={'Potwierdz'}
            buttonType={EButtonType.secondary}
            action={() => setSubmit(!submit)}
          />
          <Button title={'Odmów'} />
        </View>
      )}
      {submit &&
        dataMock.map((guest, index) => {
          return (
            <>
              <View style={styles.informationTextContainer}>
                <Text style={styles.informationTextTitle}>{guest.name}!</Text>
                <Text style={styles.informationTextBody}>
                  Jakiego rodzaju dietę preferujesz?
                </Text>
              </View>
              <RadioButtonController
                control={control}
                name={index.toString()}
                orientation={'row'}
                formData={dietTypeMock}
              />
            </>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  informationContainer: {
    width: 'auto',
    backgroundColor: '#F8C586',
    borderRadius: 20,
    margin: 10,
    flex: 1,
  },
  buttonsContainers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  informationTextContainer: {
    margin: 15,
  },
  informationTextTitle: {
    fontSize: 21,
    lineHeight: 30,
    fontWeight: '600',
  },
  informationTextBody: {
    fontSize: 14,
    fontWeight: '500',
  },

  radioButtonGroupContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: 'red',
  },
  radioButtonContainer: {
    borderWidth: 2,
    borderColor: 'blue',
    flex: 1,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GuestsSurvey;

import 'intl';
import 'intl/locale-data/jsonp/pl';
import 'moment/locale/pl';

import i18n from 'i18next';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';

import pl from 'config/translations/pl';

enum AppLocalsType {
  polish = 'pl',
}

moment.locale(AppLocalsType.polish);
i18n.on('languageChanged', (lng) => {
  moment.locale(lng);
});

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: AppLocalsType.polish,
  simplifyPluralSuffix: true,

  interpolation: {
    escapeValue: false,
    format(value, rawFormat, lng) {
      const [format, ...additionalValues] =
        rawFormat?.split(',').map((v) => v.trim()) || [];

      if (format === 'price') {
        return new Intl.NumberFormat(lng, {
          style: 'currency',
          currency: additionalValues[0],
          useGrouping: false,
        }).format(value);
      }

      if (format === 'priceWithoutComa') {
        return new Intl.NumberFormat(lng, {
          style: 'currency',
          currency: additionalValues[0],
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
          useGrouping: false,
        }).format(value);
      }

      if (format === 'priceRange') {
        const [firstValue, secondValue] = value.split('-');

        return `${firstValue} - ${new Intl.NumberFormat(lng, {
          style: 'currency',
          currency: additionalValues[0],
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
          useGrouping: false,
        }).format(secondValue)}`;
      }

      return value;
    },
  },
  lng: AppLocalsType.polish,
  resources: {
    [AppLocalsType.polish]: {
      translation: pl,
    },
  },
});

export default i18n;

export const toHoursAndMinutesParser = (externalMinutes: number) => {
  const minutes = externalMinutes % 60;
  const hours = Math.floor(externalMinutes / 60);

  return `${hours}h ${minutes > 0 ? `${minutes}min` : ''}`;
};

export const ParseToFirestore = (data: any, obj: any) => {
  const dietHandler = (id: number) => {
    switch (id) {
      case (id = 1):
        return 'meat';
      case (id = 2):
        return 'wege';
      case (id = 3):
        return 'vegan';
      default:
        return null;
    }
  };
  const presentHandler = (id: number) => {
    switch (id) {
      case (id = 1):
        return false;
      case (id = 2):
        return true;
      default:
        return null;
    }
  };
  return data.guests.map((person: any) => {
    const { name } = person;
    const dietProp = `${name}Diet`;
    const presentProp = `${name}Present`;
    return {
      ...person,
      diet: presentHandler(obj[presentProp])
        ? dietHandler(obj[dietProp])
        : null,
      present: presentHandler(obj[presentProp]),
    };
  });
};

export const ParseFromFirestore = (data: any) => {
  const dietHandler = (diet: string | null) => {
    switch (diet) {
      case 'meat':
        return 1;
      case 'wege':
        return 2;
      case 'vegan':
        return 3;
      default:
        return null;
    }
  };
  const presentHandler = (present: boolean | null) => {
    switch (present) {
      case false:
        return 1;
      case true:
        return 2;
      default:
        return null;
    }
  };
  return data.guests.map((person: any) => {
    const { name, diet, present } = person;
    const dietProp = `${name}Diet`;
    const presentProp = `${name}Present`;
    return {
      [dietProp]: dietHandler(diet),
      [presentProp]: presentHandler(present),
    };
  });
};

export const ParseLoggedUserFromFirestore = (loggedUser: any) => {
  return ParseFromFirestore(loggedUser).reduce((result: any, obj: any) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (result[key]) {
        result[key] += value;
      } else {
        result[key] = value;
      }
    });
    return result;
  }, {});
};

export const ParseLanguageFromFirestore = (appLanguage: string) => {
  return { language: appLanguage === 'PL' ? 1 : 2 };
};

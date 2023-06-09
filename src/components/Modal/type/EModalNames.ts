export enum EModalNames {
  navigationDetails = 'navigationDetails',
  guestSurvey = 'guestSurvey',
}

enum EModalTitle {
  navigationDetails = 'Navigation details',
  guestSurvey = 'Guest survey',
}

export const modalNameHandler = (name: string) => {
  console.log('modalNameHandler: ', name);
  switch (name) {
    case EModalNames.navigationDetails:
      return EModalTitle.navigationDetails;
    case EModalNames.guestSurvey:
      return EModalTitle.guestSurvey;
    default:
      return null;
  }
};

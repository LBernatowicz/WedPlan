export enum EModalNames {
  navigationDetails = 'navigationDetails',
}

enum EModalTitle {
  navigationDetails = 'Navigation details',
}

export const modalNameHandler = (name: string) => {
  switch (name) {
    case EModalNames.navigationDetails:
      return EModalTitle.navigationDetails;
    default:
      return null;
  }
};

export type TInitialUsersCollectionType = {
  guests: TInitialFormType[];
  isFilled: boolean;
  id?: string;
  name?: string;
  surname?: string;
  present?: boolean | null;
  diet?: string | null;
};

export type TInitialFormType = {
  name: string;
  surname: string;
  present: boolean | null;
  diet: string | null;
};

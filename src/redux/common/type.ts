export enum CommonActionTypes {
  SET_DARK = "SET_DARK",
}

type SetDark = {
  type: CommonActionTypes.SET_DARK;
  payload: boolean;
};

export type CommonActions = SetDark;

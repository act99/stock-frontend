/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: frontLoginMutation
// ====================================================

export interface frontLoginMutation_login {
  __typename: "LoginOutput";
  ok: boolean;
  token: string | null;
  error: string | null;
}

export interface frontLoginMutation {
  login: frontLoginMutation_login;
}

export interface frontLoginMutationVariables {
  loginInput: LoginInput;
}

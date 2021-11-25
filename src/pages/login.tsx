import { ApolloError, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  frontLoginMutation,
  frontLoginMutationVariables,
} from "./__generated__/frontLoginMutation";

type Inputs = {
  email: string;
  password: string;
};

const LOGIN_MUTATION = gql`
  mutation frontLoginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

export const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();
  const onCompleted = (data: frontLoginMutation) => {
    const {
      login: { error, ok, token },
    } = data;
    if (ok) {
      console.log(token);
    }
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    frontLoginMutation,
    frontLoginMutationVariables
  >(LOGIN_MUTATION, { onCompleted });

  const onSubmit: SubmitHandler<Inputs> = () => {
    const { email, password } = getValues();
    loginMutation({
      variables: {
        loginInput: {
          email,
          password,
        },
      },
    });
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800 flex-col">
      <div className="my-10">
        <span className="font-bold text-6xl text-white">로그인</span>
      </div>
      {/* <div className="bg-white w-full max-w-lg py-10 rounded-2xl text-center"> */}
      <form
        className="bg-white w-full max-w-lg py-10 rounded-2xl text-center flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="font-bold text-2xl mb-5 text-gray-600">이메일</label>
        <input
          placeholder="Email"
          className="input"
          {...register("email", {
            required: true,
            pattern:
              /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
          })}
        />
        {errors.email && <p>올바른 이메일을 입력해주십시오.</p>}
        <label className="font-bold text-2xl my-5 text-gray-600">
          비밀번호
        </label>
        <input
          placeholder="Password"
          className="input"
          {...register("password", { required: true, maxLength: 20 })}
          type="password"
        />
        {errors.password && <p>패스워드를 입력해주십시오.</p>}

        <button className="btn" type="submit">
          {loading ? "Loading..." : "로그인"}
        </button>
        {loginMutationResult?.login.error && (
          <p>{loginMutationResult.login.error}</p>
        )}

        {/* <input
          type="submit"
          className="bg-blue-200 mx-24 py-3 mt-32 rounded-2xl"
        /> */}
      </form>
    </div>
    // </div>
  );
};

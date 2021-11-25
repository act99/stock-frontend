import { ApolloError, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  frontLoginMutation,
  frontLoginMutationVariables,
} from "./__generated__/frontLoginMutation";
import logo from "../images/logo.jpg";

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
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-32">
      <div className="w-full max-w-screen-sm flex flex-col items-center">
        <img src={logo} className=" w-52 mb-10" />
        <h4 className=" font-bold text-cyan-600 mb-5">
          이곳은 관리자 로그인 페이지입니다.
        </h4>
        {/* <span className="font-bold text-6xl text-black mb-5">로그인</span> */}
        <form
          className="grid gap-3 mt-5 px-5 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* <label className="font-bold text-2xl mb-5 text-gray-600 w-full text-center">
            이메일
          </label> */}
          <input
            placeholder="이메일"
            className="input text-cyan-600 placeholder-cyan-600"
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            })}
          />
          {errors.email && (
            <p className="text-red-700 font-bold">
              올바른 이메일을 입력해주십시오.
            </p>
          )}
          {/* <label className="font-bold text-2xl my-5 text-gray-600 w-full text-center">
            비밀번호
          </label> */}
          <input
            placeholder="비밀번호"
            className="input text-cyan-600 placeholder-cyan-600"
            {...register("password", { required: true, maxLength: 20 })}
            type="password"
          />
          {errors.password && (
            <p className="text-red-700 font-bold">패스워드를 입력해주십시오.</p>
          )}

          <button className="btn" type="submit">
            {loading ? "로딩중..." : "로그인"}
          </button>
          {loginMutationResult?.login.error && (
            <p className="text-red-700 mt-5 font-bold">
              {loginMutationResult.login.error}
            </p>
          )}

          {/* <input
          type="submit"
          className="bg-blue-200 mx-24 py-3 mt-32 rounded-2xl"
        /> */}
        </form>
      </div>
    </div>
    // </div>
  );
};

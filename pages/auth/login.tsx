import { SubmitHandler, useForm } from "react-hook-form";
const { yupResolver } = require("@hookform/resolvers/yup");
import * as yup from "yup";
import styles from "../../styles/login.module.scss";
import { useMutation } from "react-query";
import axios from "axios";
import React from "react";

interface LoginFormInputs {
  username: string;
  password: string;
}

const schema = yup
  .object()
  .shape({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const Login = () => {
  const { register, handleSubmit, formState } = useForm<LoginFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const { isValid, isDirty, errors } = formState;
  const loginMutation = useMutation((d: LoginFormInputs) => {
    return axios.post("http://localhost:4000/auth/login", {
      username: d.username,
      password: d.password,
    });
  });

  const onLoginFormSubmitted: SubmitHandler<LoginFormInputs> = (d) => {
    loginMutation.mutate(d);
  };

  if (loginMutation.isSuccess) {
    localStorage.setItem(
      "access_token",
      JSON.stringify(loginMutation.data.data)
    );
  }

  return (
    <div className={styles.login__main}>
      <form
        onSubmit={handleSubmit(onLoginFormSubmitted)}
        className={styles.login__form}
      >
        <label htmlFor="username">Username: </label>
        <input {...register("username")} type="text"></input>
        <label htmlFor="password">Password: </label>
        <input {...register("password")} type="password"></input>
        <button type="submit" disabled={!isDirty || !isValid}>
          login
        </button>
      </form>
    </div>
  );
};

export default Login;

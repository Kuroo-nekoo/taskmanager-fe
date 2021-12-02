import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import styles from "../../styles/register.module.scss";
import * as yup from "yup";
const { yupResolver } = require("@hookform/resolvers/yup");

interface RegisterFormInput {
  username: string;
  password: string;
  password_confirm: string;
}

const Register = () => {
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
    password_confirm: yup
      .string()
      .oneOf([yup.ref("password"), null])
      .required(),
  });

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { isValid, isDirty } = formState;

  const registerMutation = useMutation((d: RegisterFormInput) => {
    return axios.post("http://localhost:4000/users", {
      username: d.username,
      password: d.password,
    });
  });

  const onRegisterFormSubmitted: SubmitHandler<RegisterFormInput> = (d) => {
    registerMutation.mutate(d);
  };

  return (
    <div className={styles.register__main}>
      <form
        className={styles.register__form}
        onSubmit={handleSubmit(onRegisterFormSubmitted)}
      >
        <label htmlFor="username">Username: </label>
        <input {...register("username")}></input>
        <label htmlFor="password">Password: </label>
        <input {...register("password")} type="password"></input>
        <label htmlFor="password_confirm">Password confirm: </label>
        <input {...register("password_confirm")} type="password"></input>
        <button disabled={!isValid || !isDirty}> register</button>
      </form>
    </div>
  );
};

export default Register;

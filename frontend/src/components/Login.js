import React from "react";
import AuthForm from "./AuthForm";

export default function Login(props) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });
  React.useEffect(() => {
    props.onHeaderLinkChange("Регистрация", "/sign-up");
    return () => props.onHeaderLinkChange("", "");
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(formValue.email, formValue.password);
  }

  return (
    <AuthForm
      title={"Вход"}
      buttonName={"Войти"}
      emailValue={formValue.email}
      passwordValue={formValue.password}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}

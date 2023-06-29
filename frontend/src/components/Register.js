import React from "react";
import AuthForm from "./AuthForm";

export default function Register(props) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });
  React.useEffect(() => {
    props.onHeaderLinkChange("Войти", "/sign-in");
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
      title={"Регистрация"}
      isSecondLink={true}
      buttonName={"Зарегистрироваться"}
      emailValue={formValue.email}
      passwordValue={formValue.password}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}

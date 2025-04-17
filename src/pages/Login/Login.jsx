// import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, Card, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required")
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.auth.users);
  // const [error, setError] = useState("");
  const { t } = useTranslation();
  const handleLogin = (values) => {
    const found = users.find(
      (user) =>
        user.username === values.username && user.password === values.password
    );

    if (!found) {
      toast.error("Incorrect username or password");
      return;
    }

    dispatch(login(values));
    toast.success("Login successful!");
    navigate("/");
  };

  return (
    <Container className="d-flex justify-content-center align-items-start my-4 min-vh-100">
      <Card style={{ maxWidth: "400px" }} className="p-4 shadow w-100">
        <h2 className="text-center mb-4 text-success">{t("auth.login")}</h2>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-3">
                <label className="form-label">{t("auth.name")}</label>
                <Field
                  name="username"
                  className={`form-control ${
                    touched.username && errors.username ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  component="div"
                  name="username"
                  className="invalid-feedback"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">{t("auth.password")}</label>
                <Field
                  type="password"
                  name="password"
                  className={`form-control ${
                    touched.password && errors.password ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  component="div"
                  name="password"
                  className="invalid-feedback"
                />
              </div>

              <Button type="submit" variant="success  " className="w-100">
                {t("nav.login")}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
}

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, Card, Button, Alert } from "react-bootstrap";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: Yup.string().required("Role is required")
});

export default function Signup() {
    const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.auth.users);
  const [error, setError] = useState("");
  const handelSignUp = (values) => {
    const exist = users.find((user) => user.username === values.username);
    if (exist) {
      setError("This username is already taken. Please choose another one.");
      return;
    }
    const newUser = {
      ...values,
      id: uuidv4() // ✅ توليد id فريد
    };
    dispatch(register(newUser));
    navigate("/login");

    setError("");
    toast.info("Account created successfully. You can now log in.");
  };
  return (
    <Container className="d-flex  justify-content-center align-items-start my-4 min-vh-100">
      <Card style={{ maxWidth: "400px" }} className="p-4 shadow w-100">
        <h2 className="text-center mb-4 text-success">{t("auth.register")}</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Formik
          initialValues={{ username: "", password: "", role: "admin" }}
          validationSchema={SignUpSchema}
          onSubmit={(values) => {
            handelSignUp(values);
          }}
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

              <div className="mb-3">
                <label className="form-label">{t("auth.role")}</label>
                <Field
                  as="select"
                  name="role"
                  className={`form-select ${
                    touched.role && errors.role ? "is-invalid" : ""
                  }`}
                >
                  <option value="admin">{t("auth.admin")}</option>
                  <option value="customer">{t("auth.customer")}</option>
                 
                </Field>
                <ErrorMessage
                  component="div"
                  name="role"
                  className="invalid-feedback"
                />
              </div>

              <Button type="submit" variant="success" className="w-100">
                {t("auth.register")}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
}

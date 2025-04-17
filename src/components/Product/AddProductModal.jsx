// src/components/Product/AddProductModal.js
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/product/productSlice";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";

// إعداد التحقق باستخدام Yup
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  max: Yup.number()
    .required("Quantity is required")
    .min(1, "Quantity must be at least 1"),
  cat_prefix: Yup.string()
    .oneOf(["men", "women", "kids", "baby", "sport", "all"], "Invalid category")
    .required("Category is required"),
  img: Yup.string().url("Invalid URL").required("Image URL is required")
});

export default function AddProductModal({ show, onHide }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const initialValues = {
    title: "",
    price: "",
    max: "",
    cat_prefix: "all",
    img: ""
  };

  const handleSubmit = (values, { resetForm }) => {
    const newProduct = {
      id: uuidv4(),
      title: values.title,
      price: parseFloat(values.price),
      max: parseInt(values.max),
      cat_prefix: values.cat_prefix,
      img: values.img
    };
    dispatch(addProduct(newProduct));
    resetForm();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title> {t("products.addnewproduct")}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <FormikForm>
            <Modal.Body>
              <Form.Group className="mb-2">
                <Form.Label>{t("products.title")}</Form.Label>
                <Field name="title" className="form-control" />
                <div className="text-danger">
                  <ErrorMessage name="title" />
                </div>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>{t("products.price")}</Form.Label>
                <Field name="price" type="number" className="form-control" />
                <div className="text-danger">
                  <ErrorMessage name="price" />
                </div>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label> {t("products.quantity")}</Form.Label>
                <Field name="max" type="number" className="form-control" />
                <div className="text-danger">
                  <ErrorMessage name="max" />
                </div>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>{t("products.category")}</Form.Label>
                <Field as="select" name="cat_prefix" className="form-select">
                  <option value="all">All Categories</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                  <option value="baby">Baby</option>
                  <option value="sport">Sport</option>
                </Field>
                <div className="text-danger">
                  <ErrorMessage name="cat_prefix" />
                </div>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label> {t("products.imageUrl")} </Form.Label>
                <Field name="img" className="form-control " />
                <div className="text-danger">
                  <ErrorMessage name="img" />
                </div>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                {t("common.cancel")}
              </Button>
              <Button variant="success" type="submit" disabled={isSubmitting}>
                {t("products.addnewproduct")}
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
}

import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../store/product/productSlice";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function EditProductModal({ show, onHide, product }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    price: Yup.number().required("Price is required").min(0),
    max: Yup.number().required("Quantity is required").min(0),
    cat_prefix: Yup.string()
      .oneOf(
        ["men", "women", "kids", "baby", "sport", "all"],
        "Invalid category"
      )
      .required("Category is required"),
    img: Yup.string().url("Invalid image URL")
  });

  const handleSubmit = (values) => {
    const updated = {
      ...values,
      //عشان يحول القيم ال string الجيه من ال values الى numbre
      price: parseFloat(values.price),
      max: parseInt(values.max)
    };
    dispatch(updateProduct(updated));
    onHide();
    toast.success("Product updated successfully.");
  };

  if (!product) return null;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title> {t("products.editProduct")}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={product}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <FormikForm>
            <Modal.Body>
              <Form.Group className="mb-2">
                <Form.Label className="text-capitalize">
                  {t("products.price")}
                </Form.Label>
                <Field name={"price"} className="form-control" />
                <div className="text-danger">
                  <ErrorMessage name={"price"} />
                </div>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="text-capitalize">
                  {t("products.title")}
                </Form.Label>
                <Field name={"title"} className="form-control" />
                <div className="text-danger">
                  <ErrorMessage name={"title"} />
                </div>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="text-capitalize">max</Form.Label>
                <Field name={"max"} className="form-control" />
                <div className="text-danger">
                  <ErrorMessage name={"max"} />
                </div>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="text-capitalize">
                  {t("products.imageUrl")}
                </Form.Label>
                <Field name={"img"} className="form-control" />
                <div className="text-danger">
                  <ErrorMessage name={"img"} />
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
                <ErrorMessage
                  name="cat_prefix"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                {t("common.cancel")}
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {t("common.save")}
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
}

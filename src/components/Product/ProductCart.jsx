import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../store/product/productSlice";
import { useState } from "react";
import EditProductModal from "./EditProductModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import stayle from "./ProductCart.module.css";
import { addToCart } from "../../store/cart/cartSlice";
import ConfirmModal from "../ConfirmModal/ConfirmModal ";
import { useTranslation } from "react-i18next";

export default function ProductCart({ role, product }) {
  const navigate = useNavigate();
    const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((stat) => stat.auth?.user);
  const { product_card } = stayle;

  const [showEditModal, setShowEditModal] = useState(false);
  const { id, title, img, price, cat_prefix, max } = product;
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteProduct(id));
    navigate("/products")
    toast.success("product deleted successfully");
  };
  const handleEdit = (e) => {
    e.stopPropagation();
    setShowEditModal(true);
  };

  const handleCardClick = () => {
    navigate(`/products/${id}`);
  };
  const handleCart = (e) => {
    e.stopPropagation();
    if (max <= 0) {
      toast.error("product out of stock");
      return;
    }
    dispatch(addToCart(product));
    toast.success("product added to cart successfully");
  };
  return (
    <>
      <Card
        onClick={handleCardClick}
        className={`${product_card} shadow-sm rounded-4 p-2 m-2 h-100 `}
      >
        <Card.Img
          variant="top"
          className="rounded-3 p-2"
          src={img || "public/images/deful.jpg"}
          style={{ height: "200px", objectFit: "contain" }}
        />

        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title className="text-success fw-bold fs-5">{title}</Card.Title>

          <Card.Text className="text-muted small d-flex flex-column  ">
            <strong>
              {" "}
              {t("products.price")}:${price}
            </strong>
            <strong>
              {t("products.quantity")} : {max <= 0 ? "  not  available  " : max}
            </strong>{" "}
            <strong>
              {" "}
              {t("products.category")}:{cat_prefix}
            </strong>
          </Card.Text>

          <div className="d-flex gap-2 mt-3">
            <Button
              onClick={handleCart}
              disabled={max <= 0 || !user}
              size="sm"
              variant="success"
            >
              {t("products.addToCart")}
            </Button>

            {role === "admin" && (
              <>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(true);
                  }}
                  size="sm"
                  variant="danger"
                >
                  {t("products.delete")}
                </Button>
                <Button onClick={handleEdit} size="sm" variant="warning">
                  {t("products.edit")}
                </Button>
              </>
            )}
          </div>
        </Card.Body>
      </Card>
      {showEditModal && (
        <EditProductModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          product={product}
        />
      )}
      <ConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Delete Confirmation"
        message="Are you sure you want to delete this item?"
      />
    </>
  );
}

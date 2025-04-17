import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Card, Button, Row, Col, Image } from "react-bootstrap";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} from "../../store/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../../store/order/orderSlice";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal ";
import { useTranslation } from "react-i18next";

const CartPage = () => {
  const { t } = useTranslation();
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalPrice } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    const newOrder = {
      items,
      totalPrice,
      userID: user?.id
    };

    dispatch(addOrder(newOrder));
    dispatch(clearCart()); // فضي السلة
    navigate("/orders"); // روح على صفحة الطلبات
    toast.success("Order placed successfully!"); // نشر رسالة تأكيد الطلب
  };

  return (
    <Container className="my-5 ">
      <h1 className="text-center mb-4">{t("nav.cart")}</h1>

      {items?.length === 0 ? (
        <Container className="vh-100">
          <Card className="p-4 shadow-sm text-center   ">
            <p className="mb-0">{t("cart.empty")}.</p>
          </Card>
        </Container>
      ) : (
        <>
          {items?.map((item) => (
            <Card key={item.id} className="mb-3  shadow-sm p-3">
              <Row className="align-items-center">
                {/* الصورة */}
                <Col xs={12} md={2} className="text-center mb-3 mb-md-0">
                  <Image
                    src={item.img || "https://via.placeholder.com/100"}
                    alt={item.title}
                    fluid
                    rounded
                    style={{ maxHeight: "100px" }}
                  />
                </Col>

                {/* معلومات المنتج */}
                <Col xs={12} md={4}>
                  <h5>{item.title}</h5>
                  <p className="mb-1">
                    {t("products.price")}: ${Number(item.price).toFixed(2)}
                  </p>
                  <p className="mb-0">
                    {t("cart.total")}: $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </Col>

                {/* التحكم في الكمية */}
                <Col xs={12} md={3} className="d-flex align-items-center">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleDecrease(item.id)}
                  >
                    -
                  </Button>
                  <span className="mx-2 fw-bold">{item.quantity}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleIncrease(item.id)}
                  >
                    +
                  </Button>
                </Col>

                {/* زر الحذف */}
                <Col xs={12} md={3} className="text-md-end mt-3 mt-md-0">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemove(item.id)}
                  >
                    {t("cart.remove")}
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}

          {/* الإجمالي */}
          <Card className="shadow-sm p-3 mt-4">
            <Row className="justify-content-between align-items-center">
              <Col>
                <h4>
                  {" "}
                  {t("cart.total")}: ${totalPrice.toFixed(2)}
                </h4>
              </Col>
              <Col className="text-end my-2 ">
                <Button
                  variant="secondary"
                  className="me-2 my-2"
                  onClick={handleClearCart}
                >
                  {t("cart.clearCart")}
                </Button>
                <Button
                  className="me-2 my-2 success"
                  variant="success"
                  onClick={() => setShowCheckoutModal(true)}
                >
                  {t("checkout.title")}
                </Button>
              </Col>
            </Row>
          </Card>
          <ConfirmModal
            show={showCheckoutModal}
            onHide={() => setShowCheckoutModal(false)}
            onConfirm={() => {
              handleCheckout();
              setShowCheckoutModal(false);
            }}
            title="Confirm Checkout"
            message="Are you sure you want to place this order?"
          />
        </>
      )}
    </Container>
  );
};

export default CartPage;

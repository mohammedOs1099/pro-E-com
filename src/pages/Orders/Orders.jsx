import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Form,
  Button
} from "react-bootstrap";
import { updateOrderStatus } from "../../store/order/orderSlice";
import OrderDetailsModal from "../../components/OrderModal/OrderModal";
import { useTranslation } from "react-i18next";

const Orders = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === "admin";
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const filteredOrders = orders.filter((order) => {
    const matchUser = isAdmin ? true : order.userID === user?.id;
    const matchStatus =
      statusFilter === "All" ? true : order.status === statusFilter;
    return matchUser && matchStatus;
  });
  const handleStatusChange = (id, status) => {
    dispatch(updateOrderStatus({ id, status }));
  };
  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  return (
    <Container className="my-4 ">
      <h2 className="text-success fw-bold text-center mb-4">
        {t("nav.orders")}
      </h2>
      <Form.Group className="mb-4  col-md-4 mx-auto">
        <Form.Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All"> {t("orders.status")} </option>
          <option value="Pending">{t("orders.pending")}</option>
          <option value="Processing">{t("orders.processing")}</option>
          <option value="Shipped">{t("orders.shipped")}</option>
          <option value="Delivered">{t("orders.delivered")}</option>
        </Form.Select>
      </Form.Group>
      {filteredOrders?.length === 0 ? (
        <div className="vh-100">
          <Card className="p-4 shadow-sm text-center mb-2 ">
            <p className="mb-0"> {t("orders.noOrders")}</p>
          </Card>
        </div>
      ) : (
        <>
          <Row className="g-4 100">
            {filteredOrders.map((order) => (
              <Col md={6} lg={4} key={order.id}>
                <Card className="shadow-sm h-100 border-0 rounded-4 p-3">
                  <Card.Body>
                    <Card.Title className="fw-bold mb-3">
                      {t("orders.order")} #{order.id.slice(0, 10)}
                      <Badge bg="secondary" className="ms-2">
                        {order.status}
                      </Badge>
                    </Card.Title>
                    <Card.Text>
                      <strong>{t("orders.date")}:</strong>{" "}
                      {order.createdAt && !isNaN(new Date(order.createdAt))
                        ? new Date(order.createdAt).toLocaleString()
                        : "Unknown"}
                      <br />
                      <strong>{t("orders.total")}:</strong> $
                      {Number(order.totalPrice).toFixed(2)}
                    </Card.Text>

                    <Card.Text className="mt-3">
                      <strong>{t("orders.items")}:</strong> {order.items.length}{" "}
                      item(s)
                    </Card.Text>

                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleOpenModal(order)}
                    >
                      {t("products.viewDetails")}
                    </Button>
                    {isAdmin && (
                      <Form.Select
                        className="mt-3"
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                      >
                        <option value="All"> {t("orders.status")} </option>
                        <option value="Pending">{t("orders.pending")}</option>
                        <option value="Processing">
                          {t("orders.processing")}
                        </option>
                        <option value="Shipped">{t("orders.shipped")}</option>
                        <option value="Delivered">
                          {t("orders.delivered")}
                        </option>
                      </Form.Select>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {/* Modal for Order Details */}
          <OrderDetailsModal
            show={showModal}
            onHide={handleCloseModal}
            order={selectedOrder}
          />
        </>
      )}
    </Container>
  );
};

export default Orders;

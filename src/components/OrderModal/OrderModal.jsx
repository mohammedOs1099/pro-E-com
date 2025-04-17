// components/OrderDetailsModal.js
import React from "react";
import { Modal, Button, ListGroup, Badge, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const OrderDetailsModal = ({ show, onHide, order }) => {
   const { t } = useTranslation();
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header>
        <Modal.Title>
          {" "}
          {t("orders.order")} #{order?.id.slice(0, 8)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {order && (
          <>
            <p>
              <strong>{t("orders.status")}:</strong>{" "}
              <Badge bg="info">{order.status}</Badge>
            </p>
            <p>
              <strong>{t("orders.date")}:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>{t("orders.total")}:</strong> $
              {Number(order.totalPrice).toFixed(2)}
            </p>
            <h5 className="mt-4">{t("orders.items")}:</h5>
            <ListGroup>
              {order.items.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <Image
                      src={item.img || "public/images/deful.jpg"}
                      alt={item.title}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        marginRight: "10px"
                      }}
                    />
                    <span>{item.title}</span>
                  </div>
                  <span>
                    {item.quantity} × ${item.price} = $
                    {item.quantity * item.price}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t("common.back")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetailsModal;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Card, Button, Col } from "react-bootstrap";

import EditProductModal from "../../components/Product/EditProductModal";
import ProductCart from "../../components/Product/ProductCart";

const ProductDetails = () => {
  const { id } = useParams();
  const [showEditModal, setShowEditModal] = useState(false);
  const product = useSelector((state) =>
    state.products.products.find((p) => p.id === parseInt(id))
  );
  const role = useSelector((state) => state.auth.user?.role);
  // التعامل مع حالة عدم وجود المنتج
  if (!product) {
    return (
      <Container className="mt-4 text-center">
        <h3>Product not found.</h3>
      </Container>
    );
  }
  return (
    <Container className="mt-4">
      <Col md={6} lg={4} className="mb-4 mx-auto">
        <ProductCart role={role} product={product} />
        {role === "admin" && (
          <EditProductModal
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            product={product}
          />
        )}
      </Col>
    </Container>
  );
};

export default ProductDetails;

import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryFilter,
  setKeyword,
  setPriceFilter,
  setProducts
} from "../../store/product/productSlice";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import ProductCart from "../../components/Product/ProductCart";
import { useEffect, useState } from "react";
import AddProductModal from "../../components/Product/AddProductModal";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { t } = useTranslation();
  const [showAddModal, setShowAddModal] = useState(false);
  const dispatch = useDispatch();
  const { products, filter } = useSelector((state) => state.products);
  const role = useSelector((state) => state.auth.user?.role);
  useEffect(() => {
    if (!products || products.length === 0) {
      const loadProducts = async () => {
        try {
          const res = await fetch("/data/db.json");
          const data = await res.json();
          if (data?.products?.length) {
            dispatch(setProducts(data.products));
          }
        } catch (error) {
          console.error("Failed to load products:", error);
        }
      };

      loadProducts();
    }
  }, [dispatch, products]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filter.category === "all" || product.cat_prefix === filter.category;
    const matchesPrice =
      product.price >= filter.priceRange[0] &&
      product.price <= filter.priceRange[1];
    const matchesKeyword =
      filter.keyword.trim() === "" ||
      product.title.toLowerCase().includes(filter.keyword.toLowerCase());
    return matchesCategory && matchesPrice && matchesKeyword;
  });

  return (
    <Container className="  ">
      <h1 className="text-center mt-4 mb-4 text-success fw-bold">
        {t("nav.products")}
      </h1>
      {role === "admin" && (
        <div className="mb-4 text-center  ">
          <Button variant="success" onClick={() => setShowAddModal(true)}>
            + {t("products.addProduct")}
          </Button>
        </div>
      )}

      {/* فلتر المنتجات */}
      <Card className="mb-4 shadow-sm p-3">
        <Row className="g-3">
          <Col md={4}>
            <Form.Group controlId="categoryFilter">
              <Form.Label className="fw-semibold">
                {" "}
                {t("products.category")}
              </Form.Label>
              <Form.Select
                onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
                value={filter.category}
              >
                <option value="all">All Categories</option>
                <option value="men">men</option>
                <option value="women">women</option>
                <option value="kids">kids</option>
                <option value="baby">baby</option>
                <option value="sport">sport</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="priceFilter">
              <Form.Label className="fw-semibold">
                {" "}
                {t("products.PriceRange")}
              </Form.Label>
              <Form.Select
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "low") dispatch(setPriceFilter([0, 50]));
                  else if (val === "mid") dispatch(setPriceFilter([51, 150]));
                  else if (val === "high")
                    dispatch(setPriceFilter([151, Infinity]));
                  else dispatch(setPriceFilter([0, Infinity]));
                }}
              >
                <option value="all">All Prices</option>
                <option value="low">0 - 50</option>
                <option value="mid">51 - 150</option>
                <option value="high">150+</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="keywordFilter">
              <Form.Label className="fw-semibold">
                {t("products.Keyword")}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by keyword..."
                onChange={(e) => dispatch(setKeyword(e.target.value))}
                value={filter.keyword}
              />
            </Form.Group>
          </Col>
        </Row>
      </Card>
      {/* Add Product button for admin */}

      <Row>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Col md={6} lg={4} className="mb-4" key={product.id}>
              <ProductCart role={role} product={product} />
            </Col>
          ))
        ) : (
          <p className="text-center text-muted"> No products found.</p>
        )}
      </Row>
      {role === "admin" && (
        <AddProductModal
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
        />
      )}
    </Container>
  );
};

export default Products;

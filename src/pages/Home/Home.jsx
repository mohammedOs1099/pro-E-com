import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className=" text-success text-center vh-100  d-flex justify-content-center align-items-center ">
        <Container className="    ">
          <h1 className="display-4 fw-bold"> {t("auth.welcometo")} </h1>
          <p className="lead">{t("auth.Shopthebestproductswithgreatdeals")}!</p>
          <Link to="/products">
            <Button variant="outline-success" size="lg" className="mt-3">
              {t("auth.Browseproducts")}
            </Button>
          </Link>
        </Container>
      </div>
    </>
  );
};

export default Home;

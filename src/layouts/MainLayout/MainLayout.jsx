import { Container } from "react-bootstrap";

import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function MainLayout() {
  
  return (
    <>
      <Header />
      <Container className="   ">
        <Outlet />
      </Container>

      <Footer />
    </>
  );
}

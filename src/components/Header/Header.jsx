import { NavLink, useNavigate } from "react-router-dom";
import { Badge, Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import stayle from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/authSlice";
import { toast } from "react-toastify";
import { setLanguage } from "../../store/ui/uiSlice";
import { useTranslation } from "react-i18next";
const { headerLogo } = stayle;
function Header() {
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    dispatch(setLanguage(lang));
    if (lang === "ar") {
      document.getElementsByTagName("html")[0].setAttribute("lang", "ar");
      document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
    } else {
      document.getElementsByTagName("html")[0].setAttribute("lang", "en");
      document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
    }
  };
  return (
    <>
      <header className=" bg-success ">
        <Container>
          <Navbar
            expand="lg"
            bg="success"
            data-bs-theme="dark"
            className="     "
          >
            <Navbar.Brand as={NavLink} to={"/"}>
              <h1 className={headerLogo}>
                <span> PRO</span>{" "}
                <Badge bg="light text-success "> E-COM </Badge>
              </h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className=" w-100  ">
                <Nav.Link as={NavLink} to={"/"}>
                  {t("nav.home")}
                </Nav.Link>
                <Nav.Link as={NavLink} to={"/products"}>
                  {t("nav.products")}
                </Nav.Link>

                <Nav.Link as={NavLink} to={"/cart"}>
                  {t("nav.cart")}
                </Nav.Link>

                <Nav.Link as={NavLink} to={"/orders"}>
                  {t("nav.orders")}
                </Nav.Link>
              </Nav>
              {!user ? (
                <div className=" text-light gap-1 auth d-flex flex-column align-items-start flex-lg-row align-items-lg-center    ">
                  <Nav.Link as={NavLink} to="/login">
                    {t("nav.login")}
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/signup">
                    {t("nav.register")}
                  </Nav.Link>
                </div>
              ) : (
                <NavDropdown
                  className="text-light "
                  title={
                    <span className="text-white  ">
                      Welcome, <strong>{user?.username}</strong>
                    </span>
                  }
                >
                  <Container>
                    <NavDropdown.Item as={"span"} className=" fw-lighter ">
                      {user?.role === "admin" ? t("nav.admin") : ""}
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      onClick={handleLogout}
                      className="text-danger"
                    >
                      {t("nav.logout")}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </Container>
                </NavDropdown>
              )}
              <button
                className=" btn btn-outline-light  border-light m-1 p-2  "
                onClick={() => changeLanguage("ar")}
              >
                العربية
              </button>
              <button
                className=" btn btn-outline-light border-light m-1 p-2  "
                onClick={() => changeLanguage("en")}
              >
                English
              </button>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </header>
    </>
  );
}

export default Header;

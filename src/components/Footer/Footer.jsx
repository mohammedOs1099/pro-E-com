import styles from "./Footer.module.css";
const { footerContainer } = styles;

const Footer = () => {
  return (
    <div className={`${footerContainer} mx-2  `}>
      {" "}
      Created by Mohammed osama
      <br /> © 2024 Our Ecom. All rights reserved.
    </div>
  );
};

export default Footer;

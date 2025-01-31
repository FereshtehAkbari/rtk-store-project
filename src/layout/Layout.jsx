import React from "react";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";
import styles from "./Layout.module.css";
import { useSelector } from "react-redux";
function Layout({ children }) {
  // const [state] = useCart();
  const state = useSelector((store) => store.cart);
  return (
    <>
      <header className={styles.header}>
        <Link to="/products">FereshteShop</Link>
        <Link to="/checkout">
          <div>
            <PiShoppingCartSimpleBold />
            {!!state.itemsCounter && <span>{state.itemsCounter}</span>}
          </div>
        </Link>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>Developed By Fereshte❤️</p>
      </footer>
    </>
  );
}

export default Layout;

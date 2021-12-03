import React from "react";
import logo from "./logo.jpg";
import classNames from "classnames";

import styles from "./css/navbar.module.css";
import { Link } from "react-router-dom";

type Props = {
  navigationData: string[];
  currentRoute: string;
  setCurrentRoute: any;
};

const Navbar = ({ navigationData, currentRoute, setCurrentRoute }: Props) => {
  const onAdminClick = () => {
    window.location.href = "/login";
  };
  return (
    <nav className={styles.navbar}>
      <img src={logo} className=" h-14" />
      <ul className={styles.navItems}>
        {navigationData.map((item, index) => (
          <li>
            <Link
              key={index}
              onClick={() => setCurrentRoute(item)}
              className={classNames([
                styles.navItem,
                currentRoute === item && styles.selectedNavItem,
              ])}
              to={item}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
      <button className={styles.actions} onClick={onAdminClick}>
        Admin
      </button>
    </nav>
  );
};

export default Navbar;

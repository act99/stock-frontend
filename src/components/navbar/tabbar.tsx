import React, { useCallback } from "react";
import classNames from "classnames";
import { AiFillHome, AiFillCompass, AiOutlineBarChart } from "react-icons/ai";
import { BsFillBagFill, BsFillPersonFill } from "react-icons/bs";
import { CgInbox } from "react-icons/cg";
import { SiBitcoinsv } from "react-icons/si";

import styles from "./css/tabbar.module.css";
import { Link } from "react-router-dom";

type Props = {
  navigationData: string[];
  currentRoute: string;
  setCurrentRoute: any;
};

const Tabbar = ({ navigationData, currentRoute, setCurrentRoute }: Props) => {
  const getTabIcon = useCallback((item) => {
    switch (item) {
      case "Home":
        return <AiFillHome />;
      case "Stock":
        return <AiOutlineBarChart />;
      case "Coin":
        return <SiBitcoinsv />;

      //   case "Profile":
      //     return <BsFillPersonFill />;
    }
  }, []);

  return (
    <nav className={styles.tabbar}>
      {navigationData.map((item, index) => (
        <span key={index}>
          <Link
            key={index}
            className={classNames([
              styles.tabItem,
              currentRoute === item && styles.tabItemActive,
            ])}
            onClick={() => setCurrentRoute(item)}
            to={item}
          >
            <span className={styles.icon}>{getTabIcon(item)}</span>
          </Link>
        </span>
      ))}
    </nav>
  );
};

export default Tabbar;

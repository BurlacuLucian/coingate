import React from "react";
import { Layout } from "antd";
import Link from "next/link";
import classes from "../styles/NavBar.module.css";
import styled from "@emotion/styled";

const { Header } = Layout;

const NavBar: React.FC = () => {
  return (
    <div className={classes.navBox}>
    <StyledNav className="layout">
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <nav>
          <ul>
            <Link href="/">
              <img
                className={classes.logo}
                width="140"
                height="40"
                src="https://coingate.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.8c4491d2.png&w=256&q=75"
              />
            </Link>
            <Link className={classes.li1} href="">
              Products
            </Link>
            <Link className={classes.li2} href="">
              Resources
            </Link>
            <Link className={classes.li3} href="">
              Buy Instantly
            </Link>
            <Link className={classes.li4} href="">
              Log In
            </Link>
            <button className={classes.btn}>Sign up</button>
          </ul>
        </nav>
      </Header>
    </StyledNav>
    </div>
  );
};

const StyledNav = styled.div`
  .ant-layout-header {
    z-index: 1;
    position: fixed;
    width: 2391px;
    height: 101px;
    left: -2px;
    top: 0px;
    background: #ffffff;
    box-shadow: 0px 15px 10px rgba(29, 0, 62, 0.07);
  }
`;

export default NavBar;

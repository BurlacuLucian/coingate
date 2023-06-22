import React, { useState } from "react";
import { Layout, Button, Drawer} from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import classes from "../styles/NavBar.module.css";
import styled from "@emotion/styled";

const { Header } = Layout;

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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
        <div>
          <StyledMenuOutlined onClick={showDrawer}></StyledMenuOutlined>
          <StyledDrawer
            title="Coin Gate"
            placement="right"
            onClose={onClose}
            open={open}
          >
            <Link className={classes.products} href="">
              Products
            </Link>
            <Link className={classes.resources} href="">
              Resources
            </Link>
            <Link className={classes.buy} href="">
              Buy Instantly
            </Link>
            <Link className={classes.login} href="">
              Log In
            </Link>
            <button className={classes.signup}>Sign up</button>
          </StyledDrawer>
        </div>
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

const StyledMenuOutlined = styled(MenuOutlined)`
@media screen and (max-width: 800px){
  &.anticon {
    cursor: pointer;
    position: fixed;
    z-index: 1;
    // left: 364px;
    top: 43px;
    right: 20px;
  }

  

}
`;

const StyledDrawer = styled(Drawer)`
  @media screen and (max-width: 800px) {
   
    .ant-drawer-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 90px;
    }
  }
`;

export default NavBar;

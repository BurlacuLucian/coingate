import Link from "next/link";
import classes from "../styles/NavBar.module.css";


function NavBar () {

    return (
      <header className={classes.header}>
        <nav>
          <ul>
            <Link href='/'>< img className={classes.logo} width='140' height='40'src="https://coingate.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.8c4491d2.png&w=256&q=75" /></Link>
            <li >
              <Link className={classes.li1} href=''>Products</Link>
            </li>
            <li >
              <Link className={classes.li2} href=''>Resources</Link>
            </li>
            <li >
              <Link className={classes.li3} href=''>Buy Instantly</Link>
            </li>
            <li >
              <Link className={classes.li4} href=''>Log In</Link>
            </li>
            <button className={classes.btn}>Sign up</button>
          </ul>
        </nav>
      </header>
    );
  }
  
  export default NavBar;
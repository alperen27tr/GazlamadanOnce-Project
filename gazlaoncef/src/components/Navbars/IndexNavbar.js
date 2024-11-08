import React from "react";
import classnames from "classnames";
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'assets/css/IndexNavbar.css';
// import 'bootstrap/dist/css/bootstrap.min.css';


function IndexNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [username, setUsername] = React.useState('');

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token) {
      setIsAuthenticated(true);
      setUsername(storedUsername || '');
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(prev => !prev);
    console.log("navbarCollapse state:", !navbarCollapse); 
  };
  

  const handleLogout = () => {
    const isConfirmed = window.confirm("Çıkış yapmak istediğinize emin misiniz?");

    if (isConfirmed) {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("id");

        toast.success("Çıkış yapıldı!", {
          autoClose: 2000,
        });

        setIsAuthenticated(false);
        navigate("/login-page");
      } catch (error) {
        toast.error("Çıkış sırasında bir hata oluştu!");
      }
    } else {
      toast.info("Çıkış iptal edildi!", {
        autoClose: 2000,
      });
    }
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (location.pathname === '/login-page' || location.pathname === '/register-page') {
        setNavbarColor("navbar-dark-custom"); 
      } else if (location.pathname === '/index') {
        if (document.documentElement.scrollTop > 249 || document.body.scrollTop > 249) {
          setNavbarColor("navbar-colored");
        } else {
          setNavbarColor("navbar-transparent");
        }
      } else {
        setNavbarColor("navbar-colored");
      }
    };
  
    updateNavbarColor();
    window.addEventListener("scroll", updateNavbarColor);
  
    return () => {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  }, [location.pathname]);
  

  return (
    <>
      <Navbar
        className={classnames("fixed-top", navbarColor)}
        expand="lg"
      >
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              data-placement="bottom"
              href="/index"
              className="navbar-brand"
            >
              GazlamadanOnce.com
            </NavbarBrand>
            {/* <button
              aria-expanded={navbarCollapse}
              className={classnames("navbar-toggler", {
                toggled: navbarCollapse,
              })}
              onClick={toggleNavbarCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button> */}
          </div>
          <Collapse
            className="justify-content-end"
            navbar
            isOpen={navbarCollapse} // ensure this is correctly linked
          >
            <Nav navbar>
              <NavItem>
                <NavLink href="/index" className="nav-link">
                  Anasayfa <span className="sr-only">(current)</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/blogs-page" className="nav-link">
                  Bloglar <span className="sr-only">(current)</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/videos-page" className="nav-link">
                  Videolar <span className="sr-only">(current)</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/test-page" className="nav-link">
                  Sınavlar <span className="sr-only">(current)</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="#pablo" onClick={e => e.preventDefault()} className="nav-link">
                  Hakkımızda <span className="sr-only">(current)</span>
                </NavLink>
              </NavItem>

              {isAuthenticated && (
                <NavItem>
                  <NavLink className="nav-link">
                    {username}
                  </NavLink>
                </NavItem>
              )}

              {isAuthenticated ? (
                <NavItem>
                  <Button
                    className="btn-round"
                    color="danger"
                    onClick={handleLogout}
                  >
                    <i className="nc-icon nc-simple-remove"></i> Çıkış Yap
                  </Button>
                </NavItem>
              ) : (
                <NavItem>
                  <Link to="/login-page">
                    <Button
                      className="btn-round"
                      color="danger"
                    >
                      <i className="nc-icon nc-circle-10"></i> Giriş Yap
                    </Button>
                  </Link>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <ToastContainer />
    </>
  );
}

export default IndexNavbar;

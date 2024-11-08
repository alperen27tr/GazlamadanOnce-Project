import React, { useState, useEffect } from "react";
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import helmetImage from "assets/img/helmet.png";
import IndexNavbar from "components/Navbars/IndexNavbar";
import axios from "axios"; // Axios import edildi
import { useNavigate } from "react-router-dom"; // Yönlendirme için import
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage({ setIsAuthenticated, setUsername }) {
  document.documentElement.classList.remove("nav-open");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login/", formData);
  
      console.log("Backend response:", response.data); // Yanıtı burada konsola yazdır
  
      if (response && response.data && response.data.token) {
        console.log("User logged in successfully", response.data);
  
        // Yanıtı yazdırarak kontrol edin
        console.log("Token:", response.data.token);
        console.log("User:", response.data.user);
  
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", formData.username);
  
        // Eğer 'user' varsa bu kısmı çalıştır
        if (response.data.user && response.data.user.id) {
          localStorage.setItem("id", response.data.user.id); 
        } else {
          console.log("User ID bulunamadı");
        }
  
        setIsAuthenticated(true);
        setUsername(formData.username);
  
        toast.success("Giriş Başarılı!", { autoClose: 1500 });
        setTimeout(() => {
          navigate("/index");
        }, 2000);
      } else {
        throw new Error("Geçersiz yanıt formatı");
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
  
      let errorMessage = "Giriş yaparken bir hata oluştu!";
      if (error.response) {
        errorMessage = error.response.data?.error || error.response.data?.message || errorMessage;
      }
  
      toast.error(errorMessage, { autoClose: 2000 });
    }
  };
  

  return (
    <>
      <IndexNavbar />
      <div className="page-header" style={{ backgroundColor: "black"}}>
        <div className="filter" />
        <Container>
          <Row>
            <Col lg="6">
              <Card className="card-register ml-auto mr-auto info-color" style={{ backgroundColor: "black", border: "2px solid white", }}>
                <h3 className="title mx-auto" style={{ borderBottom: "2px solid white", paddingBottom: "10px", marginBottom: "5px" }}>
                  Giriş Yap
                </h3>
                <p className="description text-center"> Hoşgeldiniz, lütfen giriş yapın. </p>

                <Form className="register-form" onSubmit={handleSubmit}>
                  <label style={{ textAlign: "left", display: "block" }}>Kullanıcı Adı</label>
                  <Input
                    name="username"
                    placeholder="Kullanıcı Adı"
                    type="text"
                    onChange={handleChange}
                    value={formData.username}
                  />
                  <label style={{ textAlign: "left", display: "block" }}>Password</label>
                  <Input
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                  <Button block className="btn-round" color="danger">
                    Giriş Yap
                  </Button>
                </Form>
                <div className="forgot">
                  <Button className="btn-link" color="danger" href="/register-page">
                    Aramıza Katıl !
                  </Button>
                </div>

                <div className="social-line text-center">
                  <Button className="btn-neutral btn-just-icon mr-1" color="facebook" href="#pablo" onClick={(e) => e.preventDefault()}>
                    <i className="fa fa-facebook-square" />
                  </Button>
                  <Button className="btn-neutral btn-just-icon mr-1" color="google" href="#pablo" onClick={(e) => e.preventDefault()}>
                    <i className="fa fa-google-plus" />
                  </Button>
                  <Button className="btn-neutral btn-just-icon" color="twitter" href="#pablo" onClick={(e) => e.preventDefault()}>
                    <i className="fa fa-twitter" />
                  </Button>
                </div>
              </Card>
            </Col>
            <Col lg="6" className="d-none d-lg-block">
              <div
                className="photo-container"
                style={{
                  backgroundImage: `url(${helmetImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100vh",
                }}
              />
            </Col>
          </Row>
        </Container>
        <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" /> Alperen Erdoğan
          </h6>
        </div>
      </div>
      

      <ToastContainer />
    </>
  );
}

export default LoginPage;

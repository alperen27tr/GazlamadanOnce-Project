import React, { useState, useEffect } from "react";
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import IndexNavbar from "components/Navbars/IndexNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "assets/css/RegisterPage.css";

function RegisterPage() {
  document.documentElement.classList.remove("nav-open");

  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  }, []);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.username ||
      !formData.password ||
      !formData.confirm_password
    ) {
      setErrorMessage("Lütfen tüm alanları eksiksiz doldurun.");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setErrorMessage("Şifreler eşleşmiyor.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:8000/register/", formData);
      console.log("User registered successfully", response.data);
      alert("Kullanıcı kaydı başarılı.");
      navigate("/login-page");
    } catch (error) {
      console.error("There was an error registering the user!", error);
      setErrorMessage("Kullanıcı kaydı sırasında bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <IndexNavbar />
      <div className="page-header">
        <div className="filter" />
        <Container>
          <Row>
            <Col lg="6">
              <Card className="card-register ml-auto mr-auto info-color">
                <h3 className="title mx-auto">Hoşgeldiniz</h3>

                {errorMessage && <div className="text-danger text-center">{errorMessage}</div>}

                <Form className="register-form" onSubmit={handleSubmit}>
                  <label className="label-left-align">İsim</label>
                  <Input
                    name="first_name"
                    placeholder="İsim"
                    type="text"
                    onChange={handleChange}
                    value={formData.first_name}
                  />
                  <label className="label-left-align">Soyisim</label>
                  <Input
                    name="last_name"
                    placeholder="Soyisim"
                    type="text"
                    onChange={handleChange}
                    value={formData.last_name}
                  />
                  <label className="label-left-align">Email</label>
                  <Input
                    name="email"
                    placeholder="Email"
                    type="text"
                    onChange={handleChange}
                    value={formData.email}
                  />
                  <label className="label-left-align">Kullanıcı Adı</label>
                  <Input
                    name="username"
                    placeholder="Kullanıcı Adı"
                    type="text"
                    onChange={handleChange}
                    value={formData.username}
                  />
                  <label className="label-left-align">Şifre</label>
                  <Input
                    name="password"
                    placeholder="Şifre"
                    type="password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                  <label className="label-left-align">Şifre Tekrarı</label>
                  <Input
                    name="confirm_password"
                    placeholder="Şifre Tekrarı"
                    type="password"
                    onChange={handleChange}
                    value={formData.confirm_password}
                  />
                  <Button className="btn-round" color="danger" disabled={isSubmitting}>
                    {isSubmitting ? "Kayıt olunuyor..." : "Kayıt Ol"}
                  </Button>
                </Form>

                <div className="forgot">
                  <Button className="btn-link" color="danger" href="/login-page">
                    Zaten Üyemisiniz ?
                  </Button>
                </div>
              </Card>
            </Col>
            <Col lg="6" className="d-none d-lg-block">
              <div className="photo-container" />
            </Col>
          </Row>
        </Container>
        <div className="footer register-footer">
          <h6>
            © {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" /> Alperen Erdoğan
          </h6>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;

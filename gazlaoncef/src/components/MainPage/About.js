import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
import AboutImg1 from "assets/img/tubitak-logo__beyaz-png.png";


// core components

function SectionNucleoIcons() {
  return (
    <>
      <div className="section section-dark ">
        <Container>
          <Row>
            <Col lg="6" md="12">
              <h2 className="title">Hakkımızda</h2>
              <br />
              <p className="description">
              Bu proje, TÜBİTAK 2209-A Üniversite Öğrencileri Araştırma Projeleri Destekleme Programı kapsamında desteklenen bir projedir.
              </p>
              <br />
              {/* <Button
                className="btn-round"
                color="danger"
                href="/nucleo-icons"
                target="_blank"
              >
                Demo İkonları Gör
              </Button>
              <Button
                className="btn-round ml-1"
                color="danger"
                href="https://nucleoapp.com/?ref=1712"
                outline
                target="_blank"
              >
                Tüm İkonları Gör
              </Button> */}
            </Col>
            <Col lg="6" md="12">
            <div>
              <img src={AboutImg1} alt="..." className="img-rounded img-responsive" style={{width: "30%", height: "100%", marginLeft: "340px"}} />
            </div>

            {/* <div>
              <img src={AboutImg2} alt="..." className="img-rounded img-responsive" style={{width: "20%", height: "100%"}} />
            // </div> */}  
            
            {/* GAZLAMADAN ÖNCE LOGO */}


              {/* <div className="icons-container">
                <i className="nc-icon nc-time-alarm" />
                <i className="nc-icon nc-atom" />
                <i className="nc-icon nc-camera-compact" />
                <i className="nc-icon nc-watch-time" />
                <i className="nc-icon nc-key-25" />
                <i className="nc-icon nc-diamond" />
                <i className="nc-icon nc-user-run" />
                <i className="nc-icon nc-layout-11" />
                <i className="nc-icon nc-badge" />
                <i className="nc-icon nc-bulb-63" />
                <i className="nc-icon nc-favourite-28" />
                <i className="nc-icon nc-planet" />
                <i className="nc-icon nc-tie-bow" />
                <i className="nc-icon nc-zoom-split" />
                <i className="nc-icon nc-cloud-download-93" />
              </div> */}
            </Col>
          </Row>
        </Container>
      </div>{" "}
    </>
  );
}

export default SectionNucleoIcons;

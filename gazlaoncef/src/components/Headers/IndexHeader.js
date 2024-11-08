import React from "react";
import { Container } from "reactstrap";
import "assets/css/IndexHeader.css";

function IndexHeader() {
  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage: "url(" + require("assets/img/moto1.png") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center", 
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="title-brand">
              <h1 className="presentation-title">Gazlamadan Önce</h1>
              {/* Mobilde gizlenecek img öğesi */}
              <div className="fog-low">
                <img alt="..." src={require("assets/img/fog-low.png")} />
              </div>
              <div className="fog-low right">
                <img alt="..." src={require("assets/img/fog-low.png")} />
              </div>
            </div>
            <h2 className="presentation-subtitle text-center">
              Yolculuğunuza güvenle başlayın...
            </h2>
          </Container>
        </div>
        <div
          className="moving-clouds"
          style={{
            backgroundImage: "url(" + require("assets/img/clouds.png") + ")",
            backgroundSize: "cover", // Bulut arka plan boyutlandırma
          }}
        />
      </div>
    </>
  );
}

export default IndexHeader;

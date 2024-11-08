import React from 'react';
import imageGazlaonceLogo from 'assets/img/gazlaonceLogo2.jpeg';
import imageTubitakLogo from 'assets/img/tubitak-logo__beyaz-png.png';
import { FaInstagram } from "react-icons/fa";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
import "assets/css/Footer.css";

export default function App() {
  return (
    <MDBFooter className='text-white mdb-footer'>
      <MDBContainer className='footer-container'>
        <MDBRow>
          <MDBCol lg="6" md="12" className='mb-4 mb-md-0' style={{ marginTop: "40px" }}>
            <p className='footer-text'>
              Bu proje, TÜBİTAK 2209-A Üniversite Öğrencileri Araştırma Projeleri Destekleme Programı kapsamında desteklenen bir projedir.
            </p>

            <p className='footer-note'>
              <b>Not: </b>Bu sayfa henüz geliştirme aşamasındadır ve demo sürümüdür. Tam sürüm için çalışmalar devam etmektedir. Bilgisayardan erişim sağlarsanız, sayfayı daha verimli ve kullanışlı bir şekilde deneyimleyebilirsiniz.
            </p>
          </MDBCol>
          <MDBCol lg="6" md="12" className='text-center text-lg-end'>
            <a href="https://tubitak.gov.tr/tr" target="_blank" rel="noopener noreferrer">
              <img src={imageTubitakLogo} alt="Logo 1" className='footer-logo' />
            </a>
            <a href='/index' rel='noopener noreferrer'>
              <img src={imageGazlaonceLogo} alt='Logo 2' className='footer-logo-large' />
            </a>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className='text-center p-3 footer-bottom'>
        © 2024 Copyright:
        <a
          className='text-white footer-instagram-link'
          href='https://www.instagram.com/alperen.27.tr/'
          target="_blank"
          rel="noopener noreferrer"
        >
          Alperen Erdoğan <span style={{ marginLeft: "12px" }}><FaInstagram /></span>
        </a>
      </div>
    </MDBFooter>
  );
}

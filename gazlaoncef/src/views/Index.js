import React, { useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import BlogCards from "components/MainPage/BlogCards";
import Footer from "components/Footers/Footer";
import VideoCards from "components/MainPage/VideoCards"; 
import MobileMenu from "components/MainPage/MobileMenu";

function Index() {
  document.documentElement.classList.remove("nav-open");

  useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  }, []);

  return (
    <>
      <IndexNavbar />
      <IndexHeader />
      <MobileMenu />
      <div className="main" style={{ paddingTop: '70px' }}>
        {/* <SiteMission /> */}
        <BlogCards />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2>Eğitim Videoları</h2>
          <VideoCards playlistId="PLZRZBAi1n1KRmsT2rbECabKstLH1uzS6Y" inOrder={true} /> {/* Eğitim oynatma listesi */}
          <h2>Eğlence Videoları</h2>
          <VideoCards playlistId="PLQXDdkvKiulo_q1NMQVhbSZN1P27Xdx_g" inOrder={false} /> {/* Eğlence oynatma listesi */}
          <h2>İnceleme Videoları</h2>
          <VideoCards playlistId="PLQXDdkvKiulpCUauXhUX30Lg13XJw2l6u" inOrder={false} /> {/* İnceleme oynatma listesi */}
        </div>


        <ScrollToTop smooth />
        <Footer />
      </div>
    </>
  );
}

export default Index;

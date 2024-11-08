import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaBars, FaTimes } from "react-icons/fa";
import "assets/css/MobileMenu.css";
import logo from "assets/img/gazlaonceLogo2.jpeg";

function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    // useEffect ile localStorage'dan kullanıcı adını alıyoruz
    useEffect(() => {
        const storedUserName = localStorage.getItem("username");
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    // Menü açma/kapama işlevi
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Çıkış yapma işlevi
    const handleLogout = () => {
        localStorage.removeItem("username");
        setUserName(null);
        toggleMenu();  // Menü kapanacak
    };

    // Giriş yapma işlevi
    const handleLoginRedirect = () => {
        toggleMenu();  // Menü kapanacak
        navigate('/login-page'); // Yönlendirme işlemi
    };

    return (
        <>
            <div className="menu-icon" onClick={toggleMenu} aria-label="Toggle menu">
                {isOpen ? <FaTimes /> : <FaBars />}
            </div>

            <div className={isOpen ? "mobile-menu-overlay active" : "mobile-menu-overlay"}>
                <ul className="mobile-menu">
                    <li>
                        <Link to="/index" onClick={toggleMenu}>Anasayfa</Link>
                    </li>
                    <li>
                        <Link to="/blogs-page" onClick={toggleMenu}>Blog</Link>
                    </li>
                    <li>
                        <Link to="/videos-page" onClick={toggleMenu}>Videolar</Link>
                    </li>
                    <li>
                        <Link to="/test-page" onClick={toggleMenu}>Ehliyet Sınavları</Link>
                    </li>
                    {userName ? (
                        <>
                            <li className="user-name">
                                <h5>Merhaba, {userName}</h5>
                            </li>
                            <li>
                                <button className="logout-button" onClick={handleLogout}>Çıkış Yap</button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <button className="logout-button" onClick={handleLoginRedirect}>Giriş Yap</button>
                        </li>
                    )}

                    <li>
                        {/* Logo ekleme */}
                        <div className="mobile-menu-logo">
                            <img src={logo} alt="Logo" className="logo" />
                        </div>
                    </li>
                    {/* Telif Hakkı Metnini En Aşağıya Ekle */}
                    <li>
                        <p className="mobile-menu-copyright">&copy; 2024 GazlamadanOnce.com</p>
                    </li>
                </ul>
            </div>


        </>
    );
}

export default MobileMenu;

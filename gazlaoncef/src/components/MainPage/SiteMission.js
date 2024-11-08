import React, { useEffect, useRef } from "react";
import missionImage1 from 'assets/img/amacFoto1.png';
import missionImage2 from 'assets/img/out-0.png';
import styles from 'assets/css/SiteMission.module.css';  // CSS modülünü bu şekilde import edin

function SiteMission() {
  const firstMissionRef = useRef(null);
  const secondMissionRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.7, // %10'u görünür olduğunda tetiklenir
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);  // CSS modülündeki 'visible' sınıfını ekleyin
        }
      });
    }, observerOptions);

    if (firstMissionRef.current) {
      observer.observe(firstMissionRef.current);
    }

    if (secondMissionRef.current) {
      observer.observe(secondMissionRef.current);
    }

    return () => {
      if (firstMissionRef.current) observer.unobserve(firstMissionRef.current);
      if (secondMissionRef.current) observer.unobserve(secondMissionRef.current);
    };
  }, []);

  return (
    <div className={styles['site-mission-container']}>
        <h1 className={styles['title']} style={{ textAlign: 'center', color: '#fff' }}>Hakkımızda</h1>

        <div className={styles['mission-content']}>
            {/* İlk missionItem - Paragraf sağda, resim solda */}
            <div className={`${styles['mission-item']} ${styles['animated']} ${styles['from-left']}`} ref={firstMissionRef}>
                <img src={missionImage1} alt="Our Mission" className={styles['mission-image']} />
                <div className={`${styles['mission-text']} ${styles['mission-item-text']}`}>
                    <h4>
                    GazlamadanOnce Projesi, motorsiklet tutkunlarını bir araya getirerek kaliteli eğitim materyalleri ve eğlenceli içerikler sunan yenilikçi bir platformdur.                     </h4>
                </div>
            </div>

            {/* İkinci missionItem - Paragraf solda, resim sağda */}
            <div className={`${styles['mission-item']} ${styles['animated']} ${styles['from-right']}`} ref={secondMissionRef} style={{ flexDirection: 'row-reverse' }}>
                <img src={missionImage2} alt="Our Mission" className={styles['mission-image']} />
                <div className={`${styles['mission-text']} ${styles['mission-item-text']}`}>
                    <h4>
                     Kullanıcılar, zengin blog içerikleri, çeşitli kategorilere ayrılmış videolar ve interaktif test sınavları aracılığıyla motorsiklet dünyasındaki bilgilerini genişletebilir.                    </h4>
                </div>
            </div>

            {/* Buraya daha fazla misyon öğesi ekleyebilirsiniz */}
        </div>
    </div>
);

}

export default SiteMission;

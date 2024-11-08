import React, { useEffect, useState } from 'react';
import Navbar from 'components/Navbars/IndexNavbar';
import Footer from 'components/Footers/Footer';
import axios from 'axios';
import MobileMenu from 'components/MainPage/MobileMenu';

function TestListPage() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Test verilerini almak için bir useEffect kancası
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get('http://localhost:8000/tests/');
        setTests(response.data);
        console.log(response.data);
      } catch (err) {
        setError('Veriler alınırken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  // Yükleme durumu ve hata yönetimi
  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />

      <MobileMenu />
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-8 ml-auto mr-auto">
              <div className="brand text-center">
                <h1>Test Listesi</h1>
              </div>
            </div>
          </div>

          <div className="row">
            {tests.length === 0 ? (
              <div className="col-md-12 text-center">
                <p>Henüz test bulunmuyor.</p>
              </div>
            ) : (
              tests.map(test => (
                <div className="col-md-4" key={test.test_id}>
                  <div className="card mb-4">
                    <div className="card-body">
                      <h5 className="card-title" style={{ textAlign: "center" }}>{test.test_title} </h5>
                      {/* <p className="card-text">Oluşturan: {test.user.first_name} {test.user.last_name}</p>
                      <p className="card-text">Kategori: {test.category?.category_name}</p> */}
                      <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
                        <a href={`/test-detail/${test.test_id}`} className="btn btn-secondary">Testi Görüntüle</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Ehliyet Sınavı Hakkında Bilgiler Bölümü */}
          <div className="row">
            <div className="col-md-12">
              <div className="info-section mt-5">
                <h2>Ehliyet Sınavı Hakkında Sık Sorulan Sorular</h2>
                <hr />
                <br />
                <h6>Elektronik ehliyet sınavı ne zaman yapılır?</h6>
                <p>Elektronik ehliyet sınavı için randevu alınmaktadır. Merkezi sınav gibi aylarca beklemeye gerek yoktur. Eğer kursiyer sınavdan başarısız olursa yeni bir sınav için en erken 15 gün sonra e-sınava girebilmek için randevu alabiliyor. Bir kursiyer en son katıldığı sınavdan sonra 1 ay içinde elektronik sınava girmezse 1 hakkı yanmış oluyor. O yüzden en son girdiğiniz e-sınav tarihinde itibaren geciktirmeden elektronik sınava girmeniz gerekiyor.</p>
                <h6>E-sınav sonuçları ne zaman açıklanır?</h6>
                <p>Sınavı tamamlar tamamlamaz aynı saat içinde sonuçlarınızı alabiliyorsunuz. Merkezi sınavlarda sonuçlar 10 gün sonra açıklanmaktadır. Aday sınavdan kalınca bir sonraki sınav tarihini beklemek zorunda kalıyordu. Bu aylar sürebiliyor. E-sınav ile en yakın zamana randevu alarak başvuru yapabiliyorsunuz. Bu da zamandan tasarruf etmeniz açısından çok değerli.</p>
                <h6>E- Ehliyet sınavı maliyeti nedir?</h6>
                <p>E-ehliyet sınavı için ödenecek ücretlerde herhangi bir fiyat artışı söz konusu değildir. Pilot olarak uygulanan elektronik sınavların tek farkı uygulanış şeklidir. Elektronik sınav giriş ücreti 60 TL’dir. E-sınav ücretlerini banka yoluyla ödeyebilirsiniz.(Ziraat, Halk ve Vakıf bank).</p>
                <h6>Elektronik sınavı başvuru yapabilmek için başlıca koşul nedir?</h6>
                <p>Elektronik sınava başvuru yapabilmeniz için sürücü kursunun vereceği teorik eğitimi tamamlamanız gerekiyor. Eğitimi tamamladıktan sonra belirli merkezlerde sınava girebilirsiniz.</p>
                <h6>Elektronik sınava giriş hakkı kaçtır?</h6>
                <p>Elektronik sınava giriş hakkı 4(dört)’tür. E-sınava başvuru yapan bir aday teorik sınava başvuru yapamaz. Yapabilmesi için 4 hakkı sonunda başarısız kabul edilmesi gerekir. Fakat teorik sınava giren bir aday e-sınava geçiş yapabilir.</p>
                <h6>E-Sınav randevu tarihimi değiştirebilir miyim?</h6>
                <p>2016 E-sınav kılavuzuna: göre “Sınav başvurusunda bulunup randevusu onaylanan kursiyer, e-sınav tarihinden en az 3 (üç) gün önce randevusunu değiştirebilir.”</p>
                <h6>Elektronik sınavda hangi alanlardan soru soruluyor ve sınav kaç dakika sürmektedir?</h6>
                <p>Elektronik sınavda 12 İlk yardım, 23 Trafik, 9 Motor ve 6 Trafik adabı sorusu sorulmaktadır. Sınav toplam 50 sorudan oluşuyor. Sınav süresi 45 dakika sürmektedir. Normal teorik sınavlarda sınav süresi 60 dakikadır. Fakat e-sınav’da sınav süresi 45 dakikadır.</p>
                <h6>E-sınav için giriş belgesi var mı?</h6>
                <p>Evet var. Sınava girebilmeniz için giriş belgenizi kursunuzdan almayı unutmayınız. Sınava girerken yanınıza elektronik cihaz almayınız. Kimlik belgeniz mutlaka yanınızda olsun. Sınavdan en az yarım saat önce gireceğiniz binada hazır bulunmanız gerekir. E-sınav kılavuzuna göre sınava geç kalırsanız ve o sırada sizden önce çıkan bir aday olursa sınava alınmayacağınız belirtilmektedir. Fakat geç kaldığınız halde sınavdan kimse çıkmamış ise sınava alınacağınız belirtilmektedir. İşinizi sağlama alıp erkenden sınava yerine gidiniz.</p>
                <h6>E-sınav için başarı sınır kaçtır?</h6>
                <p>E-sınav’da 50 soru sorulacak ve her soru 4 şıktan oluşacaktır. Sınavdan başarılı olabilmek için en az 70 puan almak gerekiyor.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TestListPage;

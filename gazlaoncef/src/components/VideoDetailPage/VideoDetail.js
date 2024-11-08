import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import Footer from 'components/Footers/Footer';
import axios from 'axios';
import { BiTimeFive } from "react-icons/bi";
import { FaEye, FaThumbsUp, FaTv } from "react-icons/fa";
import MobileMenu from 'components/MainPage/MobileMenu';

const MAX_DESCRIPTION_LENGTH = 500; // Açıklama için maksimum uzunluk

const VideoDetailPage = () => {
  const { id } = useParams(); // useParams ile Video ID'sini alıyoruz
  const [video, setVideo] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false); // Açıklama durumu için state

  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY; // API keyini alıyoruz
  const videoDetailUrl = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${API_KEY}&part=snippet,contentDetails,statistics`; // Video detay URL'sini oluşturuyoruz

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(videoDetailUrl); // videoDetailUrl'yi kullanıyoruz
        const videoData = response.data.items[0];
        setVideo({
          videoId: videoData.id,
          video_title: videoData.snippet.title,
          description: videoData.snippet.description,
          video_url: `https://www.youtube.com/watch?v=${videoData.id}`,
          upload_time: videoData.snippet.publishedAt,
          viewCount: videoData.statistics.viewCount, // İzlenme sayısı
          likeCount: videoData.statistics.likeCount, // Beğeni sayısı
          channelTitle: videoData.snippet.channelTitle // Kanal adı
        });
      } catch (error) {
        console.error('Video detayını çekerken bir hata oluştu!', error);
      }
    };
    fetchVideo();
  }, [id, videoDetailUrl]);

  // Video yüklenirken bir süre gösterge olacak
  if (!video) return <h5>Yükleniyor...</h5>;

  // Açıklamayı okunabilir hale getirmek için işleme
  const formatDescription = (description) => {
    return description.split('\n').map((line, index) => {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const parts = line.split(urlRegex).map((part, i) =>
        urlRegex.test(part) ? <a key={i} href={part} target="_blank" rel="noopener noreferrer">{part}</a> : part
      );
      return (
        <p key={index} style={{ fontFamily: 'serif', fontSize: '20px', lineHeight: '1.5' }}>
          {parts}
        </p>
      );
    });
  };
  
  // Açıklama uzunluğunu kontrol etme
  const displayedDescription = isExpanded ? video.description : video.description.substring(0, MAX_DESCRIPTION_LENGTH) + '...';

  return (
    <>
      <IndexNavbar />
      <MobileMenu />

      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', marginTop: '50px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '15px' }}>{video.video_title}</h1>
          <iframe
            style={{ width: '100%', height: '500px', borderRadius: '10px'}}
            src={`https://www.youtube.com/embed/${video.videoId}`} // Direkt ID'yi kullanarak embed ediyoruz
            title={video.video_title}
            frameBorder="0"
            allowFullScreen
          />
        </header>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '14px', color: '#6c757d' }}>
            <p style={{ fontWeight: 'bold' }}>
              <FaEye style={{ marginRight: '5px' }} /> İzlenme Sayısı: {video.viewCount}
            </p>
            <p style={{ fontWeight: 'bold' }}>
              <FaThumbsUp style={{ marginRight: '5px' }} /> Beğeni Sayısı: {video.likeCount}
            </p>
          </div>
          <div style={{ fontSize: '14px', color: '#6c757d', textAlign: 'right' }}>
            <p style={{ fontWeight: 'bold' }}>
              <BiTimeFive /> Yüklenme tarihi: {new Date(video.upload_time).toLocaleString()}
            </p>
            <p style={{ fontWeight: 'bold' }}>
              <FaTv style={{ marginRight: '5px' }} /> Kanal: {video.channelTitle}
            </p>
          </div>
        </div>

        <div style={{ marginTop: '20px'}}>
          {/* Açıklamayı formatlayarak gösteriyoruz */}
          {formatDescription(displayedDescription)}
          {video.description.length > MAX_DESCRIPTION_LENGTH && !isExpanded && (
            <button onClick={() => setIsExpanded(true)} style={{ color: 'blue', cursor: 'pointer', marginTop: '10px' }}>
              Daha fazlasını göster
            </button>
          )}
          {isExpanded && (
            <button onClick={() => setIsExpanded(false)} style={{ color: 'blue', cursor: 'pointer', marginTop: '10px' }}>
              Daha azını göster
            </button>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default VideoDetailPage;

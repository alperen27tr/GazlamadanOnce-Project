import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTv } from "react-icons/fa"; 
import { useNavigate } from 'react-router-dom'; 


const VideoCards = ({ playlistId, inOrder }) => {
    const [videos, setVideos] = useState([]);
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    const navigate = useNavigate(); // useNavigate'i kullanarak navigate fonksiyonunu alın

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${playlistId}&part=snippet&maxResults=50`
                );
                const allVideos = response.data.items;

                let videosData;

                if (inOrder) {
                    // Eğitim videolarının ilk 4 al
                    videosData = allVideos.slice(0, 4).map(video => ({
                        id: video.snippet.resourceId.videoId,
                        title: video.snippet.title,
                        thumbnail: `https://img.youtube.com/vi/${video.snippet.resourceId.videoId}/hqdefault.jpg`,
                        channelTitle: video.snippet.channelTitle
                    }));
                } else {
                    // Rastgele 4 video seç
                    const randomVideos = allVideos.sort(() => 0.5 - Math.random()).slice(0, 4);

                    // Video bilgilerini almak için videos API'sini çağırıyoruz
                    const videoIds = randomVideos.map(video => video.snippet.resourceId.videoId).join(',');
                    const videoDetailsResponse = await axios.get(
                        `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=snippet`
                    );

                    videosData = videoDetailsResponse.data.items.map((video) => ({
                        id: video.id,
                        title: video.snippet.title,
                        thumbnail: `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`,
                        channelTitle: video.snippet.channelTitle
                    }));
                }

                setVideos(videosData);
            } catch (error) {
                console.error('Error fetching videos:', error.response ? error.response.data : error.message);
            }
        };

        fetchVideos();
    }, [playlistId, inOrder]);

    // Video kartına tıklama işlemi
    const handleVideoClick = (videoId) => {
        navigate(`/video-detail/${videoId}`); // Detay sayfasına yönlendirme
    };

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            padding: '20px',


        }}>
            {videos.map((video) => (
                <div
                    key={video.id}
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        width: '300px',
                        textAlign: 'center',
                        border: '2px solid black'
                    }}
                    onClick={() => handleVideoClick(video.id)}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        style={{
                            width: '100%',
                            height: 'auto'
                        }}
                    />
                    <h4 style={{
                        margin: '10px 0',
                        fontSize: '1.2em',
                        color: '#000'
                    }}>{video.title}</h4>
                    <b><p style={{
                        margin: '5px 0',
                        fontSize: '0.9em',
                        fontWeight: 'bold',
                    }}><FaTv /> {video.channelTitle}</p></b>

                </div>
            ))}
        </div>
    );

};

export default VideoCards;

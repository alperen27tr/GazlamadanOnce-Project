import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import 'assets/css/VideoGallery.css';
import Footer from 'components/Footers/Footer';
import FilterMenu from 'components/VideosPage/FilterMenu.js';
import ScrollToTop from "react-scroll-to-top";
import { FaTv } from "react-icons/fa";
import MobileMenu from 'components/MainPage/MobileMenu';

const VideoGallery = () => {
    const [videos, setVideos] = useState([]);
    const [playlistTitle, setPlaylistTitle] = useState('');
    const [filteredVideos, setFilteredVideos] = useState([]);
    const [channelId, setChannelId] = useState('PLQXDdkvKiulr20q_6zFOuSNsKTmwp7eeo');

    const navigate = useNavigate();
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

    const channels = {
        all: 'PLQXDdkvKiulr20q_6zFOuSNsKTmwp7eeo',
        education: 'PLZRZBAi1n1KRmsT2rbECabKstLH1uzS6Y',
        entertainment: 'PLQXDdkvKiulo_q1NMQVhbSZN1P27Xdx_g',
        reviews: 'PLQXDdkvKiulpCUauXhUX30Lg13XJw2l6u',
        altin_elbiseli_adam: 'PLQXDdkvKiulqYk0XjOc5LkJ_t3GwyDKdG',
        accidentAnalysis: 'PLQXDdkvKiulqE8zvgDCLpiEXRW2ZbLgHv',

    };

    useEffect(() => {
        const fetchPlaylistData = async () => {
            try {
                if (!channelId) return;
    
                const playlistResponse = await axios.get(
                    `https://www.googleapis.com/youtube/v3/playlists?key=${API_KEY}&id=${channelId}&part=snippet`
                );
                const playlistData = playlistResponse.data.items[0];
                if (playlistData) {
                    setPlaylistTitle(playlistData.snippet.title);
                }
    
                const videosResponse = await axios.get(
                    `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${channelId}&part=snippet&maxResults=50`
                );
    
                const videosData = await Promise.all(videosResponse.data.items.map(async (video) => {
                    const videoId = video.snippet.resourceId.videoId;
    
                    const videoDetailsResponse = await axios.get(
                        `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoId}&part=snippet`
                    );
    
                    const videoDetails = videoDetailsResponse.data.items[0];
                    const channelTitle = videoDetails ? videoDetails.snippet.channelTitle : 'Bilinmeyen Kanal';
    
                    return {
                        id: videoId,
                        title: video.snippet.title,
                        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
                        publishedAt: video.snippet.publishedAt,
                        channelTitle: channelTitle
                    };
                }));
    
                // Eğer channelId 'all' ise videoları karıştır
                if (channelId === channels.all) {
                    const shuffledVideos = videosData.sort(() => Math.random() - 0.5);
                    setVideos(shuffledVideos);
                    setFilteredVideos(shuffledVideos);
                } else {
                    setVideos(videosData);
                    setFilteredVideos(videosData);
                }
            } catch (error) {
                console.error("Error fetching the videos:", error.response ? error.response.data : error.message);
            }
        };
        fetchPlaylistData();
    }, [channelId]);
    

    const handleVideoClick = (videoId) => {
        navigate(`/video-detail/${videoId}`);
    };

    const handleFilterChange = (filter) => {
        setChannelId(channels[filter]);
    };

    return (
        <>
            <IndexNavbar />
            <MobileMenu />
            <div style={{ display: 'flex', paddingTop: '50px'}}>
                <div style={{ flexGrow: 1 }}>
                    <h2 className='centered-title' >{playlistTitle}</h2>
                    <FilterMenu onFilterChange={handleFilterChange} />
                    <div className="video-list">
                        {filteredVideos.map((video) => (
                            <div
                                key={video.id}
                                className="video-card"
                                onClick={() => handleVideoClick(video.id)}
                            >
                                <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                                <div className="video-info">
                                    <h3 className="video-title">{video.title}</h3>
                                    <p className="video-channel" style={{ fontFamily: 'Nunito' }}>
                                        <FaTv /> {video.channelTitle}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ScrollToTop smooth />
            <Footer />
        </>
    );
};

export default VideoGallery;

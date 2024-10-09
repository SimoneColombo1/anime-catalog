'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import axios from "axios";
import style from  "../../styles/home/UpcomingAnime.scss";
const IncomingAnime = () => {
  const [animeData, setAnimeData] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get('https://api.jikan.moe/v4/seasons/upcoming');
      setAnimeData(res.data);
    } catch (error) {
      console.error("Errore durante il caricamento dei dati:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="IncomingAnime">
        <section className="anime-container">
     <h1>Anime in Arrivo</h1> <Swiper
        className="cards-container"
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1} 
        loop={true} 
        autoplay={{ delay: 3000 }} 
      > 
          
        {animeData.data.map((anime) => (
          <SwiperSlide key={anime.mal_id} className="card"> 
        <div className="image-container"> <img src={anime.images.jpg.large_image_url}/></div> 
            <span>{anime.title}</span> 
          </SwiperSlide>
        ))}
      </Swiper></section>
    </section>
  );
}

export default IncomingAnime;